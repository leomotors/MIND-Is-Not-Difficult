<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import { fromurl } from "$lib/fromurl";

  import { generateMany } from "polynomial-generator";

  export const load: Load = async ({ url }) => {
    const { options, difficulty } = fromurl(url);

    const problems = generateMany(options, 10);

    return {
      props: {
        problems,
        difficulty,
      },
    };
  };
</script>

<script lang="ts">
  import GameControl from "$components/GameControl.svelte";
  import { goto } from "$app/navigation";
  import katex from "katex";
  import type { PolynomialPack } from "$types";

  export let problems: PolynomialPack[];
  export let difficulty: number;
  let index = 0;

  let userAnswer = {} as Record<number, string>;
</script>

<main class="container">
  <GameControl
    topbar={[
      `Difficulty ${difficulty.toFixed(4)}`,
      `${index + 1}/${problems.length}`,
      "Score 420",
    ]}
    problem="Solve {katex.renderToString(
      `${problems[index][0].toString('latex')} = 0`
    )}"
    bind:answer={userAnswer[index]}
    disabled={{ left: index == 0, right: index == problems.length - 1 }}
    on:left={() => (index = Math.max(0, index - 1))}
    on:right={() => (index = Math.min(problems.length - 1, index + 1))}
    on:enter={() => {
      if (index == problems.length - 1) goto("/play/result");
      else index++;
    }}
    on:submit={() => goto("/play/result")}
  />
</main>
