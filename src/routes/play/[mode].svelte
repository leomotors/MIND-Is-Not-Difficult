<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ params }) => {
    return {
      props: {
        mode: params.mode,
      },
    };
  };
</script>

<script lang="ts">
  export let mode: string;
</script>

this is {mode}
