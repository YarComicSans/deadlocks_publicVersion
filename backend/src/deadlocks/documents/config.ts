import { Document } from 'mongoose'
import { IConfig } from '../interfaces/config'

export interface Config extends IConfig, Document {}
