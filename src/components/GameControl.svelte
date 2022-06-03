<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher<{
    enter: null;
    left: null;
    right: null;
    submit: null;
  }>();

  export let topbar: Exclude<string[], 3>;
  export let problem: string;
  export let answer: string;

  export let navbuttons = true;
  export let disabled: { left: boolean; right: boolean } = {
    left: false,
    right: false,
  };
  export let submitText = "Submit Answer";

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key == "Enter") dispatch("enter");
  }
</script>

<main
  class="bg-white rounded-lg shadow p-8 text-xl flex flex-col min-h-[calc(100vh-8rem)]"
>
  <header class="flex flex-row justify-between">
    <p>{topbar[0]}</p>
    <p>{topbar[1]}</p>
    <p>{topbar[2]}</p>
  </header>

  <hr class="my-5" />

  <article class="flex flex-col items-center justify-evenly grow gap-4">
    <p class="text-4xl xl:text-5xl">
      {@html problem}
    </p>
    <input
      type="text"
      class="w-2/3 bg-slate-200 rounded h-12 px-4"
      bind:value={answer}
      on:keypress={handleKeyPress}
    />
  </article>

  <hr class="my-5" />

  <footer
    class="flex flex-row {navbuttons ? 'justify-between' : 'justify-center'}"
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
      class="bg-green-50 rounded shadow px-4 py-2 font-bold text-3xl"
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

<style lang="postcss">
  button.ctrl {
    @apply bg-pink-50 rounded shadow px-4 text-4xl font-bold;
  }

  button {
    @apply disabled:bg-slate-200;
  }
</style>
