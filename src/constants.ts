const token = sessionStorage.getItem('token');
const authHeader = { Authorization: `Bearer ${token}` };

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'X-Api-Request': 'true',
  ...(token && authHeader),
};

export const API_HOST = process.env.REACT_APP_API_HOST;
