'use server'

import { promisify } from 'util';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import extractZip from "@/server/zip/unzip";

const execPromise = promisify(exec);
const rmdirPromise = promisify(fs.rm);

const getName = (url: string): string => {
    const parts = url.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    return lastPart.endsWith('.git') ? lastPart.slice(0, -4) : lastPart;
};

const cloneRepo = async (url: string): Promise<string> => {
    const currentDirectory: string = process.cwd();
    const repoName = getName(url);
    const repoPath = path.join(currentDirectory, 'repos', repoName);
    try {
        if (fs.existsSync(repoPath)) {
            await rmdirPromise(repoPath, { recursive: true });
        }
        const command = `git clone ${url} ${repoPath}`;
        await execPromise(command, { timeout: 120000 });
        await extractZip("./tools/version client.zip", repoPath)
        return 'Successfully cloned the repo';
    } catch (e:any) {
        return `Failed to clone the repo, ${e.message}`;
    }
};

export default cloneRepo;
