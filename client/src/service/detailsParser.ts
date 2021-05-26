import jsonpath from 'jsonpath'
import { SummaryInfo, ProcessInfo, LockInfo } from './deadlockService'

export function ParseDeadlockSummary (deadlock: any) : SummaryInfo {
    const victimsCount = jsonpath.query(deadlock, '$.data..victimProcess.id').length
    const processesCount = jsonpath.query(deadlock, '$.data..process.*').length
    const keylocksCount = jsonpath.query(deadlock, '$.data["resource-list"]..keylock.*').length
    const pagelocksCount = jsonpath.query(deadlock, '$.data["resource-list"]..pagelock.*').length
    const objectlocksCount = jsonpath.query(deadlock, '$.data["resource-list"]..objectlock.*').length

    return { victims: victimsCount, processes: processesCount, keylocks: keylocksCount, pagelocks: pagelocksCount, objectlocks: objectlocksCount }
}

export function ParseProcessInfos (deadlock: any) : ProcessInfo[] {
    const processes = jsonpath.query(deadlock, '$.data..process.*')
    const processInfos = processes.map(process => {
        return { transactionname: process.transactionname, status: process.status, clientapp: process.clientapp, currentdbname: process.currentdbname, lasttranstarted: process.lasttranstarted }
    })
    return processInfos
}

export function ParseLockInfos (deadlock: any) : LockInfo[] {
    const keylocks = jsonpath.query(deadlock, '$.data["resource-list"]..keylock.*')
    const keylocksInfo = keylocks.map(keylock => {
        return { type: 'keylock', objectname: keylock.objectname }
    })
    const pagelocks = jsonpath.query(deadlock, '$.data["resource-list"]..pagelock.*')
    const pagelocksInfo = pagelocks.map(pagelock => {
        return { type: 'keylock', objectname: pagelock.objectname }
    })
    const objectlocks = jsonpath.query(deadlock, '$.data["resource-list"]..objectlock.*')
    const objectlockInfo = objectlocks.map(objectlock => {
        return { type: 'keylock', objectname: objectlock.objectname }
    })
    return keylocksInfo.concat(pagelocksInfo, objectlockInfo)
}
