import * as deadlocks from './deadlocks'

export default {
    deadlocks: {
        get: deadlocks.getDeadlocks,
        sync: {
            getStatus: deadlocks.getDeadlockSyncStatus,
            start: deadlocks.startDeadlockSync
        }
    }
}
