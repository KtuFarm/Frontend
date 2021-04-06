import { PharmacyDTO } from './PharmacyDTO';

export const createPharmacy = async (pharmacy: PharmacyDTO): Promise<void> => {
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

  console.log(response);
};
