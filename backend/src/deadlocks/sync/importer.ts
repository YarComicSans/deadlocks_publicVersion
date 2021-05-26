import * as fs from 'fs'
import * as path from 'path'
import { Injectable } from '@nestjs/common'

@Injectable()
export class Importer {
    private CreateImportPath () : string {
        const dirpath = path.join(__dirname, '../../../../deadlockFiles')
        return dirpath
    }

    async ReadDeadlocksXmlsFromFiles () : Promise<any[]> {
        const importPath = this.CreateImportPath()
        const files = await fs.promises.readdir(importPath)
        const xmls = await Promise.all(files.map(async (file) => await fs.promises.readFile(path.join(importPath, file))))
        return xmls
    }
}
