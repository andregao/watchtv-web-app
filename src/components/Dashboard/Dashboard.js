import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import ShowList from '../Shows/ShowList';
import Tracking from './Tracking';
import { LayoutActions } from '../../redux/actions/layoutActions';
import { navigateTo } from '../../services/app';

function Dashboard({ userProfile, trackShows, favShows, appSeasons, history,dispatch }) {
  useEffect(() => {
    userProfile === 'No User' && history.push('/welcome');
  }, [userProfile]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSelectTab = (e, i) => setSelectedIndex(i);

  return (
    <Box width={'100%'} maxWidth={600}>
      <Tabs variant={'fullWidth'} value={selectedIndex} onChange={handleSelectTab}>
        <Tab label={'Following'} />
        <Tab label={'Favorites'} />
      </Tabs>
      <TabContent ownIndex={0} selectedIndex={selectedIndex}>
        {trackShows.length ? (
          <Tracking trackShows={trackShows} appSeasons={appSeasons} />
        ) : (
          <PlaceHolder message={'Not Following Any Show'} dispatch={dispatch} />
        )}
      </TabContent>
      <TabContent ownIndex={1} selectedIndex={selectedIndex}>
        {favShows.length ? (
          <ShowList shows={favShows} />
        ) : (
          <PlaceHolder message={'No Favorite Yet'} dispatch={dispatch} />
        )}
      </TabContent>
    </Box>
  );
}

function TabContent({ selectedIndex, ownIndex, children, ...rest }) {
  return (
    <Box hidden={selectedIndex !== ownIndex} {...rest}>
      {children}
    </Box>
  );
}

const PlaceHolder = ({ message, dispatch }) => (
  <Box mt={'2rem'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
    <Typography variant={'body1'} align={'center'} color={'textSecondary'} gutterBottom>
      {message}
    </Typography>
    <Button
      variant="contained"
      color="secondary"
      onClick={() => dispatch(LayoutActions.toggleSearch())}
    >
      Find a TV show
    </Button>
  </Box>
);

const mapStateToProps = state => ({
  userProfile: state.user.profile,
  trackShows: state.user.trackShows,
  favShows: state.user.favShows,
  appSeasons: state.seasons
});
export default connect(mapStateToProps)(Dashboard);
