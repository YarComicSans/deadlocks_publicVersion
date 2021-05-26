import { SyncInfoDto } from '../api/deadlocks'

export type ApplicationState = {
    error?: string,
    syncInfo?: SyncInfoDto
}
