<script lang="ts">
  import { Generator, MultiGenerator } from "polynomial-generator";

  const generator1 = new Generator({
    numeratorRange: 5,
    denominatorRange: 3,
    degree: 2,
  });

  const generator2 = new Generator({
    numeratorRange: 5,
    denominatorRange: 3,
    degree: 3,
  });

  const generator = new MultiGenerator([
    {
      generator: generator1,
      weight: 50,
    },
    {
      generator: generator2,
      weight: 50,
    },
  ]);

  let [polynomial, roots] = generator.generate();

  function regen() {
    [polynomial, roots] = generator.generate();
  }
</script>

<h1>I want to play a game</h1>
<h2>Solve {@html polynomial.toString("html")} = 0</h2>
<h4>Answers are</h4>
{#each roots as root}
  <p>{root.numerator} / {root.denominator}</p>
{/each}
<button on:click={regen} class="bg-red-200 select-none">Regen</button>
