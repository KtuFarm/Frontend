import { API_HOST, DEFAULT_HEADERS } from '../../../constants';
import { PharmacyDTO } from '../dtos/PharmacyDTO';

export const createPharmacy = async (
  pharmacy: PharmacyDTO
): Promise<boolean> => {
  const response = await fetch(`${API_HOST}/api/v1/Pharmacies`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(pharmacy),
  });

  if (response.status !== 201) {
    throw new Error('Failed to create pharmacy');
  }

  return true;
};
