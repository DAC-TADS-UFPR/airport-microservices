export default function highlightText(text: string, query: string) {
  const parts = text.split(new RegExp(`(${query})`, "gi")); // Divide o texto com base na query
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <strong key={index}>{part}</strong> : part
  );
}
