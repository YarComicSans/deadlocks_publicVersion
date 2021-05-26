import { Schema } from 'mongoose'

export const DeadlockSchema = new Schema({
    _id: String,
    date: Date,
    xml: String,
    data: Object
}, { collection: 'deadlocks' })
