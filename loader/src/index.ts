import JSZip from 'jszip'
import Outlook from './outlook'
import config from './config'
import { createDeadlockFile } from './deadlocks/exporter'

async function main () {
    try {
        if (!config.isValid) {
            config.showHelpMessage()
            return
        }
        const outlook = new Outlook()
        const attachments = await outlook.GetAttachments()

        if (!attachments) {
            return
        }

        for (let i = 0; i < attachments.length; i++) {
            const attachment = attachments[i]
            const zip = await JSZip.loadAsync(attachment, { base64: true })

            for (const filename in zip.files) {
                const file = zip.files[filename]
                const content = await file.async('string')
                createDeadlockFile(config.username as string, file.date, file.name, content)
            }
        }
    } catch (e) {
        console.error(e)
    }
}

main()
