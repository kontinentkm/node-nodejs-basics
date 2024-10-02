import { promises as fs } from "fs";
import path from "path";

const create = async () => {
  try {
    // Определяем путь к файлу fresh.txt в папке files
    const filePath = path.join(process.cwd(), "src/fs/files", "fresh.txt");

    // Проверяем, существует ли файл
    try {
      await fs.access(filePath);
      // Если файл существует, выбрасываем ошибку
      throw new Error("FS operation failed");
    } catch (error) {
      // Если файл не найден (ошибка ENOENT), продолжаем создание файла
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    // Создаём файл fresh.txt с содержимым "I am fresh and young"
    await fs.writeFile(filePath, "I am fresh and young", "utf8");
    console.log("File created successfully");
  } catch (error) {
    console.error(error.message);
  }
};

create();