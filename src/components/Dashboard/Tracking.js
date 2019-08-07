import React, { useEffect, useState } from 'react';
import { Badge, Box, Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EpisodeList from '../Shows/Seasons/EpisodeList';
import { getImgElAttr } from '../../services/api';
import { Poster } from '../Shows/ShowList';
import { deepClone } from '../../redux/reducers/userReducer';
import { navigateTo } from '../../services/app';

function Tracking({ trackShows, appSeasons }) {
  const [expansionControl, setExpansionControl] = useState({});
  const handleExpansionToggle = (showId, e, isExpanded) => {
    setExpansionControl({ [showId]: isExpanded });
  };

  const getUnwatchedCount = show => {
    const { id, seasons } = show;
    let totalWatchedCount = 0,
      totalEpisodeCount = 0;
    seasons.forEach(s => {
      show[s] && (totalWatchedCount += show[s].length);
      appSeasons[`${id}s${s}`] && (totalEpisodeCount += appSeasons[`${id}s${s}`].episodes.length);
    });
    return totalEpisodeCount - totalWatchedCount;
  };

  // calculate unwatched episodes and re-order shows
  const [sortedShows, setSortedShows] = useState(null);
  useEffect(() => {
    const trackShowsWithUnwatchedCount = deepClone(trackShows).map(s => {
      s.unwatchedCount = getUnwatchedCount(s);
      return s;
    });
    const sorted = trackShowsWithUnwatchedCount.sort((a, b) => b.unwatchedCount - a.unwatchedCount);
    setSortedShows(sorted);
  }, [trackShows, appSeasons]);

  return (
    sortedShows &&
    sortedShows.map(show => (
      <ExpansionPanel
        key={show.id}
        expanded={!!expansionControl[show.id]}
        onChange={(e, isExpanded) => handleExpansionToggle(show.id, e, isExpanded)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Box display={'flex'} alignItems={'center'}>
            <Badge
              color={'secondary'}
              badgeContent={show.unwatchedCount}
              invisible={show.unwatchedCount < 1}
            >
              <Poster {...getImgElAttr('poster', show.poster_path)} />
            </Badge>
            <Box ml={'1rem'}>{show.name}</Box>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box display={'flex'} flexDirection={'column'}>
            <Box mb={'.5rem'}>
              <Button
                color={'secondary'}
                variant={'contained'}
                fullWidth
                size={'small'}
                onClick={() => navigateTo(`/tv/${show.id}`)}
              >
                Go To Show Page
              </Button>
            </Box>
            {show.seasons.map(
              seasonNum =>
                appSeasons[`${show.id}s${seasonNum}`] && (
                  <Box key={seasonNum}>
                    <div>Season {seasonNum}</div>
                    <EpisodeList
                      key={seasonNum}
                      episodes={appSeasons[`${show.id}s${seasonNum}`].episodes}
                      watched={show[seasonNum] || []}
                    />
                  </Box>
                )
            )}
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))
  );
}

export default Tracking;
