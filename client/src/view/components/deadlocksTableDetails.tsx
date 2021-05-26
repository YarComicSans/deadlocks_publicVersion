// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { Box } from '@material-ui/core'
import { DeadlockInfo } from '../../service/deadlockService'
import Summary from './details/deadlocksSummary'
import Processes from './details/deadlocksProcesses'
import Locks from './details/deadlocksLocks'
import DeadlockFullData from './details/deadlockFullData'
import './deadlocksTableDetails.css'

export default function deadlockTableDetails ({ deadlock } : {deadlock: DeadlockInfo}) {
    return (
        <div>
            <Box display="flex" flexWrap="wrap">
                <Summary summary={deadlock.summary}/>
                <Processes processes={deadlock.processes}/>
                <Locks locks={deadlock.locks}/>
                <DeadlockFullData data={deadlock.data}/>
            </Box>
        </div>
    )
}
