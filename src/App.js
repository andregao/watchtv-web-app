import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { blue, cyan, deepOrange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

import { appInit$, initializeApp, navigate$ } from './services/app';
import { saveNameToAuth, stopMonitoringAuth, user$ } from './services/auth';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Search from './components/modals/Search';
import EpisodeDetail from './components/modals/EpisodeDetail';
import TalentDetail from './components/modals/TalentDetail';
import { AuthActions } from './redux/actions/authActions';
import TrackWizard from './components/modals/TrackWizard';
import Notification from './components/layouts/Notification';

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Welcome = lazy(() => import('./components/Welcome/Welcome'));
const SignIn = lazy(() => import('./components/Auth/SignIn'));
const SignUp = lazy(() => import('./components/Auth/SignUp'));
const ShowDetails = lazy(() => import('./components/Shows/ShowPage'));
// const Explore = lazy(() => import('./components/Explore/Explore'));

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

const App = ({ search, episode, talent, track, dispatch, history }) => {
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    // get API configuration, start auth service
    initializeApp();

    // listens to auth service
    user$.subscribe(authUser => {
      if (authUser) {
        authUser.displayName
          ? dispatch(AuthActions.receiveUserProfile(authUser))
          : saveNameToAuth();
      } else {
        dispatch(AuthActions.notSignedIn());
      }
    });

    // once all initializations had started, mount app component
    appInit$.subscribe(() => setAppInit(true));

    // navigation helper
    const navSub = navigate$.subscribe(path => history.push(path));

    return () => {
      // clean up listeners
      stopMonitoringAuth();
      navSub.unsubscribe();
    };
  }, []);

  return (
    appInit && (
      <RootContainer>
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <Header />
            <Box
              flex={'1 0 auto'}
              width={'100%'}
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
                  <Route path={'/tv/:tvId'} component={ShowDetails} />
                  {/*<Route path={'/explore'} component={Explore} />*/}
                </Switch>
              </Suspense>
            </Box>
            <Footer />

            {/* Modals */}
            {search && <Search open={search} />}
            {episode && <EpisodeDetail open={episode} />}
            {talent && <TalentDetail open={talent} />}
            {track && <TrackWizard open={track} />}

            {/* Notifications */}
            <Notification history={history} />
          </CssBaseline>
        </MuiThemeProvider>
      </RootContainer>
    )
  );
};

const RootContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const mapStateToProps = state => ({
  search: state.layout.searchOpen,
  episode: state.layout.episodeDetailOpen,
  talent: !!state.talents.selectedTalent,
  track: state.trackWizard
});

export default withRouter(connect(mapStateToProps)(App));
