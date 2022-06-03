<script lang="ts">
  import GameControl from "$components/GameControl.svelte";
  import { goto } from "$app/navigation";

  import type { Polynomial, Root, GenerateOption } from "polynomial-generator";
  import { generate } from "polynomial-generator";
  import { checkRoot } from "polynomial-generator/scoring";

  const options: GenerateOption = {
    numeratorRange: 5,
    denominatorRange: 1,
    degree: 2,
  };

  export let problems: [Polynomial, Root[]] = generate(options);
  let index = 0;
  let userAnswer = "";

  function next() {
    if (!checkRoot(problems[1], userAnswer)) {
      goto("/play/result");
      return;
    }

    problems = generate(options);
    index++;
    userAnswer = "";
  }
</script>

<main class="w-full md:w-2/3 lg:w-1/2 mx-auto p-8">
  <GameControl
    topbar={["Difficulty 69", `${index} completed`, "Score 420"]}
    problem="Solve {problems[0].toString('html')} = 0"
    bind:answer={userAnswer}
    navbuttons={false}
    on:enter={next}
    on:submit={next}
  />
</main>
