import { LoginDTO } from 'swagger/models';

import { API_HOST, DEFAULT_HEADERS } from '../../../constants';

export const login = async (login: LoginDTO): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Users/login`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(login),
  });
};

export const me = async (token: string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Users/me`, {
    method: 'GET',
    headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${token}` },
    body: JSON.stringify(login),
  });
};
