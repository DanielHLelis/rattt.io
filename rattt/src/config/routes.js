import React from 'react'
import {
    Route,
    Switch
} from 'react-router-dom'

import IntroScreen from 'screens/IntroScreen'
import MainScreen from 'screens/MainScreen'
import NotFound from 'screens/404'

/*
    Switch stops on the first route element, or eof, and renders everything before except routes.
    TODO:
        -404 page
        -rato page EE
*/

const ROUTES = (props) => (
    <Switch>
        <Route exact path={props.prefix + '/'} component={IntroScreen} />
        <props.Mestre>
            <Route exact path={props.prefix + '/main'} component={MainScreen} />
            <NotFound/>
        </props.Mestre>
    </Switch>
);

ROUTES.defaultProps = {
    prefix: ''
}

export default ROUTES;