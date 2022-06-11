<script lang="ts">
  import type { PolynomialPack } from "$types";
  import PolyCard from "$components/PolyCard.svelte";

  export let polynomials: PolynomialPack[] = [];
  export let userAnswers: string[] = [];
</script>

<main class="w-full">
  {#each polynomials as [_, roots], index}
    <PolyCard {roots} userAnswer={userAnswers[index]} />
  {/each}
</main>
