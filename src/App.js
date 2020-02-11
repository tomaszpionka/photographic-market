import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Root from "./pages/Root";
import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Location from "./pages/Location";

function App() {

    return (

<Router>
    <header>
        <Link to={'/'}>_root</Link>

        {/*<Link to={'/path'}>_path</Link>

        <Link to={'/path/2'}>_path/2</Link>*/}

        <Link to={'/home'}>_home</Link>

        <Link to={"/login"}>_login</Link>

        <Link to={"/about"}>_about</Link>

        <Link to={"/users"}>_users</Link>

        <Link to ={"/location"}>_location</Link>
    </header>
    <main>
        <Switch>
            <Route exact path={'/'} component={Root}/>
            {/*<Route exact path={'/test'} component={Test}/>*/}
            <Route exact path={'/home'} component={Home}/>
            <Route exact path={'/login'} component={Login}/>
            <Route exact path={'/about'} component={About}/>
            <Route exact path={'/users'} component={Users}/>
            <Route exact path={"/location"} component={Location}/>
        </Switch>
    </main>
</Router>
  );
}

export default App;
