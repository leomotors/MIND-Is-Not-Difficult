<script lang="ts">
  import { goto } from "$app/navigation";

  import Introduction from "$sections/Introduction.svelte";
</script>

<main>
  <Introduction />

  <button
    class="bg-gradient-to-br from-purple-300 to-purple-500 text-black rounded-xl p-4 shadow-sm font-bold text-6xl hover:scale-105 transition-transform"
    on:click={() => {
      goto("/play");
    }}
  >
    Play
  </button>
</main>

<style lang="postcss">
</style>
