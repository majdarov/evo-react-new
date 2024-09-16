import { default as Axios, AxiosRequestConfig } from 'axios';
import { ApiEvoType } from './api_v2_config';

async function fetchEvo({
  baseURL,
  url,
  headers,
  method,
  body,
  params,
  // action,
}: ApiEvoType) {
  try {
    let request: AxiosRequestConfig = { baseURL, url, headers, method, params };
    // console.log(request);
    if (body) {
      request.data = body;
    }
    let response = await Axios(request);
    let result;
    if (method === 'DELETE') {
      result = response;
    } else {
      result = await response.data;
    }
    if (result.paging && result.paging.next_cursor) {
      request.params = { cursor: result.paging.next_cursor };
      let response = await fetchEvo(request as ApiEvoType);
      result.items = result.items.concat(response.items);
    }
    result.paging = {};
    return result;
  } catch (err) {
    return err;
  }
}

export default fetchEvo;
