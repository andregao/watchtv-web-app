import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { blue, cyan, deepOrange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

import { appInit$, initializeApp } from './services/app';
import { saveNameToAuth, stopMonitoringAuth, user$ } from './services/auth';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Search from './components/modals/Search';
import EpisodeDetail from './components/modals/EpisodeDetail';
import TalentDetail from './components/modals/TalentDetail';
import { AuthActions } from './redux/actions/authActions';

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Welcome = lazy(() => import('./components/Welcome/Welcome'));
const SignIn = lazy(() => import('./components/Auth/SignIn'));
const SignUp = lazy(() => import('./components/Auth/SignUp'));
const ShowDetails = lazy(() => import('./components/Shows/ShowPage'));
const Explore = lazy(() => import('./components/Explore/Explore'));

const Loading = () => <Box>Loading...</Box>;

const LandingComponent = lazy(() => {
  return new Promise(resolve => {
    user$.subscribe(user => {
      if (user) {
        resolve(import('./components/Dashboard/Dashboard'));
      } else {
        resolve(import('./components/Welcome/Welcome'));
      }
    });
  });
});

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: deepOrange,
    secondary: blue,
    error: { main: cyan[500] }
  }
});

function App({ dispatch, history }) {
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    initializeApp();
    user$.subscribe(authUser => {
      if (authUser) {
        authUser.displayName
          ? dispatch(AuthActions.receiveUserProfile(authUser))
          : saveNameToAuth();
      } else {
        dispatch(AuthActions.notSignedIn());
        history.location.pathname === '/dashboard' && history.push('/welcome');
      }
    });
    appInit$.subscribe(() => setAppInit(true));
    return () => stopMonitoringAuth();
  }, []);

  return (
    appInit && (
      <RootContainer>
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <Header />
            <Box
              flex={'1 0 auto'}
              width={'95%'}
              maxWidth={'1280px'}
              alignSelf={'center'}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
            >
              <Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path={'/'} component={LandingComponent} />
                  <Route path={'/signin'} component={SignIn} />
                  <Route path={'/signup'} component={SignUp} />
                  <Route path={'/dashboard'} component={Dashboard} />
                  <Route path={'/welcome'} component={Welcome} />
                  <Route path={'/explore'} component={Explore} />
                  <Route path={'/tv/:tvId'} component={ShowDetails} />
                </Switch>
              </Suspense>
            </Box>
            <Footer />

            {/* Modals */}
            <Search />
            <EpisodeDetail />
            <TalentDetail />
          </CssBaseline>
        </MuiThemeProvider>
      </RootContainer>
    )
  );
}

const RootContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default withRouter(connect()(App));
