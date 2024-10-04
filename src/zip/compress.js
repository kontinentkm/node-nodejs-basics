import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';

const compress = async () => {
  try {
    const filePath = path.join(process.cwd(), 'src/zip/files', 'fileToCompress.txt');
    const compressedFilePath = path.join(process.cwd(), 'src/zip/files', 'archive.gz');

    const readStream = createReadStream(filePath);
    const gzipStream = createGzip();
    const writeStream = createWriteStream(compressedFilePath);

    await pipeline(readStream, gzipStream, writeStream);

    console.log('File compressed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
};

await compress();