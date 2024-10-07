import { promises as fs } from "fs";
import path from "path";

const remove = async () => {
  try {
    const filePath = path.join(process.cwd(), "src/fs/files", "fileToRemove.txt");

    try {
      await fs.access(filePath);
    } catch (error) {
      throw new Error("FS operation failed");
    }

    await fs.unlink(filePath);
    console.log("Файл успешно удален");
  } catch (error) {
    console.error(error.message);
  }
};

await remove();
