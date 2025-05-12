import {useModalStore} from "@/stores/modalStore";
import React from "react";
import {ViewStyle} from "react-native";
import {Sheet, SheetProps, ColorProp} from "tamagui";

interface IProps {
  modalKey: "lang-select" | "movieDetail" | "promotion-detail";
  frameStyle?: ViewStyle;
  sheetProps?: SheetProps;
  bgColor?: ColorProp;
  children: React.ReactNode;
  topEl?: React.ReactNode;
  bottomEl?: React.ReactNode;
}

const CustomSheet = (props: IProps) => {
  const {modalKey, sheetProps = {}} = props;
  const open = useModalStore(s => s.modals[modalKey]);
  const close = useModalStore(s => s.closeModal);

  return (
    <Sheet
      native
      zIndex={100_000}
      open={!!open}
      onOpenChange={() => close(modalKey)}
      dismissOnSnapToBottom
      dismissOnOverlayPress
      animation="medium"
      modal
      {...sheetProps}>
      <Sheet.Overlay open={!!open} opacity={0.5} backgroundColor={"#000"} />
      <Sheet.Handle />
      <Sheet.Frame
        style={props.frameStyle}
        backgroundColor={props.bgColor || "#333"}
        flex={1}>
        {props.topEl}
        {props.children}
        {props.bottomEl}
      </Sheet.Frame>
    </Sheet>
  );
};

export default CustomSheet;
