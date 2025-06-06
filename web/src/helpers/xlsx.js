import * as XLSX from "xlsx";

export const downloadAsXLSX = (data, fileName = "metricas.xlsx") => {
  // Crear una hoja de cálculo a partir de los datos
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  // Agregar la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Métricas");

  // Generar y descargar el archivo
  XLSX.writeFile(workbook, fileName);
};
