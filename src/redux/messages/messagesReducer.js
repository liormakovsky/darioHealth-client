import {
  GET_MESSAGES_BEGIN,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  GET_INPUTS_BEGIN,
  GET_INPUTS_SUCCESS,
  GET_INPUTS_ERROR,
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

    case GET_INPUTS_BEGIN:
      return { ...state, isLoading: true };

    case GET_INPUTS_SUCCESS:
      return {
        ...state,
        inputs: action.payload,
        isLoading: false,
      };

    case GET_INPUTS_ERROR:
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
