<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import { generateMany } from "polynomial-generator";
  import type { Polynomial, Root } from "polynomial-generator";

  export const load: Load = async () => {
    const problems = generateMany(
      { numeratorRange: 5, denominatorRange: 1, degree: 2 },
      10
    );

    return {
      props: {
        problems,
      },
    };
  };
</script>

<script lang="ts">
  import GameControl from "$components/GameControl.svelte";
  import { goto } from "$app/navigation";

  export let problems: [Polynomial, Root[]][];
  let index = 0;

  let userAnswer = {} as Record<number, string>;
</script>

<main class="w-full md:w-2/3 lg:w-1/2 mx-auto p-8">
  <GameControl
    topbar={["Difficulty 69", `${index + 1}/${problems.length}`, "Score 420"]}
    problem="Solve {problems[index][0].toString('html')} = 0"
    bind:answer={userAnswer[index]}
    disabled={{ left: index == 0, right: index == problems.length - 1 }}
    on:left={() => (index = Math.max(0, index - 1))}
    on:right={() => (index = Math.min(problems.length - 1, index + 1))}
    on:submit={() => goto("/play/result")}
  />
</main>
