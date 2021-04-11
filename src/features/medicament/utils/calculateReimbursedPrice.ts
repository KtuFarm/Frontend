export const calculateReimbursedPrice = (
  basePrice: number,
  reimbursePercentage: number
): number => basePrice * ((100 - reimbursePercentage) / 100);
