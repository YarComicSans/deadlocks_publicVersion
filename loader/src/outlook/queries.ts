export const createGetAttachmentQuery = (id: string) => ({
    function: 'GetAttachment',
    args: {
        AttachmentIds: {
            't:AttachmentId': {
                attributes: {
                    Id: id
                }
            }
        }
    }
})

export const createGetItemQuery = (id: string) => ({
    function: 'GetItem',
    args: {
        ItemShape: {
            BaseShape: 'IdOnly',

            AdditionalProperties: {
                FieldURI: [
                    { attributes: { FieldURI: 'item:Attachments' } }
                ]
            }
        },
        ItemIds: {
            't:ItemId': {
                attributes: {
                    Id: id
                }
            }
        }
    }
})

export const createFindItemQuery = () => ({
    function: 'FindItem',
    args: {
        attributes: {
            Traversal: 'Shallow',
            'xmlns:t': 'http://schemas.microsoft.com/exchange/services/2006/types'
        },
        ItemShape: {
            BaseShape: 'IdOnly',

            AdditionalProperties: {
                FieldURI: [
                    { attributes: { FieldURI: 'item:DateTimeReceived' } },
                    { attributes: { FieldURI: 'item:Subject' } },
                    { attributes: { FieldURI: 'item:HasAttachments' } }
                ]
            }
        },

        Restriction: {
            't:And': {
                't:Contains': {
                    attributes: {
                        ContainmentMode: 'Substring',
                        ContainmentComparison: 'IgnoreCase'
                    },
                    't:FieldURI':
                { attributes: { FieldURI: 'item:Subject' } },
                    't:Constant':
                { attributes: { Value: 'Spotlight Deadlock notification' } }
                },
                't:IsGreaterThan':
            {
                't:FieldURI': {
                    attributes: { FieldURI: 'item:DateTimeReceived' }
                },
                't:FieldURIOrConstant': {
                    't:Constant': {
                        attributes: { Value: '0001-01-01T00:00:00Z' }
                    }
                }
            }
            }
        },

        ParentFolderIds: {
            DistinguishedFolderId: {
                attributes: {
                    Id: 'inbox'
                }
            }
        }
    }
})
