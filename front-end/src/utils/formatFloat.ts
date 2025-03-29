export default function formatFloat(number: any, fixed: number = 2) {
  if (Array.isArray(number)) return number;
  if (!number) return number;
  if (isNaN(parseFloat(number))) return number;
  if (!Number.isInteger(number)) {
    if (parseFloat(number) % 1 !== 0) {
      return parseFloat(number).toFixed(fixed);
    }
  }
  return number;
}
