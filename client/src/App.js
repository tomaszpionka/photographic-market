import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { toast } from "react-toastify";

//components

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import Items from "./components/items/Items";
import Users from "./components/users/Users";
// import Orders from "./components/orders/Orders";
import ResponsiveContainer from "./components/menu/Header";
import Footer from "./components/menu/Footer";
import Profile from "./components/profile/Profile";
// import SingleItem from "./components/items/SingleItem";

toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <BrowserRouter>
        <ResponsiveContainer
          isAuthenticated={isAuthenticated}
          setAuth={setAuth}
        />
        <Switch>
          <Route
            exact
            path="/profile"
            render={(props) => <Profile {...props} setAuth={setAuth} />}
          />
          {/* <Route
            exact
            path="/item/:id"
            render={(props) => <SingleItem {...props} setAuth={setAuth} />}
          /> */}
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} setAuth={setAuth} />}
          />
          <Route
            exact
            path="/items"
            render={(props) => <Items {...props} setAuth={setAuth} />}
          />
          <Route
            exact
            path="/users"
            render={(props) => <Users {...props} setAuth={setAuth} />}
          />
          {/* <Route
            exact
            path="/orders"
            render={(props) => <Orders {...props} setAuth={setAuth} />}
          /> */}
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
