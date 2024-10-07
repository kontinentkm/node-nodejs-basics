import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { pipeline } from "stream/promises";
import path from "path";

const decompress = async () => {
  const filePath = path.join(process.cwd(), "src/zip/files", "archive.gz");
  const decompressedFilePath = path.join(
    process.cwd(),
    "src/zip",
    "fileToCompress.txt"
  );

  const readStream = createReadStream(filePath);
  const gunzipStream = createGunzip();
  const writeStream = createWriteStream(decompressedFilePath);

  await pipeline(readStream, gunzipStream, writeStream);

  console.log("Файл успешно распакован в fileToCompress.txt");
};

await decompress();
