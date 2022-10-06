<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { calculateDifficulty } from "$lib/difficulty";
  import type { GenerateOption } from "polynomial-generator";
  const dispatch = createEventDispatcher<{ play: GenerateOption }>();

  let numrange = 10;
  let denomrange = 1;
  let degree = 2;

  let difficulty = 0;
  $: difficulty = calculateDifficulty({
    numeratorRange: numrange,
    denominatorRange: denomrange,
    degree,
  });
</script>

<main class="game-setup">
  <h1>Game Setup</h1>
  <h2>Polynomial Setup</h2>

  <div class="igroup">
    <label for="numrange">Numerator Range</label>
    <input type="number" name="numrange" bind:value={numrange} min="0" />
  </div>

  <div class="igroup">
    <label for="denomrange">Denominator Range</label>
    <input type="number" name="denomrange" bind:value={denomrange} min="1" />
  </div>

  <div class="igroup">
    <label for="degree">Degree</label>
    <input type="number" name="degree" bind:value={degree} min="1" />
  </div>
  <slot />

  <p class="my-3">
    <a class="underline" href="/difficulty"> Difficulty</a>: {difficulty.toFixed(
      4
    )}
  </p>

  <button
    class="mx-auto my-4 rounded bg-gradient-to-br from-pink-100 to-pink-300 py-2 px-4 text-3xl font-bold text-black"
    on:click={() =>
      dispatch("play", {
        numeratorRange: numrange,
        denominatorRange: denomrange,
        degree,
      })}
  >
    Play!
  </button>
</main>

<style lang="scss">
  .game-setup {
    @apply flex min-h-[calc(100vh-16rem-1px)] flex-col rounded-lg bg-white p-8 text-center text-xl shadow gdark:bg-slate-700;
  }
  button {
    @apply rounded-xl py-2 px-6 text-3xl font-bold shadow transition-all hover:scale-105;
  }
</style>
