export const calculateReimbursedPrice = (
  basePrice: number,
  reimbursePercentage: number
): number => basePrice * (1 - reimbursePercentage / 100);
