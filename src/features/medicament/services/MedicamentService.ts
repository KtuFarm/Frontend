import { API_HOST, DEFAULT_HEADERS } from '../../../constants';

export const getMedicaments = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Medicaments`, {
    headers: DEFAULT_HEADERS,
  });
};

export const getPharmaceuticalForms = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/PharmaceuticalForms`, {
    headers: DEFAULT_HEADERS,
  });
};
