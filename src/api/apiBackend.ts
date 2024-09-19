import api_back from "./api_backend/api.backend.config";
import fetchBack from "./api_backend/fetchBackAxios";

const apiBack = {

    async getDocs() {
      let request = api_back;
      request.url = 'docs';
      request.method = 'GET';
      return await fetchBack(request);
    },

    async getDocById(id: string) {
      let request = api_back
      request.url = `docs/${id}`;
      request.method = 'GET';
      return await fetchBack(request);
    }
}

export default apiBack;
