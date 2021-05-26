import { Get, Controller, Query, Put } from '@nestjs/common'
import { DeadlocksService } from './service'
import { Converter } from './coverter'
import { DeadlocksDto } from './types'
import { SyncService } from './sync/service'

@Controller('deadlocks')
export class DeadlocksController {
    // eslint-disable-next-line no-useless-constructor
    constructor (private readonly deadlocksService: DeadlocksService, private readonly syncService: SyncService, private readonly converter: Converter) {}

    @Get()
    async GetDeadlocks (@Query() fetchQuery): Promise<DeadlocksDto> {
        const mongoQuery = this.converter.convertODataToMongoQuery(fetchQuery)
        return await this.deadlocksService.GetData(mongoQuery)
    }

    @Get('sync')
    async GetSyncStatus () {
        return await this.syncService.GetStatus()
    }

    @Put('sync/running')
    async StartSync () {
        await this.syncService.StartSync()
    }
}
