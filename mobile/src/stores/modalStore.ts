import {IMovie} from "@/interfaces/IFetch";
import {create} from "zustand";

type ModalTypes = {
  movieDetail: IMovie;
  "lang-select": boolean;
  // agregar otros modales aquí con sus tipos:
  // settings: ISettings;
  // userProfile: IUser;
};

type ModalStore<T extends Record<string, unknown>> = {
  modals: {
    [K in keyof T]?: T[K] | false;
  };
  openModal: <K extends keyof T>(key: K, value: T[K]) => void;
  closeModal: <K extends keyof T>(key: K) => void;
  isModalOpen: <K extends keyof T>(key: K) => boolean;
  getModalData: <K extends keyof T>(key: K) => T[K] | undefined; // Solo retorna T[K] o undefined
};

export const useModalStore = create<ModalStore<ModalTypes>>((set, get) => ({
  modals: {},
  openModal: (key, value) =>
    set(state => ({modals: {...state.modals, [key]: value}})),
  closeModal: key => set(state => ({modals: {...state.modals, [key]: false}})),
  isModalOpen: key => {
    const value = get().modals[key];
    return value !== false && value !== undefined;
  },
  getModalData: <K extends keyof ModalTypes>(key: K) => {
    const value = get().modals[key];
    return value !== false ? (value as ModalTypes[K]) : undefined;
  },
}));
