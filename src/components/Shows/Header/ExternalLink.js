import { Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { getExternalLinkAttr } from '../../../services/api';

function ExternalLink({ link, imgAttr, alt, imdb = null }) {
  return (
    <>
      {imdb && (
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-end'}
          flex={'0 1 auto'}
          color={'text.primary'}
          maxHeight={'100%'}
          mb={'.5rem'}
          component={'a'}
          href={link}
          {...getExternalLinkAttr()}
        >
          <Box display={'flex'} alignItems={'flex-end'} maxHeight={'100%'}>
            <Rating>{imdb.rating}</Rating>
            <Rating altRating>/10</Rating>
          </Box>
          <Votes>{imdb.votes}</Votes>
        </Box>
      )}
      <Box
        flex={'0 1 auto'}
        height={'100%'}
        ml={'0.5rem'}
        mb={'0.5rem'}
        color={'primary'}
        component={'a'}
        href={link}
        {...getExternalLinkAttr()}
      >
        <LogoContainer>
          <Logo {...imgAttr} />
        </LogoContainer>
      </Box>
    </>
  );
}

const Rating = styled.div`
  max-height: 100%;
  display: ${props => (props.altRating ? 'none' : 'block')};
  font-size: 4vw;
  @media (min-width: 600px) {
    display: block;
    font-size: ${props => (props.altRating ? '0.8rem' : '1.2rem')};
  }
`;
const Votes = styled.div`
  font-size: 0.6rem;
  display: none;
  @media (min-width: 600px) {
    font-size: 0.8rem;
    display: block;
  }
  color: darkgoldenrod;
`;

const LogoContainer = styled.div`
  height: 100%;
  max-width: 100%;
`;

const Logo = styled.img`
  height: 100%;
  max-height: 3rem;
  object-fit: contain;
  &:hover {
    filter: brightness(1.3) opacity(65%);
  }
`;

export default ExternalLink;
