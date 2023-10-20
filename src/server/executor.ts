'use server'

import { exec } from 'child_process';

const executor = async (command:string, timeout:number) => {
    const process = exec(command, {
        timeout: timeout
    });
    return new Promise((resolve, reject) => {
        let output = '';
        process.stdout?.on('data', (data) => {
            output += data;
        });
        process.stderr?.on('data', (data) => {
            output += data;
        });
        process.on('close', (code) => {
            if (code === 0) {
                resolve(output);
            } else {
                reject(output);
            }
        });
    });
}
export default executor;
