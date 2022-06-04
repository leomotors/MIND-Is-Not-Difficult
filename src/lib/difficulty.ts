import type { GenerateOption } from "polynomial-generator";

function fact(n: number) {
  if (n > 20) return Infinity;

  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export function calculateDifficulty(option: GenerateOption) {
  const { numeratorRange: nr, denominatorRange: dr, degree: deg } = option;

  const denomfactor =
    Math.min(10, Math.max(1, 2 * (dr - 1))) -
    1 +
    Math.pow(Math.max(1, dr - 5), Math.E / 2);

  const numfactor = Math.pow(nr, Math.E / 3);

  const degreefactor = fact(deg) / 2;

  return (numfactor * denomfactor * degreefactor) / 4.298653971453474;
}
