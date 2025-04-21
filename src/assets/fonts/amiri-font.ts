import jsPDF from 'jspdf';

export function loadAmiriFont(doc: jsPDF): void {
  doc.addFileToVFS('Amiri-Regular.ttf', 'BASE64_STRING_HERE');
  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
}
