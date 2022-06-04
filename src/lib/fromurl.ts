import type { GenerateOption } from "polynomial-generator";
import { calculateDifficulty } from "$lib/difficulty";

export function fromurl(url: URL): {
  options: GenerateOption;
  difficulty: number;
} {
  const nr = +url.searchParams.get("nr");
  const dr = +url.searchParams.get("dr");
  const deg = +url.searchParams.get("deg");

  return {
    options: {
      numeratorRange: nr,
      denominatorRange: dr,
      degree: deg,
    },
    difficulty: calculateDifficulty(nr, dr, deg),
  };
}
