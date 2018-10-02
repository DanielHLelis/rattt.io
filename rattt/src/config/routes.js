import React from 'react'
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import paths from 'config/paths'

import IntroScreen from 'screens/IntroScreen'
import MainScreen from 'screens/MainScreen'
import NotFound from 'screens/404'

/*
    Switch stops on the first route element, or eof, and renders everything before except routes.
    TODO:
        -pages transition
        -rato page EE
*/

const ROUTES = (props) => (
    <Switch>
        <Route exact path={paths.index} component={(window.localStorage.getItem('firstEnter')==='false')?(() => <Redirect to={paths.main} />):(IntroScreen)} />
        <props.Mestre>
            <Switch>
                <Route exact path={paths.main} component={MainScreen} />

                <Route component={NotFound} />
            </Switch>
        </props.Mestre>
    </Switch>
);

ROUTES.defaultProps = {
    prefix: ''
}

export default ROUTES;