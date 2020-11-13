import { Container, Content, Header } from "rsuite";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

import "./App.css";
import AppBar from "./components/AppBar";
import SignIn from "./pages/SignIn";
import { Suspense, useEffect, useState } from "react";
import { STORAGE_KEY } from "./util/constants";
import useMounted from "./util/hooks/mounted";
import { clear, getObject, setObject } from "./util/storage";
import { AppContext, useAppContext } from "./context/app";
import Guides from "./pages/Guides";
import Users from "./pages/Users";
import AdminDrawer from "./components/AdminDrawer";
import ProfileDrawer from "./components/ProfileDrawer";
import ChangePassword from "./pages/ChangePassword";
import PageLoader from "./components/PageLoader";

function Main() {
  const { url, path } = useRouteMatch();
  const { currentUser } = useAppContext();

  return (
    <Switch>
      <Route
        path={`${path}/users`}
        render={() => {
          return currentUser.requiresPasswordChange ? (
            <Redirect to="/app/change-password" />
          ) : (
            <Users />
          );
        }}
        exact
      />
      <Route
        path={`${path}/guides`}
        render={() => {
          return currentUser.requiresPasswordChange ? (
            <Redirect to="/app/change-password" />
          ) : (
            <Guides />
          );
        }}
      />
      <Route path={`${path}/change-password`} component={ChangePassword} />
      <Route render={() => <Redirect to={`${url}/guides`} />} />
    </Switch>
  );
}

function App() {
  const [currentUser, setCurrUser] = useState(null);
  const [authenticating, setAuthenticating] = useState(true);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isAdminOpen, setAdminOpen] = useState(false);
  const [active, setActive] = useState("1");
  const { isMounted, setMounted } = useMounted();

  const toggleProfile = () => setProfileOpen(!isProfileOpen);
  const closeProfile = () => setProfileOpen(false);
  const toggleAdmin = () => setAdminOpen(!isAdminOpen);
  const closeAdmin = () => setAdminOpen(false);
  const setCurrentUser = async (currUser) => {
    if (!currUser) {
      await clear();
      return setCurrUser(null);
    }

    const newDetails = {
      ...currentUser,
      ...currUser,
    };
    await setObject(STORAGE_KEY, {
      currentUser: newDetails,
    });

    setCurrUser(newDetails);
  };

  useEffect(() => {
    getObject(STORAGE_KEY).then((data) => {
      if (!isMounted) {
        return;
      }

      if (data && data.currentUser) {
        setCurrentUser(data.currentUser);
      }

      setAuthenticating(false);
    });

    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <div className="h100">
      <AppContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <ProfileDrawer isOpen={isProfileOpen} onClose={closeProfile} />
        <AdminDrawer isOpen={isAdminOpen} onClose={closeAdmin} />
        {authenticating ? (
          <PageLoader />
        ) : (
          <Container className="h100 page-container">
            <Router>
              <Header>
                <AppBar
                  onSelect={setActive}
                  activeKey={active}
                  onProfileClick={toggleProfile}
                  onAdminClick={toggleAdmin}
                />
              </Header>
              <Content className="d-flex">
                <Suspense fallback={<PageLoader />}>
                  <Switch>
                    <Route
                      path="/sign-in"
                      render={() => {
                        return currentUser ? (
                          <Redirect to="/app" />
                        ) : (
                          <SignIn />
                        );
                      }}
                      exact
                    />
                    <Route
                      path="/app"
                      render={() => {
                        return currentUser ? (
                          <Main />
                        ) : (
                          <Redirect to="/sign-in" />
                        );
                      }}
                    />
                    <Route render={() => <Redirect to="/sign-in" />} />
                  </Switch>
                </Suspense>
              </Content>
            </Router>
          </Container>
        )}
      </AppContext.Provider>
    </div>
  );
}

export default App;
