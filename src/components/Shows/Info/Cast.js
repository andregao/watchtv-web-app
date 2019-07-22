import React, { useEffect, useRef, useState } from 'react';
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

function Cast({ id, shows, dispatch }) {
  const cast = shows[id].credits.cast;
  const [size, setSize] = useState({ width: 0, height: 0 });

  return (
    <Container>
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
    </Container>
  );
}

const mapStateToProps = ({ shows }) => ({ shows });

export default connect(mapStateToProps)(Cast);
