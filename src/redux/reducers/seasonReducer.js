import { GET_SEASON_DETAIL_SUCCESS } from '../actions/apiActions';

const initialState = {};

export default function seasonReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEASON_DETAIL_SUCCESS: {
      const {showId, data} = action.payload;
      const seasonNum = data.season_number;
      return {
        ...state,
        [`${showId}s${seasonNum}`]: data
      };
    }
    default: {
      return state;
    }
  }
}
