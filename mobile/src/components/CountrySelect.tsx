import React, {useState} from "react";
import {Adapt, Select, Sheet, Text, XStack} from "tamagui";
import CountryFlag from "react-native-country-flag";

const countries = [
  {code: "US", label: "United States"},
  {code: "ES", label: "España"},
];

const CountrySelect = () => {
  const [open, setOpen] = useState(false);

  const [value, onValueChange] = useState("US");

  return (
    <Select
      value={value}
      onValueChange={val => {
        console.log("entro");
        onValueChange(val);
        setOpen(false); // <-- cerrar el select
      }}
      open={open}
      onOpenChange={setOpen}>
      <Select.Trigger backgroundColor={"rgba(255,255,255,.5)"} width={180}>
        <Select.Value placeholder="Selecciona un país">
          <XStack gap={5}>
            <CountryFlag isoCode={value} size={16} style={{marginRight: 8}} />
            <Text>{"English"}</Text>
          </XStack>
        </Select.Value>
      </Select.Trigger>

      <Adapt platform="touch">
        <Sheet native modal dismissOnSnapToBottom open={open}>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadowColor"
            animation="lazy"
            enterStyle={{opacity: 0}}
            exitStyle={{opacity: 0}}
          />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Group>
            <Select.Label>Paises</Select.Label>
            {countries.map((country, index) => (
              <Select.Item
                onPress={() => {
                  onValueChange(country.code);
                  setOpen(false);
                }}
                key={country.code}
                value={country.code}
                index={index}>
                <Select.ItemText>
                  <CountryFlag
                    isoCode={country.code}
                    size={16}
                    style={{marginRight: 8}}
                  />
                  {country.label}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );
};

export default CountrySelect;
