import { ADD_SCORE, GET_SCORE } from "../action/types";

const initialState = {
  scores: [],
  error: null,
  highScore : 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SCORE:
      return {
        ...state,
        scores: action.payload.score,
      };
    case GET_SCORE:
      return {
        ...state,
        scores: action.payload,
        highScore : action.payload[0].score
      };

    default:
      return state
  }
};
export default reducer;
