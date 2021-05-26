import { Injectable } from '@nestjs/common'
import { ConfigService } from '../config/service'
import { DeadlocksService } from '../service'
import { Importer } from './importer'
import { Parser } from './parser'

@Injectable()
export class SyncService {
    // eslint-disable-next-line no-useless-constructor
    constructor (private readonly deadlockService: DeadlocksService, private readonly configService : ConfigService, private readonly parser: Parser, private readonly importer: Importer) {}

    async StartSync () {
        const syncStatus = await this.configService.GetSyncStatus()
        const heartbeatTimeDifference = new Date().getTime() - syncStatus.lastSyncHeartbeat.getDate()
        if (syncStatus.status !== 'running' || heartbeatTimeDifference > 300000) {
            await this.configService.SetSyncStartStatus()
            this.Sync()
        }
    }

    async Sync () {
        const heartbeatTimer = setInterval(() => { this.configService.SetNewHeartbeat() }, 60000)
        try {
            const xmls = await this.importer.ReadDeadlocksXmlsFromFiles()
            const deadlocks = this.parser.ParseDeadlocksFromXmls(xmls)
            await this.deadlockService.UpdateDeadlocks(deadlocks)
            await this.configService.SetSyncFinishStatus('success')
        } catch (error) {
            await this.configService.SetSyncFinishStatus('failed')
        }
        clearInterval(heartbeatTimer)
    }

    async GetStatus () {
        const syncStatus = await this.configService.GetSyncStatus()
        return {
            status: syncStatus.status,
            syncMessagesCount: syncStatus.syncMessagesCount,
            lastUpdateDate: syncStatus.lastUpdateDate,
            lastHeartbeatDate: syncStatus.lastSyncHeartbeat
        }
    }
}
