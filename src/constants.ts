const token = sessionStorage.getItem('token');
const authHeader = { Authorization: `Bearer ${token}` };

export const DEFAULT_HEADERS_WITHOUT_AUTH = {
  'Content-Type': 'application/json',
  'X-Api-Request': 'true',
};

export const DEFAULT_HEADERS = {
  ...DEFAULT_HEADERS_WITHOUT_AUTH,
  ...(token && authHeader),
};

export const API_HOST = process.env.REACT_APP_API_HOST;
