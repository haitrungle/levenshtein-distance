export function levenshteinDistance(s1: string, s2: string) {
  const m = s1.length;
  const n = s2.length;

  let v0: number[] = [];
  for (let i = 0; i <= n; ++i) {
    v0.push(i);
  }

  let v1: number[] = Array.from({ length: n + 1 }, () => 0);

  for (let i = 0; i < m; ++i) {
    v1[0] = i + 1;
    for (let j = 0; j < n; ++j) {
      const deleteCost = v0[j + 1] + 1;
      const insertCost = v1[j] + 1;
      const substituteCost = s1[i] === s2[j] ? v0[j] : v0[j] + 1;
      v1[j + 1] = Math.min(deleteCost, insertCost, substituteCost);
    }
    v0 = v1;
    v1 = Array.from({ length: n + 1 }, () => 0);
  }

  return v0[n];
}
