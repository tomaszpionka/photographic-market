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
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./style.css";
//
// function TestHeader() {
//     return <h1>Test</h1>;
// }
// const auth = require('backend/auth');
//
// app.use('/auth', auth);

const Test = () => (
    <div>

        <h2>Welcome to the Test route</h2>

        <Route exact path={'/path'}>
            <h2>path header</h2>
        </Route>

        <Route exact path={'/path/2'}>
            <h2>Path 2</h2>
        </Route>

        <Route exact path={'/login'}>
            <Login/>
        </Route>
    </div>
);



function App() {
    const userIsRegistered = false;
  return (

<Router>
    <Header></Header>
    <header className='wraper'>
        <Link to={'/'} className='link'>Strona główna</Link>

        {/*<Link to={'/path'}>_path</Link>

        <Link to={'/path/2'}>_path/2</Link>*/}

        <Link to={'/home'} className='link'>Oferta</Link>

        <Link to={"/login"} className='link'>Logowanie</Link>

        <Link to={"/about"} className='link'>O nas</Link>
    </header>
    <main>
        <Switch>
            <Route exact path={'/'} component={Root}/>
            {/*<Route exact path={'/test'} component={Test}/>*/}
            <Route exact path={'/home'} component={Home}/>
            <Route exact path={'/login'} component={Login}/>
            <Route exact path={'/about'} component={About}/>
        </Switch>
    </main>
    <Footer className='footer'></Footer>
    
</Router>
  );
}

export default App;
