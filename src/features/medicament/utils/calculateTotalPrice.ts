export const calculateTotalPrice = (
  basePrice: number,
  surcharge: number
): number => basePrice * ((100 + surcharge) / 100);
