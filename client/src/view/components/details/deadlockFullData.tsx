// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import ReactJson from 'react-json-view'

export default function DeadlockFullData ({ data }: {data: any}) {
    return (<Box display='flex' m={1} p={1} flexWrap='wrap' className='details-root'>
        <Grid item className='details-grid-item'>
            <Typography>Full Deadlock Json Data:</Typography>
            <ReactJson src={data} collapsed={true} />
        </Grid>
    </Box>)
}
