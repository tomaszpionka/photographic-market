import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";
import { toast } from "react-toastify";
/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const DesktopContainer = ({ children }) => {
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

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
      window.location.href = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const [fixed, setFixed] = useState(null);

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={() => setFixed(true)}
        onBottomPassedReverse={() => setFixed(false)}
      >
        <Segment
          inverted
          textAlign="center"
          style={{ /*minHeight: 700,*/ padding: "1em 0em" }}
          vertical
        >
          <Menu
            fixed={fixed ? "top" : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size="large"
          >
            <Container>
              <Menu.Item as={Link} to="/">
                home
              </Menu.Item>
              <Menu.Item as={Link} to="/dashboard">
                dashboard
              </Menu.Item>
              <Menu.Item as={Link} to="/items">
                items
              </Menu.Item>
              <Menu.Item as={Link} to="/orders">
                orders
              </Menu.Item>
              <Menu.Item as={Link} to="/users">
                users
              </Menu.Item>

              <Menu.Item position="right">
                {!isAuthenticated ? (
                  <Fragment>
                    <Button as={Link} to="/login" inverted={!fixed}>
                      login
                    </Button>
                    <Button
                      as={Link}
                      to="/register"
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: "0.5em" }}
                    >
                      register
                    </Button>
                  </Fragment>
                ) : (
                  <Button
                    as={Button}
                    onClick={(e) => logout(e)}
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                  >
                    logout
                  </Button>
                )}
              </Menu.Item>
            </Container>
          </Menu>
          {children}
          {/* <HomepageHeading /> */}
        </Segment>
      </Visibility>
    </Responsive>
  );
};

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

const MobileContainer = ({ children }) => {
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

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
      window.location.href = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const [opened, setOpened] = useState(false);

  return (
    <Responsive
      as={Sidebar.Pushable}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation="push"
        inverted
        onHide={() => setOpened(false)}
        vertical
        visible={opened}
      >
        <Menu.Item as="a" active>
          home
        </Menu.Item>
        <Menu.Item as={Link} to="/dashboard">
          dashboard
        </Menu.Item>
        <Menu.Item as={Link} to="/items">
          items
        </Menu.Item>
        <Menu.Item as={Link} to="/orders">
          orders
        </Menu.Item>
        <Menu.Item as={Link} to="/users">
          users
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={opened}>
        <Segment
          inverted
          textAlign="center"
          style={{ /*minHeight: 350,*/ padding: "1em 0em" }}
          vertical
        >
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item onClick={() => setOpened(true)}>
                <Icon name="sidebar" />
              </Menu.Item>
              <Menu.Item position="right">
                {!isAuthenticated ? (
                  <Fragment>
                    <Button as={Link} to="/login" inverted>
                      login
                    </Button>
                    <Button
                      as={Link}
                      to="/register"
                      inverted
                      style={{ marginLeft: "0.5em" }}
                    >
                      register
                    </Button>
                  </Fragment>
                ) : (
                  <Button
                    as={Button}
                    onClick={(e) => logout(e)}
                    inverted
                    style={{ marginLeft: "0.5em" }}
                  >
                    logout
                  </Button>
                )}
              </Menu.Item>
            </Menu>
          </Container>
          {/* <HomepageHeading mobile /> */}
        </Segment>

        {/* {children} */}
      </Sidebar.Pusher>
    </Responsive>
  );
};

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

export default ResponsiveContainer;
