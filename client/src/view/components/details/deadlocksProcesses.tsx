// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { Box, Grid, Typography, List, ListItemText, ListItem } from '@material-ui/core'
import { ProcessInfo } from '../../../service/deadlockService'

export default function Processes ({ processes }: {processes: ProcessInfo[]}) {
    return (
        <Box display='flex' m={1} p={1} flexWrap='wrap' className='details-root'>
            {processes.map(process => <Grid key={process.transactionname} item md={6} className='details-grid-item'>
                <Typography variant='h6' className='details-title'>
                    {process.transactionname}
                </Typography>
                <div className='details-list-container'>
                    <List className='details-list'>
                        {Object.keys(process).filter(x => x !== 'transactionname').map(key => <ListItem key={key}>
                            <ListItemText primary={`${key} : ${process[key]}`}/>
                        </ListItem>)}
                    </List>
                </div>
            </Grid>)}
        </Box>)
}
