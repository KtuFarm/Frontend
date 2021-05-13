export const formatDate = (
  dateString: string | null | undefined
): { date: string; time: string } => {
  const createdDate = new Date(dateString ?? '');
  const date = createdDate.toLocaleDateString('lt-LT');
  const time = createdDate.toLocaleTimeString('lt-LT');

  return { date, time };
};
