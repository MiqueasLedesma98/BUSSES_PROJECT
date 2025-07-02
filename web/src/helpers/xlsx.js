import * as XLSX from "xlsx";

export const downloadAsXLSX = (data, fileName = "métricas.xlsx") => {
  // Crear una hoja de cálculo a partir de los datos
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  // Agregar la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Métricas");

  // Generar y descargar el archivo
  XLSX.writeFile(workbook, fileName);
};

/**
 * Exporta múltiples tablas al mismo archivo Excel.
 *
 * @param tables Array de tablas con nombre de hoja, columnas y filas
 * @param fileName Nombre del archivo Excel a descargar
 */
export const downloadDataTable = (tables, fileName = "datos.xlsx") => {
  const workbook = XLSX.utils.book_new();

  tables.forEach(({ sheetName, rows, cols }) => {
    // Encabezados
    const headers = cols.map((col) => col.headerName);

    // Datos con formateo si hay
    const data = rows.map((row) =>
      cols.map((col) => {
        const value = row[col.field];
        return col.valueFormatter ? col.valueFormatter(value) : value;
      })
    );

    // Estructura final con encabezados
    const sheetData = [headers, ...data];

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  XLSX.writeFile(workbook, fileName);
};
