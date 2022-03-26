<script lang="ts">
  import { goto } from "$app/navigation";

  import type { Polynomial, Root } from "polynomial-generator";

  export let problems: [Polynomial, Root[]][];

  const problemCount = problems.length;

  let index = 0;

  let userAnswer: string[] = Array(problemCount).fill("");

  let submitButton: HTMLButtonElement;

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key != "Enter") return;

    if (index < problemCount - 1) {
      index++;
    } else {
      submitButton.click();
    }
  }
</script>

<main class="bg-white rounded-lg shadow p-8 text-xl flex flex-col">
  <header class="flex flex-row justify-between">
    <p>Difficulty 69</p>
    <p>{index + 1}/{problemCount}</p>
    <p>Score 420</p>
  </header>

  <hr class="my-5" />

  <article class="flex flex-col items-center justify-evenly grow gap-4">
    <p class="text-4xl xl:text-5xl">
      Solve {@html problems[index][0].toString("html")} = 0
    </p>
    <input
      type="text"
      class="w-2/3 bg-slate-200 rounded h-12 px-4"
      bind:value={userAnswer[index]}
      on:keypress={handleKeyPress}
    />
  </article>

  <hr class="my-5" />

  <footer class="flex flex-row justify-between">
    <button
      class="ctrl"
      on:click={() => {
        index = Math.max(0, index - 1);
      }}
      disabled={index == 0}
    >
      &lt;
    </button>
    <button
      bind:this={submitButton}
      class="bg-green-50 rounded shadow px-4 py-2 font-bold text-3xl"
      on:click={() => {
        goto("/play/result");
      }}
    >
      Finish Quiz
    </button>
    <button
      class="ctrl"
      on:click={() => {
        index = Math.min(problemCount - 1, index + 1);
      }}
      disabled={index == problemCount - 1}
    >
      &gt;
    </button>
  </footer>
</main>

<style lang="postcss">
  main {
    min-height: calc(100vh - 7rem);
  }

  button.ctrl {
    @apply bg-pink-50 rounded shadow px-4 text-4xl font-bold;
  }

  button {
    @apply disabled:bg-slate-200;
  }
</style>
