export interface IConfig {
    readonly name : string,
    status : 'success' | 'failed' | 'running' | string,
    startDate : Date,
    finishDate : Date,
    lastSyncMessageDate: Date,
    syncMessagesCount : number,
    lastUpdateDate : Date,
    lastSyncHeartbeat: Date,
}
