import React from 'react';
import {
  Box,
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { ApiActions } from '../../../redux/actions/apiActions';
import EpisodeList from './EpisodeList';

function ShowSeasons({ seasons, seasonDetail, selectedShow, selectedSeason, dispatch }) {
  const handleExpansionToggle = (showId, num) => (e, isExpanded) => {
    isExpanded
      ? dispatch(ApiActions.selectSeason(showId, num))
      : dispatch(ApiActions.deselectSeason(showId));
  };

  return (
    <Container>
      <Typography variant={'h6'} color={'textSecondary'} gutterBottom>
        Seasons
      </Typography>
      {seasons.map(season => (
        <ExpansionPanel
          key={season.id}
          expanded={selectedSeason === season.season_number}
          onChange={handleExpansionToggle(selectedShow, season.season_number)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
              <Typography color={'textPrimary'}>Season {season.season_number}</Typography>
              <Typography color={'textSecondary'}>{season.episode_count} episodes</Typography>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <>
            {seasonDetail[`${selectedShow}s${season.season_number}`] && (
              <EpisodeList
                episodes={seasonDetail[`${selectedShow}s${season.season_number}`].episodes}
              />
            )}
            </>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Container>
  );
}

const mapStateToProps = state => ({
  selectedShow: state.shows.selectedShow,
  selectedSeason:
    state.shows[state.shows.selectedShow] && state.shows[state.shows.selectedShow].selectedSeason,
  seasonDetail: state.seasons
});

export default connect(mapStateToProps)(ShowSeasons);
