import { getHeadersWithAuth } from 'utils/headers';

import { API_HOST } from '../../../constants';

export const getWarehouses = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Warehouses`, {
    headers: getHeadersWithAuth(),
  });
};

export const getWarehouseProducts = async (
  id: number | string
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Warehouses/${id}/products`, {
    headers: getHeadersWithAuth(),
  });
};
