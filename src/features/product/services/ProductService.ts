import { API_HOST, DEFAULT_HEADERS } from '../../../constants';

export const getProducts = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Products`, {
    headers: DEFAULT_HEADERS,
  });
};
