import type { Root } from "polynomial-generator";

export function rootToString(root: Root) {
  if (root.denominator == 1) return `${root.numerator}`;
  return `${root.numerator}/${root.denominator}`;
}

export function rootsToString(roots: Root[]) {
  return roots.map(rootToString).join(" ");
}
