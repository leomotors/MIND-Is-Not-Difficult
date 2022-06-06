<script lang="ts">
  import { goto } from "$app/navigation";
  import Setup from "$components/Setup.svelte";
  import type { GenerateOption } from "polynomial-generator";

  function onPlay(e: CustomEvent<GenerateOption>) {
    const { numeratorRange, denominatorRange, degree } = e.detail;

    goto(
      `/play/timed/game?nr=${numeratorRange}&dr=${denominatorRange}&deg=${degree}&time=${time}`
    );
  }

  let time = 30;
</script>

<main class="container">
  <Setup on:play={onPlay}>
    <h2>Timed Mode Setup</h2>

    <div class="igroup">
      <label for="time">Time</label>
      <input name="time" type="number" min="10" bind:value={time} />
    </div>
  </Setup>
</main>
