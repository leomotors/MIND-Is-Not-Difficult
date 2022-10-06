<script lang="ts">
  import katex from "katex";
  import { Polynomial, type Root } from "polynomial-generator";
  import { checkRoot } from "polynomial-generator/scoring";

  import { rootsToString } from "$lib/poly";

  export let roots: Root[];
  export let userAnswer: string;

  const correct = checkRoot(roots, userAnswer ?? "");
  let showAnswer = false;
  function toggleAnswer() {
    showAnswer = !showAnswer;
  }
</script>

<div class={correct ? "bg-green-300" : "bg-pink-200"}>
  <p>
    {@html katex.renderToString(Polynomial.fromRoots(roots).toString("latex"))}
  </p>
  <p>Your Answer: {userAnswer}</p>
  {#if !correct}
    <p
      class={`cursor-pointer ${!showAnswer && "underline"}`}
      on:click={toggleAnswer}
    >
      {showAnswer ? rootsToString(roots) : "Show Answer"}
    </p>
  {/if}
</div>

<style lang="scss">
  div {
    @apply my-4 rounded-xl p-4 text-black;
  }
</style>
