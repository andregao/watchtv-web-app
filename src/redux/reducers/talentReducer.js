import { DESELECT_TALENT, SET_SELECTED_TALENT } from '../actions/appActions';
import { GET_TALENT_DETAIL_SUCCESS } from '../actions/apiActions';

const initialState = { selectedTalent: null };

export default function talentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TALENT_DETAIL_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    }
    case SET_SELECTED_TALENT: {
      return {
        ...state,
        selectedTalent: action.payload
      };
    }
    case DESELECT_TALENT: {
      return {
        ...state,
        selectedTalent: null
      };
    }
    default: {
      return state;
    }
  }
}
