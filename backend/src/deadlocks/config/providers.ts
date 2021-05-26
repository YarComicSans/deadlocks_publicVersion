import { Connection } from 'mongoose'
import { ConfigSchema } from '../schemas/config'

export const ConfigProviders = [{
    provide: 'CONFIG_MODEL',
    useFactory: (connection : Connection) => connection.model('Config', ConfigSchema),
    inject: ['DATABASE_CONNECTION']
}]
