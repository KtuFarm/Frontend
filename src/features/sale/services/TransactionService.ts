import { CreateTransactionDTO } from 'swagger/models';

import { getHeadersWithAuth } from 'utils/headers';

import { API_HOST } from '../../../constants';

export const createTransaction = async (
  transaction: CreateTransactionDTO
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Transactions`, {
    method: 'POST',
    headers: getHeadersWithAuth(),
    body: JSON.stringify(transaction),
  });
};
