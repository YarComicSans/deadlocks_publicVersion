import BuildQuery from 'odata-query'
import { get, put } from './common'

export type SyncStatus = 'success' | 'failed' | 'running'

export type SyncInfoDto = {
    status: SyncStatus,
    lastUpdateDate: Date,
    syncMessagesCount: number,
    lastHeartbeatDate: Date
}

type OrderDirection = 'asc' | 'desc';

export type FetchParams = {
    orderColumn: string,
    orderDirection: OrderDirection,
    pageNumber: number,
    pageSize: number
}

export type DeadlockDto = {
    id: string,
    date: Date,
    data: any
}

export type DeadlocksDto = {
    deadlocks: DeadlockDto[],
    totalCount: number
}

export const getDeadlocks = (fetchParams: FetchParams) => {
    const query = BuildQuery({
        orderBy: [fetchParams.orderColumn, fetchParams.orderDirection],
        top: fetchParams.pageSize,
        skip: fetchParams.pageSize * fetchParams.pageNumber
    })
    return get<DeadlocksDto>(`deadlocks${query}`)
}

export const getDeadlockSyncStatus = () => get<SyncInfoDto>('deadlocks/sync')

export const startDeadlockSync = () => put('deadlocks/sync/running')
