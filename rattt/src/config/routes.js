import React from 'react'
import {
    Route,
    Switch
} from 'react-router-dom'
import {
    TransitionGroup,
    CSSTransition
} from 'react-transition-group'

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
        <Route exact path={paths.index} component={IntroScreen} />
        <props.Mestre>
            <Switch>
                <Route exact path={paths.main} component={MainScreen} />
                <NotFound/>
            </Switch>
        </props.Mestre>
    </Switch>
);

ROUTES.defaultProps = {
    prefix: ''
}

export default ROUTES;