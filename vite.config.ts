import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
    if (command === "build") {
        const env = loadEnv(mode, process.cwd(), "");
        return {
            base: env.BASE_URL,
            plugins: [svelte()],
        };
    }
    return { plugins: [svelte()] };
});
