import { Module } from '@nestjs/common'
import { DeadlocksController } from './controller'
import { DeadlocksService } from './service'
import { DeadlockProviders } from './providers'
import { ConfigProviders } from './config/providers'
import { DatabaseModule } from '../database/module'
import { ConfigService } from './config/service'
import { SyncService } from './sync/service'
import { Importer } from './sync/importer'
import { Parser } from './sync/parser'
import { Converter } from './coverter'

@Module({
    imports: [DatabaseModule],
    controllers: [DeadlocksController],
    providers: [DeadlocksService, ...DeadlockProviders, ...ConfigProviders, ConfigService, SyncService, Importer, Parser, Converter]
})
export class DeadlockModule {}
