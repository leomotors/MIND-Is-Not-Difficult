import type { GenerateOption, Polynomial, Root } from "polynomial-generator";

export type PolynomialPack = [Polynomial, Root[]];

export interface Gamemode {
  title: string;
  description: string;
  color: string;
}

export interface ResultBase<T> {
  mode: T;
  options: GenerateOption;
  difficulty: number;
  polynomials: PolynomialPack[];
  user_answer: string[];
}

export interface AssessmentResult extends ResultBase<"assessment"> {
  count: number;
  time_used: number;
  correct: number;
}

export interface EndlessResult extends ResultBase<"endless"> {
  correct: number;
  score: number;
  finalOption: GenerateOption;
  finalDifficulty: number;
}

export interface TimedResult extends ResultBase<"timed"> {
  correct: number;
  score: number;
  missed: number;
}

export type GameResult = AssessmentResult | EndlessResult | TimedResult;
