import { $ } from "bun";


console.log("Preparing sources...");
const result = await Bun.build({
    entrypoints: ["src/tests.ts"],
    outdir: "dist",
});
if (!result.success) {
    console.error("Building failed: " + result.logs);
}


console.log("Running tests...\n");
await $`bun run dist/tests.js`;
