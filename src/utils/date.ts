export const formatDate = (
  dateString: string | null | undefined
): { date: string; time: string } => {
  const createdDate = new Date(dateString ?? '');

  if (createdDate.getFullYear() < 1000) {
    return { date: '', time: '' };
  }

  const date = createdDate.toLocaleDateString('lt-LT');
  const time = createdDate.toLocaleTimeString('lt-LT');

  return { date, time };
};
