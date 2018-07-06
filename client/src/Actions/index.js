import axios from 'axios';
import { FETCH_SURVEYS, FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => {
  return async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const submitSurvey = (values, history) => {
  return async dispatch => {
    const res = await axios.post('/api/surveys', values);
    dispatch({ type: FETCH_USER, payload: res.data });
    history.push('/surveys');
  };
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
