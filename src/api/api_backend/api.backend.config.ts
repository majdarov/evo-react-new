import { AxiosRequestConfig } from "axios";

console.log('MODE: ' + import.meta.env.MODE)

const api_back: AxiosRequestConfig = {
  // baseURL: localStorage.getItem('backURL') || '',
  // baseURL: 'http://itk.galinka-malinka.ru/',
}

console.log('BaseURL: ' + api_back.baseURL)

export default api_back;
