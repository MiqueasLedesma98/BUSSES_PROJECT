import {SQLiteDatabase} from "react-native-sqlite-storage";

interface ISendConfig {
  code: string;
  db?: SQLiteDatabase;
}

export const sendConfig = async (props: ISendConfig) => {
  const {code, db} = props;

  if (!db) throw new Error("No existe la DB");

  const [results] = await db.executeSql(`SELECT * FROM code WHERE value = ?`, [
    code,
  ]);

  if (results?.rows.length) return true;
  else throw new Error("El código es incorrecto");
};
