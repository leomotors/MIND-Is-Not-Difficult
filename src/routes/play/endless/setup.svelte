<script lang="ts">
  import { goto } from "$app/navigation";
  import Setup from "$components/Setup.svelte";
  import type { GenerateOption } from "polynomial-generator";

  function onPlay(e: CustomEvent<GenerateOption>) {
    const { numeratorRange, denominatorRange, degree } = e.detail;

    goto(
      `/play/endless/game?nr=${numeratorRange}&dr=${denominatorRange}&deg=${degree}`
    );
  }
</script>

<main class="container">
  <Setup on:play={onPlay} />
</main>
