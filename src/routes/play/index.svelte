<script lang="ts">
  import type { Gamemode } from "$lib/models/gamemode";

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
        "Take a questions until you answered incorrect. The longer it get, the harder the questions are.",
      color: "lightsalmon",
    },
    timed: {
      title: "Time Limit Mode ⌛",
      description: "Take as many questions as possible in the limited time",
      color: "skyblue",
    },
  };
</script>

<main class="page-content">
  <h1 class="page-title p-4">Play</h1>
  <h2 class="page-subtitle m-4">Select Game Mode</h2>

  {#each Object.entries(gameModes) as [mode, info]}
    <div class="mode-card" style={`background-color: ${info.color}`}>
      <h1>{info.title}</h1>
      <h2>{info.description}</h2>
      <a href={`/play/${mode}`}> >> Play This Mode </a>
    </div>
  {/each}
</main>

<style lang="postcss">
  .mode-card {
    @apply mx-auto p-4 m-4 max-w-full md:w-2/5 rounded-2xl text-left;
  }

  .mode-card > h1 {
    @apply font-bold text-3xl text-center;
  }

  .mode-card > h2 {
    @apply font-medium text-2xl;
  }

  .mode-card > a {
    @apply block hover:translate-x-5 transition-transform text-3xl font-bold select-none;
  }
</style>
