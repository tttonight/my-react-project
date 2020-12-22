

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const SmartRouter = (route) => (
    route.tag === 'Redirect' ?
        <Redirect from={route.from} to={route.to} exact={route.exact}
            render={props => (<route.component {...props} routes={route.routes} />)} /> :
        <Route path={route.path} exact={route.exact}
            render={props => (<route.component {...props} routes={route.routes} />)} />
);


// const SubRoutes = (props) => {
//     <Switch>{props.routes.map((route, i) => <SmartRouter key={i} {...route} />)}</Switch>
// }
const Routes = (props) => (<Switch>{props.routes.map((route, i) => <SmartRouter key={i} {...route} />)}</Switch>);






export {
    Routes,
    SmartRouter
}