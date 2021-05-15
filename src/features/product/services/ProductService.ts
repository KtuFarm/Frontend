import { getHeadersWithAuth } from 'utils/headers';

import { API_HOST } from '../../../constants';

export const getProducts = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Products`, {
    headers: getHeadersWithAuth(),
  });
};
