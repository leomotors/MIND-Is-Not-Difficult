<script lang="ts">
  import { goto } from "$app/navigation";

  import Introduction from "$sections/Introduction.svelte";
</script>

<main>
  <Introduction />

  <button
    class="rounded-xl bg-gradient-to-br from-purple-300 to-purple-500 p-4 text-6xl font-bold text-black shadow-sm transition-transform hover:scale-105"
    on:click={() => {
      goto("/play");
    }}
  >
    Play
  </button>
</main>
