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
  import GameControl from "$components/GameControl.svelte";
  import { goto } from "$app/navigation";

  import { calculateDifficulty } from "$lib/difficulty";
  import { generate, type GenerateOption } from "polynomial-generator";
  import { checkRoot } from "polynomial-generator/scoring";
  import type { PolynomialPack } from "$types";

  export let initialOptions: GenerateOption;
  let option = initialOptions;
  let difficulty = 0;
  $: difficulty = calculateDifficulty(option);

  export let problems: PolynomialPack = generate(option);

  let index = 0;
  let userAnswer = "";
  let score = 0;

  function next() {
    if (!checkRoot(problems[1], userAnswer)) {
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

    problems = generate(option);
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
    problem="Solve {problems[0].toString('html')} = 0"
    bind:answer={userAnswer}
    navbuttons={false}
    on:enter={next}
    on:submit={next}
  />
</main>
