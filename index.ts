import { exit } from "process";


// ---------- FILE INDEX ----------


/**
 * With the base directory ./src/ from this script
 */
const SCRIPTS: string[] = [
    "index.ts",
    "tests.ts",
];


/**
 * With the base directory ./src/ from this script
 */
const STYLES: string[] = [
];


/**
 * With the base directory ./src/ from this script
 */
const HTML: string[] = [
];


/**
 * Must end with slash
 */
const OUTDIR: string = "./dist/";


/**
 * Must end with slash
 */
const SRCDIR: string = "./src/";


// ---------- BUILD HOOK HELPER ----------


async function run_build_hook(name: string, build_hook: () => Promise<boolean>): Promise<void> {
    console.log("-> \x1b[34mRunning build hook:\x1b[0m " + name);
    try {
        const result = await build_hook();
        if (!result) { throw new Error(); }
    } catch (e) {
        console.log(e);
        console.log("=> \x1b[31mBuild hook failed:\x1b[0m " + name);
        exit(1);
    }
}


// ---------- BUILD HOOK - SCRIPTS ----------


async function build_scripts(): Promise<boolean> {
    let entrypoints: string[] = [];
    for (const file of SCRIPTS) {
        entrypoints.push(SRCDIR + file);
    }
    const result = await Bun.build({
        entrypoints: entrypoints,
        outdir: OUTDIR,
        minify: true,
    });
    if (!result.success) {
        console.log(result.logs);
        return false;
    }
    return true;
}


// ---------- BUILD HOOK - STYLES ----------


const sass = require("sass");

async function build_styles(): Promise<boolean> {
    for (const file of STYLES) {
        const file_output = file.replace(/\.scss$/, ".css");
        const result = sass.compile(SRCDIR + file, { style: "compressed" });
        await Bun.write(OUTDIR + file_output, result.css);
    }
    return true;
}



// ---------- BUILD HOOK - HTML ----------


const minify = require("html-minifier").minify;

async function build_html(): Promise<boolean> {
    for (const file of HTML) {
        const file_contents = await Bun.file(SRCDIR + file).text();
        const minified = minify(file_contents, {
            removeComments: true,
            removeCommentsFromCDATA: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
        });
        await Bun.write(OUTDIR + file, minified);
    }
    return true;
}


// ---------- RUN BUILD HOOKS ----------


await run_build_hook("scripts", build_scripts);
await run_build_hook("styles", build_styles);
await run_build_hook("html", build_html);
