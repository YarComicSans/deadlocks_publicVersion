export const GetNewItemId = (message : any) => {
    return message.ItemId.attributes.Id
}

export const GetAttachmentIds = (getItemResult : any) : Array<any> => {
    const attachmentsIdsObject = getItemResult.ResponseMessages.GetItemResponseMessage.Items.Message.Attachments.FileAttachment
    const attachmentIds = (attachmentsIdsObject instanceof Array)
        ? attachmentsIdsObject
        : [attachmentsIdsObject]

    return attachmentIds.filter(id => id !== '')
}

export const GetNewAttachmentId = (attachment : any) => {
    return attachment.AttachmentId.attributes.Id
}

export const GetAttachmentContent = (getAttachmentQueryResponse: any) => {
    return getAttachmentQueryResponse.ResponseMessages.GetAttachmentResponseMessage.Attachments.FileAttachment.Content
}
