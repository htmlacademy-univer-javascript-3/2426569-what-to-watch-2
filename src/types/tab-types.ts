export const TabTypes = {
  Overview: 'Overview',
  Details: 'Details',
  Reviews: 'Reviews'
} as const;

export type TabType = typeof TabTypes[keyof typeof TabTypes];

