// @ts-check

import vercel from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";
import path from "node:path";

/** @type {{ [key: string]: string }} */
const generatedAliases = {};

["components", "sections", "types"].map(
  (ele) => (generatedAliases[`\$${ele}`] = path.resolve(`src/${ele}`))
);

/** @type {import("@sveltejs/kit").Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: vercel(),
    vite: {
      resolve: {
        alias: generatedAliases,
      },
    },
  },
};
