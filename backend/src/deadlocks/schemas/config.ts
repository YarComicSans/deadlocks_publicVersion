import { Schema } from 'mongoose'

export const ConfigSchema = new Schema({
    name: String,
    status: String,
    startDate: Date,
    finishDate: Date,
    lastSyncMessageDate: Date,
    syncMessagesCount: Number,
    lastUpdateDate: Date,
    lastSyncHeartbeat: Date
}, { collection: 'config' })
