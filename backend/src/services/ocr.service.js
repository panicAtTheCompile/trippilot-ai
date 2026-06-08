import fs from "fs";
import pdf from "pdf-parse";
import Tesseract from "tesseract.js";

export const extractTextFromPdf =
async (filePath) => {

  const dataBuffer =
    fs.readFileSync(filePath);

  const data =
    await pdf(dataBuffer);

  return data.text;
};

export const extractTextFromImage =
async (filePath) => {

  const result =
    await Tesseract.recognize(
      filePath,
      "eng"
    );

  return result.data.text;
};