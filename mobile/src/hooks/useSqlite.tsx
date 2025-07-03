import {openDatabase} from "@/services/sqlite";
import {useSqliteStore} from "@/stores/sqliteStore";
import {useEffect} from "react";

export const useSqlite = () => {
  const setDB = useSqliteStore(s => s.setDB);

  useEffect(() => {
    const init = async () => {
      try {
        const db = await openDatabase();
        setDB(db);
        console.log("Base de datos inicializada correctamente");
      } catch (e) {
        console.log("Error al inicializar la base de datos", e);
      }
    };
    init();
  }, []);
};
