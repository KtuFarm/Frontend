export const formatMoney = (money: number | undefined): string =>
  (money ?? 0).toLocaleString('lt-LT', {
    style: 'currency',
    currency: 'EUR',
  });
