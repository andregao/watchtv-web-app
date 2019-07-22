import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import styled from 'styled-components';
import { getCountryName, getImgElAttr } from '../../services/api';
import { Link } from 'react-router-dom';

function ShowList({ shows, handleClick }) {
  return (
    <>
      <List dense aria-label="short results" onClick={handleClick}>
        {shows &&
        shows.map(show => (
          <ListItem key={show.id} button component={Link} to={`/tv/${show.id}`}>
            <Poster {...getImgElAttr('poster', show.poster_path)} />
            <ListItemText primary={getPrimaryText(show)} secondary={getSecondaryText(show)} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

function getPrimaryText({ name, first_air_date }) {
  if (first_air_date) {
    return name.concat(first_air_date ? ` (${first_air_date.slice(0, 4)})` : '');
  }
  return name;
}

function getSecondaryText({ original_name, name, origin_country }) {
  if (origin_country) {
    let result = '';
    let haveOtherName = false;
    if (original_name !== name) {
      result = original_name;
      haveOtherName = true;
    }
    if (origin_country[0] && origin_country[0] !== 'US') {
      result = result + (haveOtherName ? ' - ' : '') + getCountryName(origin_country[0]);
    }
    return result;
  }
  return '';
}

const Poster = styled.img`
  max-height: 15vw;
  margin-right: 0.8rem;
`;

export default ShowList;
