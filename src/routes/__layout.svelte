<script lang="ts">
  import "../app.css";

  import { NavBar } from "@leomotors/sv-components";

  const routes = {
    "/": "Home",
    about: "About",
  };

  let dark: boolean;
</script>

<div class:dark>
  <main class="dark:bg-slate-900 dark:text-white transition-all">
    <NavBar {routes} useLightDark={true} bind:dark>
      <div slot="left" class="flex flex-row gap-2 items-center">
        <p class="text-2xl font-bold">MIND</p>
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
