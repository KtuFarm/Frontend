import { CreatePharmacyDTO, EditPharmacyDTO } from 'swagger/models';

import { getHeadersWithAuth } from 'utils/headers';

import { API_HOST } from '../../../constants';

export const createPharmacy = async (
  pharmacy: CreatePharmacyDTO
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies`, {
    method: 'POST',
    headers: getHeadersWithAuth(),
    body: JSON.stringify(pharmacy),
  });
};

export const getPharmacies = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies`, {
    headers: getHeadersWithAuth(),
  });
};

export const getPharmacy = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies/${id}`, {
    headers: getHeadersWithAuth(),
  });
};

export const updatePharmacy = async (
  id: number | string,
  pharmacy: EditPharmacyDTO
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies/${id}`, {
    method: 'PUT',
    headers: getHeadersWithAuth(),
    body: JSON.stringify(pharmacy),
  });
};

export const removePharmacy = async (
  id: number | string
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies/${id}`, {
    method: 'DELETE',
    headers: getHeadersWithAuth(),
  });
};

export const getPharmacyProducts = async (
  id: number | string
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies/${id}/products`, {
    headers: getHeadersWithAuth(),
  });
};

export const getPharmacyTransactions = async (
  id: number | string
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Pharmacies/${id}/transactions`, {
    headers: getHeadersWithAuth(),
  });
};
