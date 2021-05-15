import { CreateMedicamentDTO, EditMedicamentDTO } from 'swagger/models';

import { getHeadersWithAuth } from 'utils/headers';

import { API_HOST } from '../../../constants';

export const getMedicaments = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Medicaments`, {
    headers: getHeadersWithAuth(),
  });
};

export const getPharmaceuticalForms = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/PharmaceuticalForms`, {
    headers: getHeadersWithAuth(),
  });
};

export const createMedicament = async (
  medicament: CreateMedicamentDTO
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Medicaments`, {
    method: 'POST',
    headers: getHeadersWithAuth(),
    body: JSON.stringify(medicament),
  });
};

export const getMedicament = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Medicaments/${id}`, {
    headers: getHeadersWithAuth(),
  });
};

export const updateMedicament = async (
  id: number | string,
  medicament: EditMedicamentDTO
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Medicaments/${id}`, {
    method: 'PUT',
    headers: getHeadersWithAuth(),
    body: JSON.stringify(medicament),
  });
};

export const removeMedicament = async (
  id: number | string
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Medicaments/${id}`, {
    method: 'DELETE',
    headers: getHeadersWithAuth(),
  });
};
