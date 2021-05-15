import { getHeadersWithAuth } from 'utils/headers';

import { API_HOST } from '../../../constants';

export const getPaymentTypes = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/PaymentTypes`, {
    headers: getHeadersWithAuth(),
  });
};
