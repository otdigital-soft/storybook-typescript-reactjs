export function notEmpty<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const picked = {} as Pick<T, K>;
  keys.forEach((key) => {
    picked[key] = obj[key];
  });
  return picked;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function groupByKey<T extends Record<string, any>, G extends keyof T>(
  data: T[],
  groupBy: G,
) {
  return data.reduce((grouped, row) => {
    const keyValue = row[groupBy];
    grouped[keyValue] = grouped[keyValue] ?? [];
    grouped[keyValue].push(row);
    return grouped;
  }, {} as Record<T[G], T[]>);
}
