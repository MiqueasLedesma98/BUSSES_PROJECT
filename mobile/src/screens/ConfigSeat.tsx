import React, {useMemo, useState} from "react";
import {NavigationProp} from "@react-navigation/native";
import {
  Adapt,
  Button,
  H5,
  Input,
  Select,
  Sheet,
  Text,
  XStack,
  YStack,
} from "tamagui";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Lock,
  LockOpen,
} from "@tamagui/lucide-icons";
import {useI18nStore} from "@/stores/i18nStore";
import api from "@/axios.config";
import {useFormik} from "formik";
import {useMutation, useQuery} from "@tanstack/react-query";
import {ActivityIndicator, Alert} from "react-native";
import {getCompanies} from "@/services/list.querys";
import {ICompany} from "@/interfaces/IFetch";
import {useSqliteStore} from "@/stores/sqliteStore";
import {SQLiteDatabase} from "react-native-sqlite-storage";
import {disableKioskMode, enableKioskMode} from "kiosk-react-native";
import {useKioskStore} from "@/stores/kioskStore";

type TInitial = {
  company: "" | ICompany;
  bus: string;
  seat: string;
};

const initialValues = {
  company: "",
  bus: "",
  seat: "",
} as TInitial;

type TInitialValues = typeof initialValues;

const mutationFn = async ({
  bus,
  company,
  seat,
  db,
}: TInitialValues & {db?: SQLiteDatabase}) => {
  if (!db) throw new Error("Fatal Error, Contacte con un desarrollador");
  if (!bus || !seat)
    throw new Error("Asiento y BUS son obligatorios complete el formulario");
  if (typeof company === "string")
    throw new Error("La compañía es obligatoria, complete el formulario");

  const format = {
    company: company.id,
    bus: parseInt(bus),
    seat: parseInt(seat),
  };

  await api.post("/device", format);
  // Verificamos si ya existe el registro con ID = 1
  const [res] = await db.executeSql(
    `SELECT COUNT(*) as count FROM device WHERE id = 1`,
  );
  const count = res.rows.item(0).count;

  if (count > 0) {
    // Ya existe → actualizamos
    await db.executeSql(
      `UPDATE device SET seat = ?, bus = ?, company = ? WHERE id = 1`,
      [format.seat, format.bus, format.company],
    );
  } else {
    // No existe → insertamos forzando el ID en 1
    await db.executeSql(
      `INSERT INTO device (id, seat, bus, company) VALUES (1, ?, ?, ?)`,
      [format.seat, format.bus, format.company],
    );
  }
};

export default function ConfigSeat({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);
  const db = useSqliteStore(s => s.db);

  const {values, setFieldValue, handleChange, handleBlur} = useFormik({
    initialValues,
    onSubmit: console.log,
  });

  const {data, isLoading} = useQuery({
    queryKey: ["config-companies"],
    queryFn: getCompanies,
  });

  const {mutate} = useMutation({
    mutationKey: ["config-seat"],
    mutationFn,
    onSuccess: () =>
      Alert.alert(
        "Se configuro correctamente",
        "El dispositivo se encuentra configurado",
      ),
    onError: error => Alert.alert("A ocurrido un error", error.message),
  });

  const [open, setOpen] = useState(false);

  const placeholder = useMemo(
    () =>
      typeof values.company === "string"
        ? "Seleccione compañía"
        : values.company.name,
    [values.company],
  );

  const setKiosk = useKioskStore(s => s.setKiosk);

  return (
    <YStack gap="$2" width={"70%"}>
      <XStack gap="$2" alignItems="center">
        <Button
          borderWidth={2}
          borderColor={"white"}
          onPress={() => navigation.goBack()}
          width={70}
          height={60}
          margin={12.5}
          color={"white"}
          backgroundColor={"rgba(255,255,255, .2)"}>
          <ArrowLeft size={50} color={"white"} />
        </Button>
        <H5 color={"#fff"} fontWeight={"bold"}>
          {t("config", {locale})}
        </H5>
        {isLoading && <ActivityIndicator />}
        <XStack marginLeft={"auto"}>
          <Button onPress={() => setKiosk(false)} chromeless>
            <LockOpen color={"#fff"} />
          </Button>
          <Button onPress={() => setKiosk(true)} chromeless>
            <Lock color={"#fff"} />
          </Button>
        </XStack>
      </XStack>

      <Input
        placeholder="Asiento"
        keyboardType="number-pad"
        onChangeText={handleChange("seat")}
        onBlur={handleBlur("seat")}
      />
      <Input
        placeholder="Transporte"
        keyboardType="number-pad"
        onChangeText={handleChange("bus")}
        onBlur={handleBlur("bus")}
      />
      <Select open={open} onOpenChange={setOpen} disablePreventBodyScroll>
        <Select.Trigger iconAfter={ChevronDown}>
          <Text>{placeholder}</Text>
        </Select.Trigger>

        <Adapt platform="touch">
          <Sheet native modal dismissOnSnapToBottom animation="medium">
            <Sheet.Frame>
              <Sheet.Frame>
                <Adapt.Contents />
              </Sheet.Frame>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              backgroundColor="$shadowColor"
              enterStyle={{opacity: 0}}
              exitStyle={{opacity: 0}}
            />
          </Sheet>
        </Adapt>

        <Select.Viewport minWidth={200} opacity={0.5}>
          <Select.Group>
            <Select.Label>Compañías</Select.Label>
            {data?.results?.map((item, i) => (
              <Select.Item
                onPressOut={() => {
                  setFieldValue("company", item);
                  setOpen(false);
                }}
                padding="$5"
                index={i}
                key={item.id}
                value={item.id}>
                <Select.ItemText>
                  <Text>{item.name}</Text>
                </Select.ItemText>
                <Select.ItemIndicator marginLeft="auto">
                  <Check size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select>

      <Button onPress={() => mutate({...values, db})}>
        Guardar Configuración
      </Button>
    </YStack>
  );
}
