<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import { fromurl } from "$lib/fromurl";

  export const load: Load = async ({ url }) => {
    const { options, difficulty } = fromurl(url);

    return {
      props: {
        options,
        difficulty,
        time: +url.searchParams.get("time"),
      },
    };
  };
</script>

<script lang="ts">
  import katex from "katex";
  import GameControl from "$components/GameControl.svelte";
  import { goto } from "$app/navigation";
  import { Timer } from "$lib/timer";

  import type { GenerateOption } from "polynomial-generator";
  import { generate } from "polynomial-generator";
  import { checkRoot } from "polynomial-generator/scoring";
  import { onMount } from "svelte";
  import type { PolynomialPack, TimedResult } from "$types";

  export let options: GenerateOption;

  export let problem: PolynomialPack = generate(options);
  let index = 0;
  let userAnswer = "";
  export let difficulty: number;
  export let time: number;

  const timer = new Timer(time);
  let timeStr = timer.toString();

  let problems: PolynomialPack[] = [];
  let userAnswers: string[] = [];

  function next() {
    problems.push(problem);
    userAnswers.push(userAnswer);

    if (!checkRoot(problem[1], userAnswer)) {
      timer.penalty += 5000;
      const tmp = timer.toString();

      if (!tmp) {
        endGame();
        return;
      } else timeStr = tmp;

      index--;
    }

    problem = generate(options);
    index++;
    userAnswer = "";
  }

  function endGame() {
    const result: TimedResult = {
      mode: "timed",
      options,
      difficulty,
      polynomials: problems,
      user_answer: userAnswers,
      correct: problems.length - 1,
      score: difficulty * (problems.length - 1),
      missed: timer.penalty / 5000,
    };
    localStorage.setItem("result", JSON.stringify(result));

    goto("/play/result");
  }

  onMount(() => {
    const interval = setInterval(() => {
      const tmp = timer.toString();
      if (!tmp) endGame();
      else timeStr = tmp;
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<main class="container">
  <GameControl
    topbar={[
      `Difficulty ${difficulty.toFixed(4)}`,
      `${index} completed`,
      timeStr,
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
