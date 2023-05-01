export function sumValues(values: number[]) {
  return values.reduce((partialSum, a) => partialSum + a, 0);
}

export function calculateTotalPercentage(value: number, totalValue: number) {
  return `${(value / totalValue) * 100}%`;
}
