'use server'

import os from "os";
import * as fs from "fs";
import executor from "@/server/executor";
import {promisify} from 'util';

const generateSshKey = async (): Promise<string> => {
    const homedir = os.homedir();
    const sshPath = `${homedir}/.ssh`;
    const privateKeyPath = `${sshPath}/id_rsa`;
    const publicKeyPath = `${sshPath}/id_rsa.pub`;
    try {
        await promisify(fs.access)(sshPath, fs.constants.F_OK);
        try {
            await Promise.all([promisify(fs.access)(privateKeyPath, fs.constants.F_OK), promisify(fs.access)(publicKeyPath, fs.constants.F_OK)]);
            return Promise.reject("SSH key already generated");
        } catch (err) {
        }
    } catch (err) {
        try {
            await promisify(fs.mkdir)(sshPath, {recursive: true});
        } catch (mkdirErr) {
            return Promise.reject("Unable to create the .ssh folder in the home directory");
        }
    }
    const command = `ssh-keygen -t rsa -b 4096 -N "" -f "${privateKeyPath}"`;
    try {
        await executor(command, 10000);
        return await promisify(fs.readFile)(publicKeyPath, 'utf8');
    } catch (err) {
        return Promise.reject(err);
    }
};

export default generateSshKey;


