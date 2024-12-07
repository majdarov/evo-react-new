import { DocType } from '../redux/docsSlice';
import api_back from './api_backend/api.backend.config';
import fetchBack from './api_backend/fetchBackAxios';

const apiBack = {
  async getDocs(bUrl: string = '') {
    let request = api_back;
    request.baseURL = bUrl;
    request.url = 'docs';
    request.method = 'GET';
    return await fetchBack(request);
  },

  async getDocById(id: string, bUrl: string = '') {
    let request = api_back;
    request.baseURL = bUrl;
    request.url = `docs/${id}`;
    request.method = 'GET';
    return await fetchBack(request);
  },

  async postDoc(bUrl: string = '', doc: DocType) {
    let request = api_back;
    request.baseURL = bUrl;
    request.url = 'docs';
    request.method = 'POST';
    request.data = JSON.stringify(doc);
    request.headers!['Content-Type'] = 'application/json';
    return await fetchBack(request);
  },
};

export default apiBack;
