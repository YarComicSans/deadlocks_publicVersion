/* eslint-disable no-unused-vars */
import * as queries from './queries'
import config from '../config'
import * as service from './service'
const EWS = require('node-ews')

export default class Outlook {
    private ews: typeof EWS;

    constructor () {
        this.ews = new EWS({
            username: config.username,
            password: config.password,
            host: config.host
        })
    }

    async GetAttachments () {
        const messages = await this.GetMessages()
        const attachments : any[] = []
        for (let i = 0; i < messages.length; i++) {
            const messageAttachments = await this.GetAttachmentsFromMessage(messages[i])
            messageAttachments.forEach((attachment: any) => attachments.push(attachment))
        }
        return attachments
    }

    private async GetMessages () {
        const query = queries.createFindItemQuery()
        const response = await this.ews.run(query.function, query.args)
        const result = response.ResponseMessages.FindItemResponseMessage.RootFolder.Items.Message
        const messages = (result instanceof Array)
            ? result
            : [result]
        return messages
    }

    private async GetAttachmentsFromMessage (message : any) {
        const query = queries.createGetItemQuery(service.GetNewItemId(message))
        const response = await this.ews.run(query.function, query.args)
        const ids = service.GetAttachmentIds(response)
        const attachments = await this.GetAttachmentsById(ids)
        return attachments
    }

    private async GetAttachmentsById (ids: any[]) {
        const attachments: any[] = []

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i]
            const query = queries.createGetAttachmentQuery(service.GetNewAttachmentId(id))
            const response = await this.ews.run(query.function, query.args)
            const attachmentContent = service.GetAttachmentContent(response)
            console.log(`Attachment -> ${attachmentContent}`)
            attachments.push(attachmentContent)
        }
        return attachments.filter(attachment => attachment !== '')
    }
}
