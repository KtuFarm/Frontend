import { PharmacyDTO } from '../dtos/PharmacyDTO';

export const createPharmacy = async (
  pharmacy: PharmacyDTO
): Promise<boolean> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_HOST}/api/v1/Pharmacies`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Request': 'true',
      },
      body: JSON.stringify(pharmacy),
    }
  );

  if (response.status !== 201) {
    throw new Error('Failed to create pharmacy');
  }

  return true;
};
