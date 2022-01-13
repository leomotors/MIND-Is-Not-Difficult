<script>
  import "../app.css";
</script>

<div class="navbar h-10 px-6 bg-sky-200 flex flex-row align-bottom">
  <a href="/" class="cursor-pointer text-2xl font-bold"> MIND Math </a>
  <h4 class="text-gray-400">Math Is Not Difficult</h4>
  <a href="/about">About</a>
</div>

<slot />

<style lang="postcss">
  .navbar > * {
    @apply my-auto;
  }
</style>
