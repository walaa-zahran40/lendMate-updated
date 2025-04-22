import jsPDF from 'jspdf';

export function registerArabicFont(doc: jsPDF) {
  doc.addFileToVFS(
    'Amiri-Regular.ttf',
    `
AAEAAAASAQAABAAgR0RFRrRCsIIAAAj0AAAHEdERUYAJgApAAAOYAAACBPUy8yLzCjT1gAADoYAAA
QgGNtYXAAEwAWAAAPUAAAAAhnbHlmW8P/2QAAA9QAAABMaGVhZLAAyAAAADxUAAAANmhoZWEIPAAz
AAARYAAAACRobXR4AoAAHgAAEbAAAAAAbG9jYQCYAA4AABFwAAAACm1heHAAQwBnAAARmAAAAAhu
YW1lK+X+kAAAEZwAAAKBcG9zdAFYADIAABHQAAAAAHByZXBoaTDRJhAA
  `.replace(/\s+/g, '')
  ); // clean up newlines just in case

  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
}
