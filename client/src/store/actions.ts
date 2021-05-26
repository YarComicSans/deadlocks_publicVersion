import { SyncInfoDto } from '../api/deadlocks'

export enum Types {
    // eslint-disable-next-line no-unused-vars
    SET_SYNC_INFO = 'SET_SYNC_INFO',
    // eslint-disable-next-line no-unused-vars
    SET_ERROR = 'SET_ERROR',
    // eslint-disable-next-line no-unused-vars
    RESET_ERROR = 'RESET_ERROR'
}

function create<T extends Types, D> (type: T, data: D = {} as any) {
    return { type, ...data } as const
}

export const setSyncInfo = (syncInfo: SyncInfoDto) => create(Types.SET_SYNC_INFO, { syncInfo })
export const setError = (error: string) => create(Types.SET_ERROR, { error })
export const resetError = () => create(Types.RESET_ERROR)

export type ActionType =
| ReturnType<typeof setSyncInfo>
| ReturnType<typeof setError>
| ReturnType<typeof resetError>
