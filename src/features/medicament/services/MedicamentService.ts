import { API_HOST, DEFAULT_HEADERS } from '../../../constants';

export const getMedicaments = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Medicaments`, {
    headers: DEFAULT_HEADERS,
  });
};
