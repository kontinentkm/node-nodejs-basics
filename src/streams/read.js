import { createReadStream } from "fs";
import path from "path";

const read = async () => {
  const filePath = path.join(
    process.cwd(),
    "src/streams/files",
    "fileToRead.txt"
  );

  const readStream = createReadStream(filePath, { encoding: "utf-8" });

  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on("end", () => {
    console.log("\nЧтение файла завершено.");
  });

  readStream.on("error", (error) => {
    console.error("Ошибка при чтении файла:", error.message);
  });
};

await read();
