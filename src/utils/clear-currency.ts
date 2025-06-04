export function clearCurrency(value: string) {
  return Number(value?.replace(/\D/g, ""));
}
