import React, { useState } from 'react';
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
  const [size, setSize] = useState({ width: 0, height: 0 });

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
            <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-evenly'}>
              {cast &&
              cast.map((talent, index) => (
                <Talent
                  key={talent.id}
                  talent={talent}
                  size={size}
                  setSize={index === 0 ? setSize : null}
                />
              ))}
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Box>
    </Container>
  );
};

const mapStateToProps = state => ({ shows: state.shows });

export default connect(mapStateToProps)(Cast);
