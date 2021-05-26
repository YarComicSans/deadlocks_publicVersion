import * as fs from 'fs'
import * as path from 'path'
import config from '../config'

function createExportPathIfNeeded () {
    const dirpath = path.join(__dirname, config.exportPath as string)
    fs.mkdirSync(dirpath)
    return dirpath
}

export async function createDeadlockFile (username: string, date: Date, postfixName: string, content: string) {
    const exportPath = createExportPathIfNeeded()
    const stringifiedDate = date.toISOString().split(':').join('-')
    const filename = `${exportPath}${username}_${stringifiedDate}_${postfixName}`
    await fs.promises.writeFile(path.join(exportPath as string, filename), content)
    console.log(`Saved file ${path}`)
}
