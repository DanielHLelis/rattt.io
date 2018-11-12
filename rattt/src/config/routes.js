import React from 'react'
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import paths from 'config/paths'

import IntroScreen from 'screens/IntroScreen'
import PlansScreen from 'screens/PlansScreen'
import NotFound from 'screens/404'

import CreateCustom from 'screens/CreateCustom'
import PlayCustom from 'screens/PlayCustom'
import CustomRender from 'screens/CustomRender'

import gameRoutes, { Campanha } from 'config/gameRoutes'
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
                <Route exact path={paths.main} component={PlansScreen} />{/*Change Later*/}
                {/* <Route exact path={paths.tradicional} component={Tradicional} /> */}

                {
                    gameRoutes.map(({ path, component: C, props }, index) => (
                        <Route key={index.toString()} exact path={path} render={prp => <C {...prp} {...props} />} />
                    ))
                }

                {
                    Campanha.map(({ path, component: C, props, name, _id, auth, requires }, index) => (
                        <Route key={index.toString()} exact path={path} render={prp => <C {...prp} {...props} name={name} _id={_id} auth={auth} requires={requires} />} />
                    ))
                }
                
                <Route exact path={paths.playCustom} component={PlayCustom} />
                <Route exact path={paths.createCustom} component={CreateCustom} />
                <Route exact path={paths.gameCustom + '/:id'} render={({match}) => <CustomRender id={match.params.id} />} />

                <Route component={NotFound} />
            </Switch>
        </props.Mestre>
    </Switch>
);

ROUTES.defaultProps = {
    prefix: ''
}

export default ROUTES;