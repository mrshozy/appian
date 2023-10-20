'use client'
import generateSshKey from "@/server/ssh/create_ssh_key";
import readSsh from "@/server/ssh/read_ssh";
import deleteSsh from "@/server/ssh/delete_ssh";
import clone_repo from "@/server/git/clone_repo";
import installGit from "@/server/git/git_install";
import knownHosts from "@/server/ssh/known_hosts";
import extractZip from "@/server/zip/unzip";
import compressToZip from "@/server/zip/compress";

export default function Home() {
    const generate = () => {
        generateSshKey().then(e => {
            alert(e)
        }).catch(e => {
            alert(e)
        })
    }
    const read = () =>{
        readSsh().then(key => {
            alert(key)
        }).catch(e => {
            alert(e)
        })
    }
    const _delete = () =>{
        deleteSsh().then(key => {
            alert("ssh deleted successful")
        }).catch(e => {
            alert(e)
        })
    }
    const clone = () =>{
        clone_repo("https://github.com/ddimaria/rust-actix-example.git").then(r =>{
            alert(r)
        }).catch(e => {
            alert(e)
        })
    }
    const extract = () => {
        const path = "C:\\Users\\zamokuhleshozi\\Downloads\\node-v18.18.2-x64.zip"
        extractZip(path, "C:\\Users\\zamokuhleshozi\\Documents")
    }
    const compress = () => {
        const path = "C:\\Users\\zamokuhleshozi\\Downloads\\node-v18.18.2-x64.zip"
        compressToZip("C:\\Users\\zamokuhleshozi\\Documents", "C:\\Users\\zamokuhleshozi\\Downloads\\temp.zip")
    }
    const known = () => {
        knownHosts().then(()=>{
            alert("created successful")
        }).catch(e => {
            alert(e)
        })
    }
    const install = () => {
        installGit().then(e => {
            alert("install successful")
        }).catch(e => {
            alert(e)
        })
    }
  return (
      <div>
          <button onClick={generate}>Generate Key</button>
          <br/>
          <button onClick={read}>Read Key</button>
          <br/>
          <button onClick={_delete}>Delete Key</button>
          <br/>
          <button onClick={clone}>Clone Repo</button>
          <br/>
          <button onClick={install}>Install Git</button>
          <br/>
          <button onClick={known}>Known Host</button>
          <br/>
          <button onClick={extract}>Extract</button>
          <br/>
          <button onClick={compress}>Compress</button>
      </div>
  )
}
