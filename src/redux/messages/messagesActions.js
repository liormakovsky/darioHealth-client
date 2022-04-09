import axios from "axios";

import {
  GET_MESSAGES_BEGIN,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  GET_INPUTS_BEGIN,
  GET_INPUTS_SUCCESS,
  GET_INPUTS_ERROR,
} from "./messagesTypes";

export const messagesInitialState = {
  isLoading: false,
  error: "",
  totals: [],
  inputs: [],
};

export const getTotalMessages = (filters) => {
  return async (dispatch) => {
    dispatch({ type: GET_MESSAGES_BEGIN });
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:8000/api/v1/getTotalMessages",
        data: filters,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (data.success === true) {
        dispatch({ type: GET_MESSAGES_SUCCESS, payload: data.data });
      } else {
        dispatch({ type: GET_MESSAGES_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const getInputsValues = () => {
  return async (dispatch) => {
    dispatch({ type: GET_INPUTS_BEGIN });
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:8000/api/v1/getInputsValues",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (data.success === true) {
        dispatch({ type: GET_INPUTS_SUCCESS, payload: data.data });
      } else {
        dispatch({ type: GET_INPUTS_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};
