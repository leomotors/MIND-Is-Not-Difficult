<script lang="ts">
  import "../app.css";
  import "katex/dist/katex.min.css";

  import { NavBar } from "@leomotors/sv-components";

  const routes = {
    "/": "Home",
    about: "About",
  };

  let dark: boolean;
</script>

<div class:dark>
  <main class="transition-all dark:bg-slate-900 dark:text-white">
    <NavBar {routes} useLightDark={true} bind:dark>
      <div slot="left" class="flex flex-row items-center gap-2">
        <a href="/" class="text-2xl font-bold">MIND</a>
        <p class="text-xl text-slate-400">MIND Is Not Difficult</p>
      </div>
    </NavBar>

    <hr class="mx-auto w-[90%]" />

    <!-- Website Content -->
    <div class="min-h-[calc(100vh-8rem-1px)]">
      <slot />
    </div>
  </main>
</div>
