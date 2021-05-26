const configObjectName = {
    name: 'DeadlocksConfig'
}

export const createGetLastSyncDateQuery = () => ({
    objectName: configObjectName,
    args: {
        lastSyncMessageDate: 1
    }
})

export const createGetSyncStatusQuery = () => ({
    objectName: configObjectName,
    args: {
        status: 1,
        lastUpdateDate: 1,
        syncMessagesCount: 1,
        lastSyncHeartbeat: 1
    }
})

export const createGetLastHeartbeatQuery = () => ({
    objectName: configObjectName,
    args: {
        lastSyncHeartbeat: 1
    }
})

export const createSyncLastUpdateQuery = (lastMessageDate: Date, messagesCount: number) => ({
    objectName: configObjectName,
    args: {
        $set: { lastSyncMessageDate: lastMessageDate, syncMessagesCount: messagesCount, lastUpdateDate: new Date() }
    }
})

export const createSyncStartStatusQuery = () => ({
    objectName: configObjectName,
    args: {
        $set: { status: 'running', startDate: new Date() }
    }
})

export const createSyncFinishStatusQuery = (status: string) => ({
    objectName: configObjectName,
    args: {
        $set: { status: status, finishDate: new Date() }
    }
})

export const createSetNewHeartbeatQuery = () => ({
    objectName: configObjectName,
    args: {
        $set: { lastSyncHeartbeat: new Date() }
    }
})
