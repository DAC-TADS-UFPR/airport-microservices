export function formatDate(date: string | undefined | null): string | null {
  if (!date) return null;

  const newDate = new Date(date);

  if (isNaN(newDate.getTime())) {
    return null;
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC"
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(newDate);

  // Adiciona manualmente o ponto após o mês
  const [month, day, year] = formattedDate.split(" ");
  return `${month}. ${day} ${year}`;
}
