// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Typography, AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SyncInfoButton from './syncInfoButton'

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1
    }
}))

export default function StatusComponent () {
    const classes = useStyles()
    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <Typography className={classes.title}>Deadlocks</Typography>
                    <SyncInfoButton/>
                </Toolbar>
            </AppBar>
        </div>
    )
}
