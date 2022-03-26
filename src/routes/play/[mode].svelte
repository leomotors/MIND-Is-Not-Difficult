<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import { Generator } from "polynomial-generator";
  import type { Polynomial, Root } from "polynomial-generator";

  export const load: Load = async ({ params }) => {
    const generator = new Generator({
      numeratorRange: 10,
      denominatorRange: 1,
      degree: 2,
    });

    const problems: [Polynomial, Root[]][] = [];

    for (let i = 0; i < 3; i++) {
      problems.push(generator.generate());
    }

    return {
      props: {
        mode: params.mode,
        problems,
      },
    };
  };
</script>

<script lang="ts">
  import GameControl from "$lib/components/GameControl.svelte";

  export let mode: string;

  export let problems: [Polynomial, Root[]][];
</script>

<main class="w-full md:w-2/3 lg:w-1/2 mx-auto p-8">
  <GameControl {problems} />
</main>
