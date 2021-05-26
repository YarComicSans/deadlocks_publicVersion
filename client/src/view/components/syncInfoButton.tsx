// eslint-disable-next-line no-use-before-define
import React from 'react'
import { IconButton } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import SyncProblemIcon from '@material-ui/icons/SyncProblem'
import SyncIcon from '@material-ui/icons/Sync'
import { connect, TypeOfConnect, ApplicationState } from '../../store'
import * as commands from '../../commands'
import { SyncInfoDto } from '../../api/deadlocks'

const storeEnhancer = connect(
    (state: ApplicationState) => ({
        ...(state.syncInfo) as SyncInfoDto
    }), {
        startSync: commands.startSync
    }
)

type StatusProps = {} & TypeOfConnect<typeof storeEnhancer>

function StatusComponent (props: StatusProps) {
    return (
        <IconButton onClick={props.startSync} color="inherit">
            {props.status === 'success' && <CheckCircleOutlineIcon/>}
            {props.status === 'running' && <SyncIcon/>}
            {props.status !== 'success' && props.status !== 'running' && <SyncProblemIcon/>}
        </IconButton>
    )
}

export default storeEnhancer(StatusComponent)
