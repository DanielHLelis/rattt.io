import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import IntroScreen from 'screens/IntroScreen'
import MainScreen from 'screens/MainScreen'

const ROUTES = (props) => (
    <Switch>
        <Route exact path="/" component={IntroScreen} />
        <props.Mestre>
            <Route exact path="/index" component={MainScreen} />
        </props.Mestre>
    </Switch>
);

export default ROUTES;