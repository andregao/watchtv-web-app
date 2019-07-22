import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import ShowList from '../modals/ShowList';
import Inbox from './Inbox';

function Dashboard({ userData }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSelectTab = (e, i) => setSelectedIndex(i);
  const [trackShows, setTrackShows] = useState(null);
  const [favShows, setFavShows] = useState(null);

  useEffect(() => {
    if (userData) {
      mapShows(userData.track, setTrackShows);
      mapShows(userData.fav, setFavShows);
    }
  }, [userData]);
  return (
    <Box width={'100%'} maxWidth={600}>
      <Tabs variant={'fullWidth'} value={selectedIndex} onChange={handleSelectTab}>
        <Tab label={'Inbox'} />
        <Tab label={'My Shows'} />
      </Tabs>
      <TabContent ownIndex={0} selectedIndex={selectedIndex}>
        {trackShows && <Inbox trackShows={trackShows} />}
      </TabContent>
      <TabContent ownIndex={1} selectedIndex={selectedIndex}>
        Currently Tracking:
        {trackShows && <ShowList shows={trackShows} handleClick={() => {
        }} />}
        Favorite Shows
        {favShows && <ShowList shows={favShows} handleClick={() => {
        }} />}
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

const mapShows = (obj, setter) => {
  // map show data to array and add id property
  const target = Object.keys(obj).map(id => ({ ...obj[id], id }));
  target.length !== 0 ? setter(target) : setter(null);
};

const mapStateToProps = state => ({
  userData: state.user.data,
  shows: state.shows
});
export default connect(mapStateToProps)(Dashboard);
