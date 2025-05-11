import {create} from "zustand";

export type FilterMovieTypes = {
  category: string;
  search: string;
};

export type TMovieFilterStore<T extends Record<string, unknown>> = {
  filters: {[K in keyof T]?: T[K] | null};
  setFilter: <K extends keyof T>(key: K, value: T[K]) => void;
};

export const useMovieFilterStore = create<TMovieFilterStore<FilterMovieTypes>>(
  set => ({
    filters: {},
    setFilter: (key, value) =>
      set(s => ({filters: {...s.filters, [key]: value}})),
  }),
);
