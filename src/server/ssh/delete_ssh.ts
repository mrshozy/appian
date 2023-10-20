'use server'

import { promisify } from 'util';
import * as fs from 'fs';
import * as os from 'os';

const deleteSsh = async (): Promise<boolean> => {
    const privateKeyPath = `${os.homedir()}/.ssh/id_rsa`;
    const publicKeyPath = `${privateKeyPath}.pub`;
    try {
        await promisify(fs.access)(publicKeyPath, fs.constants.F_OK);
        await promisify(fs.unlink)(publicKeyPath);
        await promisify(fs.unlink)(privateKeyPath);
        return true;
    } catch (err) {
        if (err instanceof Error && err.message.includes('ENOENT')) {
            return Promise.reject("SSH public key file not found");
        } else {
            return Promise.reject("Failed to delete SSH public key file");
        }
    }
};
export default deleteSsh;


