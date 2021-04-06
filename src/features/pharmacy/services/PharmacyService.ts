import { CreatePharmacyDTO } from 'swagger/models';

import { API_HOST, DEFAULT_HEADERS } from '../../../constants';

export const createPharmacy = async (
  pharmacy: CreatePharmacyDTO
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(pharmacy),
  });
};

export const getPharmacies = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies`, {
    headers: DEFAULT_HEADERS,
  });
};

export const getPharmacy = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies/${id}`, {
    headers: DEFAULT_HEADERS,
  });
};
