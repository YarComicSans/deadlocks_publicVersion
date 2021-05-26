// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { Box, Grid, Typography, List, ListItemText, ListItem } from '@material-ui/core'
import { SummaryInfo } from '../../../service/deadlockService'

export default function Summary ({ summary }: {summary: SummaryInfo}) {
    return (
        <Box display='flex' m={1} p={1} flexWrap='wrap' className='details-root'>
            <Grid item className='details-grid-item'>
                <Typography variant="h6" className='details-title'>
                Deadlocks count details
                </Typography>
                <div className='details-list-container'>
                    <List className='details-list'>
                        {Object.keys(summary).map(key => <ListItem key={key} className='details-list-item'>
                            <ListItemText key={key} primary={`${key} : ${summary[key]}`}/>
                        </ListItem>)}
                    </List>
                </div>
            </Grid>
        </Box>)
}
