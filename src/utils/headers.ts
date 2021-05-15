import { DEFAULT_HEADERS } from '../constants';

import { storage } from './storage';

export const getHeadersWithAuth = (): HeadersInit => {
  const token = storage.get('token');
  const authHeader = { Authorization: `Bearer ${token}` };

  return {
    ...DEFAULT_HEADERS,
    ...(token && authHeader),
  };
};
