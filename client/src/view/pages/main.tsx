// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import DeadlocksTable from '../components/deadlocksTable'
import { ApplicationState, TypeOfConnect, connect } from '../../store'
import Toolbar from '../components/toolbar'
import * as commands from '../../commands'

const storeEnhancer = connect(
    (state: ApplicationState) => ({}), {
        startApp: commands.startApp
    }
)

type AppProps = {} & TypeOfConnect<typeof storeEnhancer>

function App (props: AppProps) {
    useEffect(() => {
        props.startApp()
    })

    return (
        <div className='app'>
            <Toolbar/>
            <DeadlocksTable/>
        </div>
    )
}

export default storeEnhancer(App)
