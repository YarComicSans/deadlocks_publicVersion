import { DeadlockDto } from '../api/deadlocks'
import * as jsonpath from 'jsonpath'
import * as parser from './detailsParser'

export type SummaryInfo = {
    victims: number,
    processes: number,
    keylocks: number,
    pagelocks: number,
    objectlocks: number
}

export type ProcessInfo = {
    clientapp:string,
    currentdbname:string,
    transactionname:string,
    lasttranstarted:Date,
    status: string
}

export type LockInfo = {
    type: string,
    objectname: string
}

export interface DeadlockInfo {
    id: string,
    victimProcess: string,
    currentdbname: string,
    objectname: string,

    summary: SummaryInfo,
    processes: ProcessInfo[],
    locks: LockInfo[]

    data: string
};

export function CreateDeadlockInfo (deadlock: DeadlockDto) : DeadlockInfo {
    let victimProcess
    let currentdbname
    let objectname
    let summary
    let processes
    let locks
    try {
        victimProcess = jsonpath.query(deadlock, '$.data["victim-list"]..id')[0]
        currentdbname = jsonpath.query(deadlock, '$.data["process-list"]..currentdbname')[0]
        objectname = jsonpath.query(deadlock, '$.data["resource-list"]..objectname')[0]
        summary = parser.ParseDeadlockSummary(deadlock)
        processes = parser.ParseProcessInfos(deadlock)
        locks = parser.ParseLockInfos(deadlock)
    } catch (e) {
        victimProcess = null
        currentdbname = null
        objectname = null
        summary = null
        processes = null
        locks = null
    }

    return { victimProcess: victimProcess, id: deadlock.id, currentdbname: currentdbname, objectname: objectname, summary: summary, processes: processes, locks: locks, data: deadlock.data }
}
