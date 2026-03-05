/** Shared stat counter config used by About and Results sections. */
export const STATS_META = [
  { target: 500, suffix: "+", duration: 2.0 },
  { target: 95,  suffix: "%", duration: 1.8 },
  { target: 10,  suffix: "+", duration: 1.5 },
] as const;
