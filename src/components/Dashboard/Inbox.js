import React, { useState } from 'react';
import { Box, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import EpisodeList from '../Shows/Seasons/EpisodeList';
import { connect } from 'react-redux';

function Inbox({ trackShows, seasons }) {
  const [expansion, setExpansion] = useState({});
  const handleExpansionToggle = showId => (e, isExpanded) => setExpansion({ [showId]: isExpanded });

  return trackShows.map(show => (
    <ExpansionPanel
      key={show.id}
      expanded={!!expansion[show.id]}
      onChange={handleExpansionToggle(show.id)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Box display={'flex'} alignItems={'center'}>
          <FiberNewIcon color={'secondary'} />
          <Box ml={'1rem'}>{show.name}</Box>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {show.seasons.map(
          seasonNum =>
            seasons[`${show.id}s${seasonNum}`] && (
              <EpisodeList
                key={seasonNum}
                episodes={seasons[`${show.id}s${seasonNum}`].episodes}
                watched={show[seasonNum]}
              />
            )
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));
}

const mapStateToProps = state => ({
  seasons: state.seasons
});
export default connect(mapStateToProps)(Inbox);
