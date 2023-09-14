import axios from 'axios';
import {baseURL} from '../utilities/routes';

export const TIMEOUT = 10000;

export const getData = axios.create({
  baseURL: baseURL,
  method: 'GET',
  withCredentials: true,
  timeout: TIMEOUT,
});

export const postData = axios.create({
  baseURL: baseURL,
  method: 'POST',
  withCredentials: true,
  timeout: TIMEOUT,
});

export const putData = axios.create({
  baseURL: baseURL,
  method: 'PUT',
  withCredentials: true,
  timeout: TIMEOUT,
});
