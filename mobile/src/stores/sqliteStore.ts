import {SQLiteDatabase} from "react-native-sqlite-storage";
import {create} from "zustand";

export type TSqliteStore = {
  db?: SQLiteDatabase;
  setDB: (db:SQLiteDatabase) => void;
};

export const useSqliteStore = create<TSqliteStore>(set => ({
  db: undefined,
  setDB: (db: SQLiteDatabase) => set({db}),
}));
