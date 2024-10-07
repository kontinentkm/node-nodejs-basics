import { promises as fs } from "fs";
import path from "path";

const read = async () => {
  try {
    const filePath = path.join(process.cwd(), "src/fs/files", "fileToRead.txt");

    try {
      await fs.access(filePath); 
    } catch (error) {
      throw new Error("FS operation failed");
    }

    const content = await fs.readFile(filePath, "utf8");
    
    console.log(content);
  } catch (error) {
    console.error(error.message);
  }
};

await read();