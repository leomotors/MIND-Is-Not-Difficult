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
  import GameControl from "$components/GameControl.svelte";
  import { goto } from "$app/navigation";
  import { Timer } from "$lib/timer";

  import type { GenerateOption } from "polynomial-generator";
  import { generate } from "polynomial-generator";
  import { checkRoot } from "polynomial-generator/scoring";
  import { onMount } from "svelte";
  import type { PolynomialPack } from "$types";

  export let options: GenerateOption;

  export let problems: PolynomialPack = generate(options);
  let index = 0;
  let userAnswer = "";
  export let difficulty: number;
  export let time: number;

  const timer = new Timer(time);
  let timeStr = timer.toString();

  function next() {
    if (!checkRoot(problems[1], userAnswer)) {
      timer.penalty += 5000;
      const tmp = timer.toString();

      if (!tmp) {
        goto("/play/result");
        return;
      } else timeStr = tmp;

      index--;
    }

    problems = generate(options);
    index++;
    userAnswer = "";
  }

  onMount(() => {
    const interval = setInterval(() => {
      const tmp = timer.toString();
      if (!tmp) goto("/play/result");
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
    problem="Solve {problems[0].toString('html')} = 0"
    bind:answer={userAnswer}
    navbuttons={false}
    on:enter={next}
    on:submit={next}
  />
</main>
