import { API_HOST, DEFAULT_HEADERS } from '../../../constants';
import { PharmacyDTO } from '../dtos/PharmacyDTO';

export const createPharmacy = async (
  pharmacy: PharmacyDTO
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
