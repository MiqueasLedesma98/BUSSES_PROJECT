import SQLite from "react-native-sqlite-storage";

SQLite.enablePromise(true);

export const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabase({
      name: "myapp.db",
      location: "default",
    });
    // Crear tabla "code" con un único registro
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS code (
        value TEXT NOT NULL
      );
    `);

    // Verificamos si ya existe el valor
    const [results] = await db.executeSql(
      `SELECT COUNT(*) as count FROM code WHERE value = ?`,
      ["401292"],
    );
    const count = results.rows.item(0).count;

    if (count === 0) {
      await db.executeSql(`INSERT INTO code (value) VALUES (?)`, ["401292"]);
    }

    // Crear tabla "device"
    await db.executeSql(`
    CREATE TABLE IF NOT EXISTS device (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      seat INTEGER
    );
  `);

    return db;
  } catch (err) {
    console.error("Error opening DB", err);
    throw err;
  }
};
