import { promises as fs } from "fs";
import path from "path";

const rename = async () => {
  try {
    const sourceFile = path.join(process.cwd(), "src/fs/files", "wrongFilename.txt");
    const destinationFile = path.join(process.cwd(), "src/fs/files", "properFilename.md");

    try {
      await fs.access(sourceFile);
    } catch (error) {
      throw new Error("FS operation failed: исходный файл не существует");
    }

    try {
      await fs.access(destinationFile);
      throw new Error("FS operation failed: целевой файл уже существует");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await fs.rename(sourceFile, destinationFile);
    console.log("Файл успешно переименован");
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
};

await rename();