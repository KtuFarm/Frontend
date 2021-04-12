import { CreatePharmacyDTO, EditPharmacyDTO } from 'swagger/models';

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

export const updatePharmacy = async (
  id: number | string,
  pharmacy: EditPharmacyDTO
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies/${id}`, {
    method: 'PUT',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(pharmacy),
  });
};

export const removePharmacy = async (
  id: number | string
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies/${id}`, {
    method: 'DELETE',
    headers: DEFAULT_HEADERS,
  });
};

export const getPharmacyProducts = async (
  id: number | string
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies/${id}/products`, {
    headers: DEFAULT_HEADERS,
  });
};

export const getPharmacyTransactions = async (
  id: number | string
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies/${id}/transactions`, {
    headers: DEFAULT_HEADERS,
  });
};
