import { Module } from '@nestjs/common'
import { DeadlockModule } from './deadlocks/module'

@Module({
    imports: [DeadlockModule]
})

export class AppModule {}
