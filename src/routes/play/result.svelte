<script lang="ts">
  import { onMount } from "svelte";
  import type { GameResult } from "$types";
  import PolynomialList from "$sections/PolynomialList.svelte";

  let lastData = {} as GameResult;

  onMount(() => {
    lastData = JSON.parse(localStorage.getItem("result"));
  });
</script>

<main
  class="mx-auto w-1/2 rounded-xl bg-gradient-to-br from-sky-700 to-sky-900 py-10"
>
  <h1 class="text-center text-4xl font-bold">Summary</h1>
  <hr class="mx-auto my-4 w-[90%]" />

  <section>
    <div>
      <p>Mode</p>
      <p>{lastData.mode}</p>
    </div>
    <div>
      <p>{lastData.mode == "endless" ? "Initial" : ""} Difficulty</p>
      <p>{`${(+lastData.difficulty).toFixed(4)}`}</p>
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

    <p class="text-center text-2xl font-bold">Polynomial List</p>

    <PolynomialList
      polynomials={lastData.polynomials}
      userAnswers={lastData.user_answer}
    />
  </section>
</main>

<style lang="scss">
  section {
    @apply mx-auto flex w-5/6 flex-col items-center gap-2 text-xl font-medium;

    & > div {
      @apply flex w-full flex-row justify-between;
    }
  }
  main {
    @apply mx-auto my-10 w-5/6 max-w-lg rounded-lg px-4 text-left shadow-md md:w-2/3;
  }
</style>
