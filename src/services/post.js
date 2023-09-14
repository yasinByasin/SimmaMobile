import { authHeader, header } from '../utilities/constants';
import { postData } from './apiServices';

export default async (url, params, token = authHeader, useHeader = false) => {

  let apiHeaders = token
  if (useHeader) {
    apiHeaders = await header()
  }
  return await postData.post(url, params, { headers: apiHeaders });
};
