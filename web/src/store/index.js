import { create } from "zustand";

export const useModalStore = create((set) => ({
  modals: {},
  openModal: (key, value) =>
    set((state) => ({ modals: { ...state.modals, [key]: value } })),
  closeModal: (key) =>
    set((state) => ({ modals: { ...state.modals, [key]: false } })),
  isModalOpen: (key) => (state) => !!state.modals[key],
}));
useModalStore;
