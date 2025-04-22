// scripts/build-vfs.js
const fs = require("fs");
const path = require("path");

function encodeFont(fileName) {
  const filePath = path.join(__dirname, "../src/assets/fonts", fileName);
  const fontData = fs.readFileSync(filePath);
  return fontData.toString("base64");
}

const vfs = {
  "Amiri-Regular.ttf": encodeFont("Amiri-Regular.ttf"),
  "Amiri-Bold.ttf": encodeFont("Amiri-Bold.ttf"),
};

const output = `export const pdfMakeVfs = ${JSON.stringify(vfs, null, 2)};`;
fs.writeFileSync(path.join(__dirname, "../src/app/pdfmake-vfs.ts"), output);
console.log("✅ pdfmake VFS file generated at src/app/pdfmake-vfs.ts");
