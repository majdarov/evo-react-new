import { default as Axios, AxiosRequestConfig, ResponseType } from 'axios';

async function fetchBack({
  baseURL,
  url,
  headers,
  method,
  data,
  params
}: AxiosRequestConfig ) {
  try {

    let request: AxiosRequestConfig = { baseURL, url, headers, method, params, data };

    let response = await Axios(request);
    let result;
    if (method === 'DELETE') {
      result = response;
    } else {
      result = await response.data;
    }
    if (result.paging && result.paging.next_cursor) {
      request.params = { cursor: result.paging.next_cursor };
      let response = await fetchBack(request);
      result.items = result.items.concat(response.items);
    }
    result.paging = {};
    return result;
  } catch (err) {
    return err;
  }
}

export default fetchBack;
