import {create} from "zustand";

type KioskStore = {
  isKiosk: boolean;
  setKiosk: (value: boolean) => void;
};

export const useKioskStore = create<KioskStore>(set => ({
  isKiosk: true,
  setKiosk: (value: boolean) => set({isKiosk: value}),
}));
