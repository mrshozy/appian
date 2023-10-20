'use server'

import {promisify} from 'util';
import * as fs from 'fs';
import * as os from 'os';

const readSsh = async (): Promise<string> => {
    const publicKeyPath = `${os.homedir()}/.ssh/id_rsa.pub`;
    try {
        await promisify(fs.access)(publicKeyPath, fs.constants.F_OK);
        return await promisify(fs.readFile)(publicKeyPath, 'utf8');
    } catch (err:any) {
        if (err?.code === 'ENOENT') {
            return Promise.reject("SSH public key file not found");
        } else {
            return Promise.reject("Failed to read SSH public key file");
        }
    }
};

export default readSsh;
