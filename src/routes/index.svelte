<script lang="ts">
  import { goto } from "$app/navigation";

  import Introduction from "$lib/sections/Introduction.svelte";
</script>

<main>
  <Introduction />

  <button
    class="bg-purple-400 rounded-xl p-4 shadow-sm font-bold text-6xl hover:scale-105 transition-transform"
    on:click={() => {
      goto("/play");
    }}
  >
    Play
  </button>
</main>

<style lang="postcss">
</style>
