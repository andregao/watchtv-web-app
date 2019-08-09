import React from 'react';
import styled from 'styled-components';
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
import Talent from './Talent';

const Cast = ({ id, shows }) => {
  const cast = shows[id].credits.cast;

  return (
    <Container>
      <Box mb={'1rem'}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
              <Typography color={'textPrimary'}>Cast</Typography>
              <Typography color={'textSecondary'}>{cast.length} members</Typography>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TalentsContainer>
              {cast && cast.map(talent => <Talent key={talent.id} talent={talent} />)}
            </TalentsContainer>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Box>
    </Container>
  );
};

const TalentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const mapStateToProps = state => ({ shows: state.shows });

export default connect(mapStateToProps)(Cast);
