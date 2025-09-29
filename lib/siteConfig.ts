export const SITE_CONFIG = {
  TOTAL_CASES: 5000,
  SUCCESS_RATE: 0.43,
} as const;

export function formatCases(count: number): string {
  return count.toLocaleString() + '+';
}

export function formatSuccessRate(rate: number): string {
  return Math.round(rate * 100) + '%';
}