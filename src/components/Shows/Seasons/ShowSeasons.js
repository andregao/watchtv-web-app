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
import EpisodeList from './EpisodeList';
import { AppActions } from '../../../redux/actions/appActions';
import SelectSeasonButton from './SelectShowButton';

const ShowSeasons = ({
  seasons,
  appSeasons,
  shows,
  handleAddSeason,
  handleRemoveSeason,
  wizard = {},
  dispatch
}) => {
  const showId = shows.selectedShow;
  const showData = shows[showId];
  let selectedSeasonNum = null;
  showData && (selectedSeasonNum = showData.selectedSeason);

  const handleExpansionToggle = (seasonNum, isExpanded) => {
    isExpanded
      ? dispatch(AppActions.selectSeason(showId, seasonNum))
      : dispatch(AppActions.deselectSeason(showId));
  };

  const isSelectedInWizard = seasonNum => wizard.seasons && wizard.seasons.includes(seasonNum);

  const SelectButton = ({ seasonNum }) => (
    <SelectSeasonButton
      seasonNum={seasonNum}
      isSelected={isSelectedInWizard(seasonNum)}
      showData={showData}
      handleAddSeason={handleAddSeason}
      handleRemoveSeason={handleRemoveSeason}
    />
  );

  return (
    <Container>
      {!handleAddSeason && (
        <Typography variant={'h6'} color={'textSecondary'} gutterBottom>
          Seasons
        </Typography>
      )}
      {seasons.map(season => (
        <Box key={season.id}>
          <ExpansionPanel
            expanded={selectedSeasonNum === season.season_number}
            onChange={(e, isExpanded) => handleExpansionToggle(season.season_number, isExpanded)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                <Typography
                  color={isSelectedInWizard(season.season_number) ? 'secondary' : 'textPrimary'}
                >
                  Season {season.season_number}
                </Typography>
                <Typography
                  color={isSelectedInWizard(season.season_number) ? 'secondary' : 'textSecondary'}
                >
                  {season.episode_count} episodes
                </Typography>
              </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                {handleAddSeason && <SelectButton seasonNum={season.season_number} />}

                {appSeasons[`${showId}s${season.season_number}`] && (
                  <EpisodeList
                    episodes={appSeasons[`${showId}s${season.season_number}`].episodes}
                  />
                )}

                {handleAddSeason && season.episode_count > 8 && (
                  <SelectButton seasonNum={season.season_number} />
                )}
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Box>
      ))}
    </Container>
  );
};

export default connect()(ShowSeasons);
