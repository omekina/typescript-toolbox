export function assert_eq<T>(a: T, b: T): boolean {
    if (a !== b) {
        console.error("        Assertion failed: Expected \"" + String(a) + "\" got \"" + String(b) + "\"");
        return false;
    }
    return true;
}


async function run_test(test_name: string, handle: () => Promise<boolean>): Promise<boolean> {
    console.log("    " + test_name);
    const result = await handle();
    if (result) {
        console.log("        OK");
    }
    return result;
}


async function run_tests(space_name: string, tests: [string, () => Promise<boolean>][]): Promise<boolean> {
    console.log(space_name);
    let ok: boolean = true;
    for (const test of tests) {
        const result = await run_test(test[0], test[1]);
        if (!result) {
            ok = false;
        }
    }
    return ok;
}


import TestSync from "./tests/sync";


let results: boolean[] = [];


results.push(await run_tests("sync", [
    ["mutex", TestSync.mutex],
]));


let ok: boolean = true;
for (const result of results) {
    if (!result) {
        ok = false;
    }
}
if (!ok) {
    console.error("\nSome tests failed");
} else {
    console.info("\nAll tests passed");
}
