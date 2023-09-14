import {authHeader, header} from '../utilities/constants';
import {getData} from './apiServices';
export default async (url, token = authHeader, params = {}, useHeader=false) => {
  let userAuth = token
  if(useHeader){
    userAuth = await header()
  }
  return getData.get(url, {headers: userAuth}, {params: {...params}});
};
