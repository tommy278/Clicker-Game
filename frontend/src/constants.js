// One-indexed prices array
export const prices = Array.from({ length: 101 }, (_, i) => {
  if (i === 0) return null; // placeholder for 0-index
  return 50 * Math.pow(2, i - 1); // exponential growth
});

export const earns = Array.from({ length: 100 }, (_, i) => i + 1);

export const powerUps = Array.from({ length: 100 }, (_, i) => ({
    name: `Add ${i + 1}`,
    effect: i + 1
}));

// Generate rebirth prices: start small, grow exponentially
export const rebirthPrice = Array.from({ length: 100 }, (_, i) => {
    if (i < 5) return [1000, 10000, 100000, 1000000, 5000000][i]; // early milestones
    return Math.floor(5_000_000 * Math.pow(1.15, i - 4)); // later exponential growth
});

// Generate rebirth multipliers: start small, increase gradually
export const rebirthStats = Array.from({ length: 100 }, (_, i) => {
    if (i < 10) return 1 + i * 0.01; // early small increments
    return parseFloat((1.1 * Math.pow(1.02, i - 9)).toFixed(2)); // later scaling faster
});