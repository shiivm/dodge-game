import axios from "../utils/axios";
import setAuthToken from "../utils/setAuthToken";

import { ADD_SCORE, GET_SCORE } from "./types";
import { returnErrors } from "./errorAction";

export const getScore = () => (dispatch) => {
  const token = localStorage.getItem("authToken") || "";
  setAuthToken(token);
  axios
    .get("api/score")
    .then((res) =>
      dispatch({
        type: GET_SCORE,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.errorMsg, err.response.status));
    });
};

export const addScore = (score) => (dispatch) => {
  const token = localStorage.getItem("authToken") || "";
  setAuthToken(token);
  axios
    .post("api/score", score)
    .then((res) => {
      dispatch({
        type: ADD_SCORE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.errorMsg, err.response.status));
    });
};
