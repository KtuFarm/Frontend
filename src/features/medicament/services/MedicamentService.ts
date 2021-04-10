import { CreateMedicamentDTO, EditMedicamentDTO } from 'swagger/models';

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

export const createMedicament = async (
  medicament: CreateMedicamentDTO
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Medicaments`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(medicament),
  });
};

export const getMedicament = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Medicaments/${id}`, {
    headers: DEFAULT_HEADERS,
  });
};

export const updateMedicament = async (
  id: number | string,
  medicament: EditMedicamentDTO
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Medicaments/${id}`, {
    method: 'PUT',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(medicament),
  });
};

export const removeMedicament = async (
  id: number | string
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Medicaments/${id}`, {
    method: 'DELETE',
    headers: DEFAULT_HEADERS,
  });
};
