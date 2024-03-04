/**
 * B is expected
 */
export function assert_eq<T>(a: T, b: T): boolean {
    if (a !== b) {
        console.error("        Assertion failed: Expected \"" + String(b) + "\" got \"" + String(a) + "\"");
        return false;
    }
    return true;
}


/**
 * Checks if a > b
 */
export function assert_higher<T>(a: T, b: T): boolean {
    if (a <= b) {
        console.error("        \x1b[38;5;1mAssertion failed: Expected higher than \"" + String(a) + "\" got \"" + String(b) + "\"\x1b[0m");
        return false;
    }
    return true;
}


async function run_test(test_name: string, handle: (() => Promise<boolean>) | (() => boolean)): Promise<boolean> {
    console.log("    " + test_name);
    const result = await handle();
    if (result) {
        console.log("        \x1b[38;5;46mOK\x1b[0m");
    }
    return result;
}


async function run_tests(space_name: string, tests: [string, (() => Promise<boolean>) | (() => boolean)][]): Promise<boolean> {
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
import TestErrorHandlers from "./tests/error_handlers";


let results: boolean[] = [];


results.push(await run_tests("sync", [
    ["mutex", TestSync.mutex],
    ["sleep", TestSync.sleep_timeout],
]));
results.push(await run_tests("error_handlers", [
    ["null_to_option", TestErrorHandlers.null_option],
    ["null_to_result", TestErrorHandlers.null_result],
]));


let ok: boolean = true;
for (const result of results) {
    if (!result) {
        ok = false;
    }
}
if (!ok) {
    console.error("\n\x1b[38;5;1mSome tests failed\x1b[0m");
} else {
    console.info("\n\x1b[38;5;46mAll tests passed\x1b[0m");
}
