import { createRequest, fetchEvo } from './api_evotor';

const apiEvotor = {

    async getStores() {
      let request = await createRequest({ type: 'store_v2' });
      let stores = await fetchEvo(request);
      return stores.items;
    },

    async getSchemes() {
      let request = await createRequest({ type: 'get_schemes' });
      let schemes = await fetchEvo(request);
      return schemes;
    },

    async postSchemes(body: any) {
      let request = await createRequest({ type: 'post_schemes', body });
      let schemes = await fetchEvo(request);
      return schemes;
    },

    async fetchGroupsEvo() {
      let request = await createRequest({ type: 'groups_v2' });
      return await fetchEvo(request);
    },

    async fetchProductsEvo() {
      let request = await createRequest({ type: 'products_v2' });
      return await fetchEvo(request);
    },

    async postData(path: string, body: any) {
      let request = await createRequest({ type: `post_${path}_v2`, body });
      return await fetchEvo(request);
    },
    async putData(path: string, body: any) {
      let request = await createRequest({ type: `put_${path}_v2`, body });
      return await fetchEvo(request);
    },
    async deleteData(path: string, id: string) {
      let request = await createRequest({ type: `delete_${path}_v2`, id });
      return await fetchEvo(request);
    },

    /**
     *
     * @param {*} docType
     * @param {*} period
     * @param {*} value
     * @returns
     */
    async getDocuments(docType: string, period: any = null, value: any = null) {
      let request = await createRequest({ type: 'documents_v2', docType, period, value });
      return await fetchEvo(request);
    },
    async getOfdDocuments() {
      // let request = await createRequest({ type: 'get_ofd_documents' });
      // return await fetchEvo(request);
      return {items: [{id: 'Временно не работает!'}]};
    },
    async getEmployees(employee_id: string | null = null) {
      let request = await createRequest({ type: 'get_employees', employee_id });
      return await fetchEvo(request);
    },
  };

export default apiEvotor;
