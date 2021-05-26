import { Connection } from 'mongoose'
import { DeadlockSchema } from './schemas/deadlock'

export const DeadlockProviders = [
    {
        provide: 'DEADLOCK_MODEL',
        useFactory: (connection : Connection) => connection.model('Deadlock', DeadlockSchema),
        inject: ['DATABASE_CONNECTION']
    }]
