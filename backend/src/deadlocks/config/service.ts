import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Config } from '../documents/config'
import * as configQueries from './queries'

@Injectable()
export class ConfigService {
    // eslint-disable-next-line no-useless-constructor
    constructor (@Inject('CONFIG_MODEL') private readonly configModel : Model<Config>) {}

    async SyncLastUpdate (lastMessageDate: Date, addedMessagesCount : number) {
        const query = configQueries.createSyncLastUpdateQuery(lastMessageDate, addedMessagesCount)
        await this.configModel.updateOne(query.objectName, query.args, { upsert: true })
    }

    async GetLastSyncDate () {
        const query = configQueries.createGetLastSyncDateQuery()
        const lastSyncDate = await this.configModel.findOne(query.objectName, query.args)
        return lastSyncDate.lastSyncMessageDate
    }

    async SetSyncStartStatus () {
        const query = configQueries.createSyncStartStatusQuery()
        await this.configModel.updateOne(query.objectName, query.args)
    }

    async SetSyncFinishStatus (status: 'success' | 'failed') {
        const query = configQueries.createSyncFinishStatusQuery(status)
        await this.configModel.updateOne(query.objectName, query.args)
    }

    async GetSyncStatus () : Promise<{status : string, lastUpdateDate: Date, syncMessagesCount: number, lastSyncHeartbeat: Date}> {
        const query = configQueries.createGetSyncStatusQuery()
        const syncStatus = await this.configModel.findOne(query.objectName, query.args)
        return { status: syncStatus.status, lastUpdateDate: syncStatus.lastUpdateDate, syncMessagesCount: syncStatus.syncMessagesCount, lastSyncHeartbeat: syncStatus.lastSyncHeartbeat }
    }

    async GetLastHeartbeat () : Promise<Date> {
        const query = configQueries.createGetLastHeartbeatQuery()
        const lastHeartbeat = await this.configModel.findOne(query.objectName, query.args)
        return lastHeartbeat.lastSyncHeartbeat
    }

    async SetNewHeartbeat () {
        const query = configQueries.createSetNewHeartbeatQuery()
        await this.configModel.updateOne(query.objectName, query.args)
    }
}
