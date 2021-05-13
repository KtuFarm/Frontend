import { API_HOST, DEFAULT_HEADERS } from '../../../constants';

export const getOrders = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders`, {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};
