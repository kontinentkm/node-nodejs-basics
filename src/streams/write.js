import { createWriteStream } from 'fs';
import { join } from 'path';

const write = async () => {
    const filePath = join(process.cwd(), 'src/streams/files', 'fileToWrite.txt');

    const writeStream = createWriteStream(filePath);

    process.stdin.pipe(writeStream);

    writeStream.on('error', (error) => {
        console.error('Ошибка при записи в файл:', error.message);
    });

    writeStream.on('finish', () => {
        console.log('Данные успешно записаны в файл');
    });
};

await write();