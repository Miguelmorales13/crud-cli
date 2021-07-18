import fs from 'fs'
import path from 'path'
import ncp from "ncp";

export const readFile = (path: string): Promise<string> => {
    console.log(path)
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", function (err: any, content: string) {
            if (err) return reject(err)
            resolve(content)
        })

    })
}
export const writeFile = (path: string, content: string) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, function (err: any) {
            if (err) return reject(err)
            resolve(true)

        })

    })
}
export const copyFile = (templateFile: string) => {
    return new Promise((resolve, reject) => {
        ncp(path.join(`./templates/${templateFile}/`), path.join(process.cwd()), function (err: any) {
            if (err) return reject(err)
            resolve(true)
        })

    })
}
