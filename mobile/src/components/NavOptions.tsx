import {useI18nStore} from "@/stores/i18nStore";
import {useSqliteStore} from "@/stores/sqliteStore";
import {NavigationProp} from "@react-navigation/native";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import {TouchableWithoutFeedback} from "react-native";
import CountryFlag from "react-native-country-flag";
import {Button, H2, Image, Text, XStack} from "tamagui";
import {ResultSet} from "react-native-sqlite-storage";

type TResult = {
  id: number;
  seat: number;
};

const NavOptions = ({navigation}: {navigation: NavigationProp<any>}) => {
  const setLocale = useI18nStore(s => s.setLocale);

  const db = useSqliteStore(s => s.db);

  const {data} = useQuery<TResult | null>({
    queryKey: ["get-seat"],
    queryFn: async () => {
      if (!db) return null;

      const [result]: ResultSet[] = await db.executeSql(
        `SELECT * FROM device WHERE id = 1`,
      );
      if (result.rows.length > 0) {
        const row = result.rows.item(0);
        return {
          id: row.id,
          seat: row.seat,
        } as TResult;
      }

      return null;
    },
    enabled: !!db,
  });
  return (
    <XStack gap={15}>
      <Button transparent onPress={() => setLocale("es")}>
        <XStack gap={5}>
          <CountryFlag isoCode="es" size={25} />
          <Text color={"white"}>Español</Text>
        </XStack>
      </Button>
      <Button transparent onPress={() => setLocale("en")}>
        <XStack gap={5}>
          <CountryFlag isoCode="us" size={25} />
          <Text color={"white"}>English</Text>
        </XStack>
      </Button>

      <TouchableWithoutFeedback
        onLongPress={() => navigation.navigate("Config")}>
        <XStack gap={10}>
          <H2 color={"white"}>{data?.seat || "--"}</H2>
          <Image source={require("../assets/seat.png")} />
        </XStack>
      </TouchableWithoutFeedback>
    </XStack>
  );
};

export default NavOptions;
