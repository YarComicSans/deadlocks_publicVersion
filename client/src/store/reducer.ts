import { ActionType, Types } from './actions'
import { ApplicationState } from './types'

export function storeReducer (
    state = {},
    action: ActionType
) : ApplicationState {
    switch (action.type) {
        case Types.SET_SYNC_INFO: {
            return { ...state, syncInfo: action.syncInfo }
        }
        case Types.SET_ERROR: {
            return { ...state, error: action.error }
        }
        case Types.RESET_ERROR: {
            return { ...state, error: undefined }
        }
        default:
            return state
    }
}

export default storeReducer
