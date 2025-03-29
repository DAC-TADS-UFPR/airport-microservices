export default function formatToMoney(value: number, parse: boolean = false): number {
  let formattedValue = (value / 100).toFixed(2);
  return parse ? parseFloat(formattedValue.replace(/[^\d.-]/g, "")) : parseFloat(formattedValue);
}
