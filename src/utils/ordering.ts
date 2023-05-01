export enum Ordering {
  RecentlyAdded = '-created_at',
  Oldest = 'created_at',
  Alphabetically = 'name',
  AlphabeticallyInversely = '-name',
}

export const OrderingLabel: Record<Ordering, string> = {
  [Ordering.RecentlyAdded]: 'Newest first',
  [Ordering.Oldest]: 'Oldest first',
  [Ordering.Alphabetically]: 'A-Z',
  [Ordering.AlphabeticallyInversely]: 'Z-A',
};
