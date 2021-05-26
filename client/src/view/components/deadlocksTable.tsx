// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import { Box, TableHead, TableRow, TableBody, TableCell, TableSortLabel, TablePagination, IconButton, Collapse } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import api from '../../api'
import { FetchParams } from '../../api/deadlocks'
import { CreateDeadlockInfo, DeadlockInfo } from '../../service/deadlockService'
import DeadlockDetailsGrid from './deadlocksTableDetails'
import './deadlocksTable.css'

const useRowStyles = makeStyles({
    row: {
        '& > *': {
            borderBottom: 'unset'
        }
    }
})

const columns : {label: string, id: string, sortable: boolean, align?: 'right'}[] = [
    { label: 'Id', id: 'id', sortable: true, align: 'right' },
    { label: 'Victim', id: 'victimProcess', sortable: false, align: 'right' },
    { label: 'Curret DB', id: 'currentdbname', sortable: false, align: 'right' },
    { label: 'Object', id: 'objectname', sortable: false, align: 'right' }
]

export default function DeadlocksTable () {
    const classes = useRowStyles()
    const [fetchParams, setFetchParams] = useState<FetchParams>({
        orderColumn: 'id',
        orderDirection: 'desc',
        pageNumber: 0,
        pageSize: 5
    })
    const [deadlocks, setDeadlocks] = useState<DeadlockInfo[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [openRows, setOpenRows] = React.useState<{[key: string]: boolean}[]>([])

    useEffect(() => {
        (async () => {
            const response = await api.deadlocks.get(fetchParams)
            const covertedDeadlockInfos = response.deadlocks.map(deadlock => CreateDeadlockInfo(deadlock))
            setDeadlocks(covertedDeadlockInfos)
            setTotalCount(response.totalCount)
            setOpenRows([])
        })()
    }, [fetchParams])

    const onSort = (columnName: string) => {
        if (columnName !== fetchParams.orderColumn) {
            setFetchParams({ ...fetchParams, pageNumber: 0, orderColumn: columnName })
        } else {
            setFetchParams({ ...fetchParams, pageNumber: 0, orderDirection: fetchParams.orderDirection === 'asc' ? 'desc' : 'asc' })
        }
    }

    const onPageSizeChanged = (pageSize: number) => {
        setFetchParams({ ...fetchParams, pageSize: pageSize })
    }

    const onPageNumberChanged = (pageNumber: number) => {
        setFetchParams({ ...fetchParams, pageNumber: pageNumber })
    }

    const changeRowOpenState = (key: string) => {
        setOpenRows({ ...openRows, [key]: !openRows[key] })
    }

    return (
        <Box p={4} className="main-container">
            <Box className="table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            {columns.map(column =>
                                <TableCell key={column.id} align = {column.align} id={column.id} scope='col' >
                                    {column.sortable === true && <TableSortLabel
                                        active={fetchParams.orderColumn === column.id}
                                        direction={fetchParams.orderDirection}
                                        onClick = {column.sortable ? () => onSort(column.id) : undefined}>
                                        {column.label}
                                    </TableSortLabel>}
                                    {column.sortable === false && (column.label)}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deadlocks.map(deadlock => <>
                            <TableRow key={deadlock.id} className={classes.row}>
                                <TableCell>
                                    <IconButton aria-label="expand row" size="small" onClick={() => changeRowOpenState(deadlock.id)}>
                                        {openRows[deadlock.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                {columns.map(column =>
                                    <TableCell align={column.align} key={deadlock.id + column.id}>
                                        {deadlock[column.id]}
                                    </TableCell>
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={openRows[deadlock.id]} timeout="auto" unmountOnExit>
                                        <DeadlockDetailsGrid deadlock={deadlock}/>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </>)}

                    </TableBody>
                </Table>
            </Box>
            <TablePagination
                rowsPerPageOptions = {[5, 10, 20]}
                rowsPerPage={fetchParams.pageSize}
                component="div"
                count={totalCount}
                page={fetchParams.pageNumber}
                onChangePage={(event: any, pageNumber: number) => onPageNumberChanged(pageNumber)}
                onChangeRowsPerPage={(event: any) => onPageSizeChanged(event.target.value)}
            />
        </Box>
    )
}
