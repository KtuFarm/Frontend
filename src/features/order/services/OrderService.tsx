import { API_HOST, DEFAULT_HEADERS } from '../../../constants';

export const createOrder = async (order: unknown): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(order),
  });
};
