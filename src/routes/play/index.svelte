<script lang="ts">
  import type { Gamemode } from "$types";

  const gameModes: { [mode: string]: Gamemode } = {
    assessment: {
      title: "Assessment Mode ✏️",
      description:
        "Take a fixed number of questions, and see how you do. Just like an assessment test.",
      color: "pink",
    },
    endless: {
      title: "Endless Mode 💪",
      description:
        "Take questions until you answered one incorrect. The longer it get, the harder the questions are.",
      color: "lightsalmon",
    },
    timed: {
      title: "Time Limit Mode ⌛",
      description: "Complete as many questions as possible in the limited time",
      color: "skyblue",
    },
  };
</script>

<main class="page-content">
  <h1 class="page-title py-4">Play</h1>
  <h2 class="page-subtitle">Select Game Mode</h2>

  {#each Object.entries(gameModes) as [mode, info]}
    <div class="mode-card" style="background-color: {info.color}">
      <h1>{info.title}</h1>
      <h2>{info.description}</h2>
      <a sveltekit:prefetch href="/play/{mode}/setup"> Play </a>
    </div>
  {/each}
</main>

<style lang="postcss">
  .mode-card {
    @apply mx-auto my-6 flex w-5/6 max-w-lg flex-col gap-2 rounded-lg p-4 text-center shadow-md;
  }

  .mode-card > h1 {
    @apply text-center text-2xl font-bold text-black;
  }

  .mode-card > h2 {
    @apply mx-1 text-lg font-medium text-gray-800;
  }

  .mode-card > a {
    /* @apply rounded-xl py-2 px-6 text-3xl font-bold shadow ; */
    @apply mx-auto select-none rounded border border-black py-1 px-4 text-xl font-bold text-black transition-all hover:scale-105;
  }
</style>
