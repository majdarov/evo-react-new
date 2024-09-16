export type ApiEvoType = {
  baseURL: 'https://api.evotor.ru/',
  url: '',
  headers: {
    Accept: 'application/vnd.evotor.v2+json',
    'Content-Type': 'application/vnd.evotor.v2+json',
    'X-Authorization': ''
  }
  method?: string
  body?: any
  params?: unknown
  cursor?: unknown
}

const api_v2: ApiEvoType = {
  baseURL: 'https://api.evotor.ru/',
  url: '',
  headers: {
    Accept: 'application/vnd.evotor.v2+json',
    'Content-Type': 'application/vnd.evotor.v2+json',
    'X-Authorization': ''
  }
}

export default api_v2;
