import { API_HOST, DEFAULT_HEADERS } from '../../../constants';

export const getPaymentTypes = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/PaymentTypes`, {
    headers: DEFAULT_HEADERS,
  });
};
