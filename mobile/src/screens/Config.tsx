import React, {useState} from "react";
import {NavigationProp} from "@react-navigation/native";
import {ArrowLeft} from "@tamagui/lucide-icons";
import {Button, H5, Text, XStack, YStack} from "tamagui";
import {useI18nStore} from "@/stores/i18nStore";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {Alert, StyleSheet, TextInput} from "react-native";

const CELL_COUNT = 6;

const Config = ({navigation}: {navigation: NavigationProp<any>}) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <YStack gap="$2">
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
      </XStack>

      <CodeField
        InputComponent={TextInput}
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onEndEditing={() => Alert.alert("Error", "El código no es válido")}
        returnKeyType="done"
        onSubmitEditing={() =>
          Alert.alert("Configuración enviada", "El código fue enviado")
        }
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        textInputStyle={{color: "#fff"}}
        keyboardType="number-pad"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {marginTop: 20},
  cell: {
    margin: 5,
    width: 80,
    height: 80,
    lineHeight: 38,
    color: "#fff",
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default Config;
