<script lang="ts">
  import { onMount } from "svelte";
  import type { GameResult } from "$types";
  import PolynomialList from "$sections/PolynomialList.svelte";

  let lastData = {} as GameResult;

  onMount(() => {
    lastData = JSON.parse(localStorage.getItem("result"));
  });
</script>

<main class="py-10">
  <div
    class="mx-auto w-1/2 rounded-xl bg-gradient-to-br from-sky-700 to-sky-900 py-10"
  >
    <h1 class="text-4xl font-bold">Summary</h1>
    <hr class="mx-auto my-4 w-[90%]" />

    <section>
      <div>
        <p>Mode</p>
        <p>{lastData.mode}</p>
      </div>
      <div>
        <p>{lastData.mode == "endless" ? "Initial" : ""} Difficulty</p>
        <p>{lastData.difficulty}</p>
      </div>
      {#if lastData.mode == "assessment"}
        <div>
          <p>Score</p>
          <p>{lastData.correct}/{lastData.count}</p>
        </div>
      {:else}
        <div>
          <p>Score</p>
          <p>{lastData.score}</p>
        </div>
      {/if}

      <p class="text-center text-3xl font-bold">Polynomial List</p>

      <PolynomialList
        polynomials={lastData.polynomials}
        userAnswers={lastData.user_answer}
      />
    </section>
  </div>
</main>

<style lang="scss">
  section {
    @apply mx-auto flex w-3/4 flex-col items-center gap-2 text-xl font-medium;

    & > div {
      @apply flex w-full flex-row justify-between;
    }
  }
</style>
