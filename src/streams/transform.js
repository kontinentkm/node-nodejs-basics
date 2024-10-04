import { Transform } from 'stream';

const transform = async () => {
    const reverseStream = new Transform({
        transform(chunk, encoding, callback) {
            const chunkWithoutNewline = chunk.toString().trim();
            const reversedChunk = chunkWithoutNewline.split('').reverse().join('') + '\n';
            callback(null, reversedChunk);
        }
    });

    process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();
