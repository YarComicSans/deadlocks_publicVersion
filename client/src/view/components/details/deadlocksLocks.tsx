// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { Box, Grid, Typography, List, ListItemText, ListItem } from '@material-ui/core'
import { LockInfo } from '../../../service/deadlockService'

export default function Locks ({ locks }: {locks: LockInfo[]}) {
    return (
        <Box display='flex' m={1} p={1} flexWrap='wrap' className='details-root'>
            {locks.map(lock => <Grid item key={lock.type} md={6} className='details-grid-item'>
                <Typography variant='h6' className='details-title'>
                    {lock.type}
                </Typography>
                <div className='details-list-container'>
                    <List className='details-list'>
                        {Object.keys(lock).filter(x => x !== 'type').map(key => <ListItem key={key} className='details-list-item'>
                            <ListItemText primary={`${key} : ${lock[key]}`} />
                        </ListItem>)}
                    </List>
                </div>
            </Grid>)}
        </Box>)
}
