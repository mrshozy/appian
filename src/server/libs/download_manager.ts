'use server'

import axios from 'axios';
import fs from 'fs';
import { promisify } from 'util';

const unlink = promisify(fs.unlink);

const downloadManager = async (url: string, filePath: string): Promise<boolean> => {
    try {
        try {
            await fs.promises.access(filePath);
            await unlink(filePath);
        } catch (error) {}
        const response = await axios({
            method: 'get',
            url,
            responseType: 'stream',
        });
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        return new Promise<boolean>((resolve, _) => {
            writer.on('finish', () => {
                resolve(true);
            });
            writer.on('error', (error) => {
                console.error('Error downloading file:', error);
                resolve(false);
            });
        });
    } catch (error) {
        console.error('Error downloading file:', error);
        return false;
    }
}

export default downloadManager;

