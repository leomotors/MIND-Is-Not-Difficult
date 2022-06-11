<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import { fromurl } from "$lib/fromurl";

  export const load: Load = async ({ url }) => {
    const { options } = fromurl(url);

    return {
      props: {
        initialOptions: options,
      },
    };
  };
</script>

<script lang="ts">
  import katex from "katex";
  import GameControl from "$components/GameControl.svelte";
  import { goto } from "$app/navigation";

  import { calculateDifficulty } from "$lib/difficulty";
  import { generate, type GenerateOption } from "polynomial-generator";
  import { checkRoot } from "polynomial-generator/scoring";
  import type { EndlessResult, PolynomialPack } from "$types";

  export let initialOptions: GenerateOption;
  let option = initialOptions;
  let difficulty = 0;
  $: difficulty = calculateDifficulty(option);

  export let problem: PolynomialPack = generate(option);

  let index = 0;
  let userAnswer = "";
  let score = 0;

  let problems: PolynomialPack[] = [];
  let userAnswers: string[] = [];

  function next() {
    problems.push(problem);
    userAnswers.push(userAnswer);

    if (!checkRoot(problem[1], userAnswer)) {
      const result: EndlessResult = {
        mode: "endless",
        options: initialOptions,
        difficulty: calculateDifficulty(initialOptions),
        polynomials: problems,
        user_answer: userAnswers,
        correct: problems.length - 1,
        score,
        finalOption: option,
        finalDifficulty: difficulty,
      };
      localStorage.setItem("result", JSON.stringify(result));

      goto("/play/result");
      return;
    }

    score += difficulty;

    option = {
      numeratorRange: option.numeratorRange + Math.round(Math.random()),
      denominatorRange:
        option.denominatorRange + Math.round(Math.random() * 0.66),
      degree: option.degree,
    };

    problem = generate(option);
    index++;
    userAnswer = "";
  }
</script>

<main class="container">
  <GameControl
    topbar={[
      `Difficulty ${difficulty.toFixed(4)}`,
      `${index} completed`,
      `Score ${score.toFixed(2)}`,
    ]}
    problem="Solve {katex.renderToString(
      `${problem[0].toString('latex')} = 0`
    )}"
    bind:answer={userAnswer}
    navbuttons={false}
    on:enter={next}
    on:submit={next}
  />
</main>
