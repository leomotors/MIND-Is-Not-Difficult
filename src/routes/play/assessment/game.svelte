<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import { fromurl } from "$lib/fromurl";

  import { generateMany, type GenerateOption } from "polynomial-generator";

  export const load: Load = async ({ url }) => {
    const { options, difficulty } = fromurl(url);

    const problems = generateMany(options, 10);

    return {
      props: {
        options,
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
  import type { PolynomialPack, AssessmentResult } from "$types";

  import { checkRoot } from "polynomial-generator/scoring";

  export let options: GenerateOption;
  export let problems: PolynomialPack[];
  export let difficulty: number;
  let index = 0;

  let userAnswer = {} as Record<number, string>;
  let startTime = new Date().getTime();

  function toArray() {
    const ans: string[] = [];
    for (let i = 0; i < problems.length; i++) {
      ans.push(userAnswer[i]);
    }
    return ans;
  }

  function onSubmit() {
    let correct = 0;
    const ansArr = toArray();
    for (let i = 0; i < problems.length; i++) {
      correct += checkRoot(problems[i][1], ansArr[i] ?? "") ? 1 : 0;
    }

    const result: AssessmentResult = {
      mode: "assessment",
      options,
      difficulty,
      polynomials: problems,
      user_answer: toArray(),
      count: problems.length,
      time_used: new Date().getTime() - startTime,
      correct,
    };
    localStorage.setItem("result", JSON.stringify(result));

    goto("/play/result");
  }
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
      if (index == problems.length - 1) onSubmit();
      else index++;
    }}
    on:submit={onSubmit}
  />
</main>
