import { ajax } from 'rxjs/ajax';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

/*
  all variables below
1) once initialized won't change,
2) root component(App) won't render until these are initialized,
3) api functions won't be referenced until root renders,
  they are:
- consumed in api functions as CONSTANTS and do not have state
- stored in function closures instead of the redux store
*/
let TMDB_KEY = '';
let OMDB_KEY = '';
let IMG_BASE_URL = '';
let COUNTRIES = {};
const IMG_SIZE_BY_TYPE = {};
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const FUNCTIONS_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/andregao-com/us-central1/api/api'
    : 'https://watchtv.web.app/api';
const apiInit = new Subject();
export const apiInit$ = apiInit.asObservable();

export function initializeApi() {
  ajax
    .getJSON(`${FUNCTIONS_BASE_URL}/config`)
    .subscribe(config => {
      storeConfig(config);
      apiInit.next();
    });
}


export function searchShows(query, pageNum = 1) {
  query = query.trim().toLowerCase();
  const keyword = 'query=' + query;
  const page = 'page=' + pageNum.toString();
  return ajax.getJSON(`${TMDB_BASE_URL}/search/tv?${TMDB_KEY}&${keyword}&${page}`);
}

export function fetchShowDetail(id) {
  return ajax
    .getJSON(`${TMDB_BASE_URL}/tv/${id}?${TMDB_KEY}&append_to_response=external_ids,credits`)
    .pipe(
      map(reverseOrder('seasons')),
      // get extra imdb data from omdb api
      mergeMap(tmdbData => {
        const id = tmdbData.external_ids.imdb_id;
        return getImdbDetail(id, OMDB_KEY).pipe(
          map(({ Plot, imdbRating, imdbVotes, Genre, Runtime, Country }) => {
            const extraInfo = {
              plot: Plot,
              rating: imdbRating,
              votes: imdbVotes,
              genre: Genre,
              runtime: Runtime,
              country: Country
            };
            return { ...tmdbData, imdb: extraInfo };
          })
        );
      })
    );
}

export function getImdbDetail(id, apiKey) {
  return ajax.getJSON(`https://www.omdbapi.com/?${apiKey}&i=${id}`);
}

export function fetchSeasonDetail(showId, num) {
  return ajax.getJSON(`${TMDB_BASE_URL}/tv/${showId}/season/${num}?${TMDB_KEY}`).pipe(
    map(reverseOrder('episodes'))
  );
}

export function fetchTalentDetail(id) {
  return ajax.getJSON(`${TMDB_BASE_URL}/person/${id}?${TMDB_KEY}`);
}

/*
  helper functions below
*/

function storeConfig(config) {
  TMDB_KEY = 'api_key=' + config.tmdbKey;
  OMDB_KEY = 'apikey=' + config.omdbKey;
  IMG_BASE_URL = config.secureBaseUrl;
  IMG_SIZE_BY_TYPE.logo = config.logoSizes;
  IMG_SIZE_BY_TYPE.poster = config.posterSizes;
  IMG_SIZE_BY_TYPE.profile = config.profileSizes;
  IMG_SIZE_BY_TYPE.backdrop = config.backdropSizes;
  IMG_SIZE_BY_TYPE.still = config.stillSizes;
  COUNTRIES = config.countries;
}

export function getCountryName(abbr) {
  return COUNTRIES[abbr];
}

export function getImgElAttr(type, path, original = false) {
  if (original) {
    return { src: getImgSrc(type, path, true) };
  }
  return {
    src: getImgSrc(type, path),
    srcSet: getImgSrcSet(type, path)
  };
}

export function getImgSrcSet(type, path) {
  if (path) {
    let result = '';
    IMG_SIZE_BY_TYPE[type].forEach((item, index, array) => {
      if (index !== 0 && index !== array.length - 1) {
        let pixels;
        item[0] === 'w' ? (pixels = item.slice(1, item.length) + 'w') : (pixels = '420w');
        result = result + `${IMG_BASE_URL}${item}${path} ${pixels},`;
      }
    });
    return result;
  } else {
    return null;
  }
}

function getImgSrc(type, path, original = false) {
  if (original) {
    const pixelSpecs = IMG_SIZE_BY_TYPE[type][IMG_SIZE_BY_TYPE[type].length - 1];
    return `${IMG_BASE_URL}${pixelSpecs}${path}`;
  }
  const pixelSpecs = IMG_SIZE_BY_TYPE[type][0];

  if (path) {
    return `${IMG_BASE_URL}${pixelSpecs}${path}`;
  } else {
    return getPlaceholderUrl(pixelSpecs, type);
  }
}

function getPlaceholderUrl(specs, type) {
  const aspectRatios = {
    poster: 0.6667,
    backdrop: 1.78,
    logo: 2.6,
    profile: 0.6667,
    still: 1.78
  };
  let widthPixels, heightPixels;

  if (specs[0] === 'w') {
    widthPixels = +specs.slice(1, specs.length);
    heightPixels = widthPixels / aspectRatios[type];
  } else {
    heightPixels = +specs.slice(1, specs.length);
    widthPixels = heightPixels * aspectRatios[type];
  }
  widthPixels = Math.round(widthPixels);
  heightPixels = Math.round(heightPixels);
  return `https://via.placeholder.com/${widthPixels}x${heightPixels}?text=No+Image`;
}

export function getImdbShowLink(id) {
  return `https://www.imdb.com/title/${id}/`;
}

export function getImdbTalentLink(id) {
  return `https://www.imdb.com/name/${id}/`;
}

export function getTwitterLink(handle) {
  return `https://twitter.com/${handle}`;
}

export function getInstagramLink(handle) {
  return `https://www.instagram.com/${handle}`;
}

export function getExternalLinkAttr() {
  return {
    target: '_blank',
    rel: 'noopener noreferrer'
  };
}

const reverseOrder = property => data => {
  const reversed = [...data[property]].reverse();
  return { ...data, [property]: reversed };
};
