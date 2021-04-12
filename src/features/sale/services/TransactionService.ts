import { CreateTransactionDTO } from 'swagger/models';

import { API_HOST, DEFAULT_HEADERS } from '../../../constants';

export const createTransaction = async (
  transaction: CreateTransactionDTO
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Transactions`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(transaction),
  });
};
