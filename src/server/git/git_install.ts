'use server'

import downloadManager from "@/server/libs/download_manager";
import executor from "@/server/executor";

const installGit = async () => {
    const currentDirectory: string = process.cwd();
    const bin = `${currentDirectory}/bin/git.exe`
    const url = "https://github.com/git-for-windows/git/releases/latest/download/Git-2.42.0.2-64-bit.exe"
    try {
      return await downloadManager(url, bin).then((r) => {
            return new Promise((resolve, reject) => {
                if (r){
                    executor(`${bin} /VERYSILENT /NORESTART /NOCANCEL /SP-`, 120*1000).then(s => {
                        resolve(true)
                    }).catch(_ => {
                        reject("Failed to install git")
                    })
                }else{
                    reject("Failed to download git")
                }
            })
        })
    }catch (e){
        new Promise((_, reject) => reject("Failed to execute tasks"))
    }
}
export default installGit