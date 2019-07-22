import React from 'react';
import styled from 'styled-components';
import { getImgElAttr } from '../../../services/api';
import { Box } from '@material-ui/core';
import ExternalLinks from './ExternalLinks';

function ShowHeader({ show }) {
  return (
    <>
      {show && (
        <>
          <Box position={'relative'}>
            <Backdrop {...getImgElAttr('backdrop', show.backdrop_path)} alt={'Show backdrop'} />
            <TitleContainer>
              <Title>{show.name}</Title>
              {show.original_language !== 'en' && <Title altTitle>{show.original_name}</Title>}
            </TitleContainer>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} zIndex={900} mx={'1rem'}>
            <PosterContainer >
              <Poster {...getImgElAttr('poster', show.poster_path)} alt="Show Poster" />
            </PosterContainer>

            <ExternalLinks show={show} />
          </Box>
        </>
      )}
    </>
  );
}

const Backdrop = styled.img`
  width: 100%;
  max-height: 45vh;
  object-fit: cover;
  filter: brightness(0.5) grayscale(25%);
`;

const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 0.5rem 0.7rem 0;
  max-width: 67%;
  display: flex;
  flex-direction: column;
  color: white;
`;

const Title = styled.div`
  font-size: ${props => (props.altTitle ? '1.2rem' : '2rem')};
  text-align: right;
  text-shadow: 1px 1px 4px black;
`;

const PosterContainer = styled.div`
  flex: 0 0 30%;
  margin-top: -28%;
  //max-height: 50vh;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 2px;
`;
const Poster = styled.img`
  max-width: 100%;
  object-fit: contain;

`

export default ShowHeader;
