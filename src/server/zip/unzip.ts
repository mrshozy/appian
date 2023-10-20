'use server'

import { createReadStream } from 'fs';
import unzipper from 'unzipper';

export default async function extractZip(zipFilePath: string, extractionPath: string) {
    try {
        const readStream = createReadStream(zipFilePath);
        const writeStream = unzipper.Extract({ path: extractionPath });
        readStream.pipe(writeStream);

        writeStream.on('close', () => {
            console.log('Zip file extracted successfully.');
        });
    } catch (error) {
        console.error('Error extracting the zip file:', error);
    }
}

