import { Box } from '@material-ui/core';
import { getImdbShowLink, getImgElAttr, getInstagramLink, getTwitterLink } from '../../../services/api';
import imdbLogo from '../../../static/imdb.svg';
import twitterLogo from '../../../static/twitter.svg';
import instagramLogo from '../../../static/instagram.svg';
import React from 'react';
import ExternalLink from './ExternalLink';

function ExternalLinks({ show }) {
  return (
    <Box
      display={'flex'}
      justifyContent={'flex-end'}
      alignItems={'flex-end'}
      flex={'0 1 60%'}
      flexWrap={'wrap'}
      height={'6vw'}
      maxHeight={'3rem'}
    >
      {/* imdb */}
      {show.external_ids.imdb_id && (
        <ExternalLink
          link={getImdbShowLink(show.external_ids.imdb_id)}
          imgAttr={{ src: imdbLogo }}
          alt={'imdb link'}
          imdb={show.imdb}
        />
      )}
      {/* twitter */}
      {show.external_ids.twitter_id && (
        <ExternalLink
          link={getTwitterLink(show.external_ids.twitter_id)}
          imgAttr={{ src: twitterLogo }}
          alt={'twitter link'}
        />
      )}
      {/* instagram */}
      {show.external_ids.instagram_id && (
        <ExternalLink
          link={getInstagramLink(show.external_ids.instagram_id)}
          imgAttr={{ src: instagramLogo }}
          alt={'instagram link'}
        />
      )}
      {/* network */}
      {show.networks.length > 0 &&
        show.networks.map(network => (
          <ExternalLink
            key={network.id}
            link={show.homepage}
            imgAttr={getImgElAttr('logo', network.logo_path)}
            alt={'network link'}
          />
        ))}
    </Box>
  );
}

export default ExternalLinks;
