import esbuild from "esbuild"
import svelte from "esbuild-svelte"

esbuild.build({
    entryPoints: ["src/main.mjs"],
    bundle: true,
    outfile: "build/faster.js",
    plugins: [svelte({
        compilerOptions: {
            css: "injected"
        },
    })],
    logLevel: "info",
})
