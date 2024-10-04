import { createHash } from "crypto";
import { createReadStream } from "fs";
import path from "path";

const calculateHash = async () => {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/hash/files",
      "fileToCalculateHashFor.txt"
    );

    const hash = createHash("sha256");

    const readStream = createReadStream(filePath);

    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });

    readStream.on("end", () => {
      const result = hash.digest("hex");
      console.log(result);
    });

    readStream.on("error", (error) => {
      console.error("Ошибка при чтении файла:", error.message);
    });
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
};

await calculateHash();