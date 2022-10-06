<script>
  import katex from "katex";
</script>

<h1 class="page-title p-12">Score & Difficulty Formula</h1>
<main class="px-2">
  <div class="flex flex-col items-start gap-2">
    {@html katex.renderToString("f_{num} = n^{\\frac{e}{3}}")}
    {@html katex.renderToString(
      "f_{denom} = min(10, max(2*d-1)) - 1 + (max(1, d-5))^{\\frac{e}{2}}"
    )}
    {@html katex.renderToString("f_{deg} = \\frac{deg!}{2}")}
    {@html katex.renderToString("D = f_{num} \\cdot f_{denom} \\cdot f_{deg}")}
  </div>
</main>

<style lang="scss">
  main {
    @apply mx-auto w-5/6 max-w-lg rounded-lg p-4 text-left shadow-md md:w-2/3;

    & h1 {
      @apply text-lg font-bold md:text-2xl;
    }
  }
</style>
