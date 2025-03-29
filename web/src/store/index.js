import { create } from "zustand";

export const useModalStore = create((set) => ({
  modals: {},
  openModal: (key) =>
    set((state) => ({ modals: { ...state.modals, [key]: true } })),
  closeModal: (key) =>
    set((state) => ({ modals: { ...state.modals, [key]: false } })),
  isModalOpen: (key) => (state) => !!state.modals[key],
}));
