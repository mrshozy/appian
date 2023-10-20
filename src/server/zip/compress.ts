'use server'

import * as fs from 'fs';
import archiver from 'archiver';

export default async function compressToZip(sourceFolderPath: string, outputZipPath: string) {
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', (err) => {
        console.error('Error while compressing:', err);
    });

    archive.pipe(output);

    archive.directory(sourceFolderPath, false);

    await archive.finalize();

    output.on('close', () => {
        console.log('Zip archive created successfully.');
    });
}