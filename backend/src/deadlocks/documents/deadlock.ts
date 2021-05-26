import { Document } from 'mongoose'
import { IDeadlock } from '../interfaces/deadlock'

export interface Deadlock extends IDeadlock, Document {
    _id: String
}
