<script lang="ts">
  import GameControl from "$components/GameControl.svelte";
  import { goto } from "$app/navigation";
  import { Timer } from "$lib/timer";

  import type { Polynomial, Root, GenerateOption } from "polynomial-generator";
  import { generate } from "polynomial-generator";
  import { checkRoot } from "polynomial-generator/scoring";
  import { onMount } from "svelte";

  const options: GenerateOption = {
    numeratorRange: 5,
    denominatorRange: 1,
    degree: 2,
  };

  export let problems: [Polynomial, Root[]] = generate(options);
  let index = 0;
  let userAnswer = "";

  const timer = new Timer(90);
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

<main class="w-full md:w-2/3 lg:w-1/2 mx-auto p-8">
  <GameControl
    topbar={["Difficulty 69", `${index} completed`, timeStr]}
    problem="Solve {problems[0].toString('html')} = 0"
    bind:answer={userAnswer}
    navbuttons={false}
    on:enter={next}
    on:submit={next}
  />
</main>
