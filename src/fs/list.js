import { promises as fs } from "fs";
import path from "path";

const list = async () => {
  try {
    const directoryPath = path.join(process.cwd(), "src/fs/files");

    try {
      await fs.access(directoryPath);
    } catch (error) {
      throw new Error("FS operation failed");
    }

    const files = await fs.readdir(directoryPath);

    files.forEach((file) => console.log(file));
  } catch (error) {
    console.error(error.message);
  }
};

await list();
