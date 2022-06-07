<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher<{
    enter: null;
    left: null;
    right: null;
    submit: null;
  }>();

  export let topbar: [string, string, string];
  export let problem: string;
  export let answer: string;

  export let navbuttons = true;
  export let disabled = { left: false, right: false };
  export let submitText = "Submit Answer";

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key == "Enter") dispatch("enter");
  }
</script>

<main
  class="flex min-h-[calc(100vh-16rem-1px)] flex-col rounded-lg bg-white p-8 text-xl shadow dark:bg-slate-700"
>
  <header class="flex flex-row justify-between">
    <p>{topbar[0]}</p>
    <p>{topbar[1]}</p>
    <p>{topbar[2]}</p>
  </header>

  <hr class="my-5" />

  <article class="flex grow flex-col items-center justify-evenly gap-4">
    <p class="text-4xl xl:text-5xl">
      {@html problem}
    </p>
    <input
      type="text"
      class="h-12 w-2/3 rounded bg-slate-200 px-4 dark:bg-slate-500"
      bind:value={answer}
      on:keypress={handleKeyPress}
    />
  </article>

  <hr class="my-5" />

  <footer
    class="flex flex-row {navbuttons
      ? 'justify-between'
      : 'justify-center'} select-none"
  >
    {#if navbuttons}
      <button
        class="ctrl"
        on:click={() => dispatch("left")}
        disabled={disabled.left}
      >
        &lt;
      </button>
    {/if}

    <button
      class="rounded bg-green-50 px-4 py-2 text-3xl font-bold shadow dark:bg-green-600"
      on:click={() => dispatch("submit")}
    >
      {submitText}
    </button>

    {#if navbuttons}
      <button
        class="ctrl"
        on:click={() => dispatch("right")}
        disabled={disabled.right}
      >
        &gt;
      </button>
    {/if}
  </footer>
</main>

<style lang="scss">
  button {
    &.ctrl {
      @apply rounded bg-pink-50 px-4 text-4xl font-bold shadow gdark:bg-pink-600;
    }

    @apply disabled:bg-slate-200 disabled:gdark:bg-slate-500;
  }
</style>
