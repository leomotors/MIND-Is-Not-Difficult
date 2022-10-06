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
  <h1 class="page-title p-4">Play</h1>
  <h2 class="page-subtitle m-4">Select Game Mode</h2>

  {#each Object.entries(gameModes) as [mode, info]}
    <div class="mode-card" style="background-color: {info.color}">
      <h1>{info.title}</h1>
      <h2>{info.description}</h2>
      <a sveltekit:prefetch href="/play/{mode}/setup"> >> Play This Mode </a>
    </div>
  {/each}
</main>

<style lang="postcss">
  .mode-card {
    @apply m-4 mx-auto w-5/6 max-w-full rounded-2xl p-4 text-left text-black md:w-2/5;
  }

  .mode-card > h1 {
    @apply text-center text-3xl font-bold;
  }

  .mode-card > h2 {
    @apply text-2xl font-medium;
  }

  .mode-card > a {
    @apply block select-none text-3xl font-bold transition-transform hover:translate-x-5;
  }
</style>
