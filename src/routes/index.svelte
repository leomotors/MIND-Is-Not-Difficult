<script lang="ts">
  import { goto } from "$app/navigation";

  import Introduction from "$sections/Introduction.svelte";
</script>

<main>
  <div class="h-8" />
  <Introduction />
  <div class="h-8" />

  <button
    class="bg-gradient-to-br from-purple-300 to-purple-500 text-black"
    on:click={() => {
      goto("/play");
    }}
  >
    Play
  </button>
</main>

<style lang="scss">
  button {
    @apply rounded-xl py-2 px-6 text-3xl font-bold shadow transition-all hover:scale-105;
  }
</style>
