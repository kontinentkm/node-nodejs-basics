import { promises as fs } from "fs";
import path from "path";

const create = async () => {
  try {
    const filePath = path.join(process.cwd(), "src/fs/files", "fresh.txt");

    try {
      await fs.access(filePath);
      throw new Error("FS operation failed");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await fs.writeFile(filePath, "I am fresh and young", "utf8");
    console.log("File created successfully");
  } catch (error) {
    console.error(error.message);
  }
};

create();