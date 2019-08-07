import { Box, Typography } from '@material-ui/core';
import React from 'react';

function ShowInfo({ genre, country, runtime, plot, id }) {
  return (
    <Box m={'1rem'} display={'flex'} flexDirection={'column'}>
        {/*extra info*/}
        <Box display={'flex'} mb={'1rem'}>
          <InfoBlock primary={'Genre:'} secondary={genre} />
          <InfoBlock primary={'Runtime:'} secondary={runtime} />
          <InfoBlock primary={'Country:'} secondary={country} />
        </Box>

        {/* plot */}
        <InfoBlock primary={'Plot:'} secondary={plot} />

    </Box>
  );
}

const InfoBlock = ({ primary, secondary }) => (
  <Box display={'flex'} flexDirection={'column'} mx={'1rem'}>
    <Typography variant={'body2'}>{primary}</Typography>
    <Typography variant={'body2'} color={'textSecondary'}>
      {secondary}
    </Typography>
  </Box>
);

export default ShowInfo;
