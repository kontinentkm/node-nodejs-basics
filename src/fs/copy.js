import { promises as fs } from "fs";
import path from "path";

const copy = async () => {
  try {
    const sourceDir = path.join(process.cwd(), "src/fs/files");
    const destinationDir = path.join(process.cwd(), "src/fs/files_copy");

    try {
      await fs.access(sourceDir);
    } catch (error) {
      throw new Error("FS operation failed: source folder does not exist");
    }

    try {
      await fs.access(destinationDir);
      throw new Error("FS operation failed: destination folder already exists");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await fs.mkdir(destinationDir);

    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const sourceFile = path.join(sourceDir, file);
      const destFile = path.join(destinationDir, file);
      await fs.copyFile(sourceFile, destFile);
    }

    console.log("Files copied successfully");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

await copy();
