import { API_HOST, DEFAULT_HEADERS } from '../../../constants';

export const getWarehouses = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Warehouses`, {
    headers: DEFAULT_HEADERS,
  });
};

export const getWarehouseProducts = async (
  id: number | string
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Warehouses/${id}/products`, {
    headers: DEFAULT_HEADERS,
  });
};
