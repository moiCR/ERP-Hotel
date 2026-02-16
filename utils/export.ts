import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

export const exportToExcel = (data: unknown[]) => {
  const worksheetData = data.map((log: unknown) => ({
    Usuario: log.usuario
      ? `${log.usuario.nombre} ${log.usuario.apellidos}`
      : "Deleted User",
    Rol: log.usuario?.rol?.nombre || "N/A",
    Fecha: format(new Date(log.fechaIngreso), "dd/MM/yyyy HH:mm"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Logbook");

  XLSX.writeFile(workbook, `bitacora_export_${Date.now()}.xlsx`);
  console.log("The Excel file has been generated successfully.");
};

export const exportToPDF = (data: unknown[]) => {
  const doc = new jsPDF();

  doc.text("Bitácora de Accesos", 14, 15);

  const tableRows = data.map((log) => [
    log.usuario
      ? `${log.usuario.nombre} ${log.usuario.apellidos}`
      : "Deleted User",
    log.usuario?.rol?.nombre || "N/A",
    format(new Date(log.fechaIngreso), "dd/MM/yyyy HH:mm"),
  ]);

  autoTable(doc, {
    head: [["Usuario", "Rol", "Fecha"]],
    body: tableRows,
    startY: 20,
  });

  doc.save(`bitacora_export_${Date.now()}.pdf`);
  console.log("The PDF file has been generated successfully.");
};
