'use server'

import {promisify} from 'util';
import * as fs from 'fs';
import * as os from 'os';
import {knownHostString} from "@/conf/cons";

const knownHosts = async (): Promise<void> => {
    const hostsFile = `${os.homedir()}/.ssh/known_hosts`;
    try {
        await promisify(fs.access)(hostsFile, fs.constants.F_OK);
        return new Promise((resolve, reject) => {
            fs.readFile(hostsFile, (_, data) => {
                if (data.toString("utf8").includes(knownHostString)){
                    reject("host already set")
                }else{
                    fs.appendFile(hostsFile, `${knownHostString.toString()}\n`, (err)=>{
                        if (err){
                            reject(`Failed to append new host, ${err.message}`)
                        }else{
                            resolve()
                        }
                    })
                }
            })
        })
    } catch (err:any) {
        if (err?.code === 'ENOENT') {
            return new Promise((resolve, reject) => {
                fs.writeFile(hostsFile, `${knownHostString}\n`, (e) =>{
                    if (e){
                        reject(`Failed to create a known_hosts file, ${e.message}`)
                    }else{
                        resolve()
                    }
                })
            })
        } else {
            return new Promise((_, reject) =>reject("Unknown error occurred"));
        }
    }
};

export default knownHosts;
