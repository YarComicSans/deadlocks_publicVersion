import * as actions from '../store/actions'
import api from '../api/'
import { delay } from '../utils'

export function requestSyncInfo () {
    return async (dispatch) => {
        try {
            const syncInfo = await api.deadlocks.sync.getStatus()
            dispatch(actions.setSyncInfo(syncInfo))
        } catch (e) {
            dispatch(actions.setError(e))
        }
    }
}

export function startSync () {
    return async (dispatch) => {
        try {
            dispatch(actions.setSyncInfo({ status: 'running', lastUpdateDate: new Date(), lastHeartbeatDate: new Date(), syncMessagesCount: 0 }))
            await api.deadlocks.sync.start()
        } catch (e) {
            dispatch(actions.setError(e))
        }
    }
}

export function startApp () {
    return async (dispatch) => {
        while (true) {
            await requestSyncInfo()(dispatch)
            await delay(1000)
        }
    }
}
