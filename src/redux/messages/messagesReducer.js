import {
  GET_MESSAGES_BEGIN,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
} from "./messagesTypes";

import { messagesInitialState } from "./messagesActions";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_MESSAGES_BEGIN:
      return { ...state, isLoading: true };

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        totals: action.payload,
        isLoading: false,
      };

    case GET_MESSAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      if (!state) {
        return messagesInitialState;
      }
      return state;
  }
};

export default reducer;
