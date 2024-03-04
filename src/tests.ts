/**
 * A is expected
 */
export function assert_eq<T>(a: T, b: T): boolean {
    if (a !== b) {
        console.error("        \x1b[38;5;1mAssertion failed: Expected \"" + String(a) + "\" got \"" + String(b) + "\"\x1b[0m");
        return false;
    }
    return true;
}


/**
 * Checks if b > a
 */
export function assert_higher<T>(a: T, b: T): boolean {
    if (!(b > a)) {
        console.error("        \x1b[38;5;1mAssertion failed: Expected higher than \"" + String(a) + "\" got \"" + String(b) + "\"\x1b[0m");
        return false;
    }
    return true;
}


export function error_message(message: string): void {
    console.error("        \x1b[38;5;1m" + message + "\x1b[0m");
}


async function run_test(test_name: string, handle: (() => Promise<boolean>) | (() => boolean)): Promise<boolean> {
    console.log("    " + test_name);
    const result = await handle();
    if (result) {
        console.log("        \x1b[38;5;46mOK\x1b[0m");
    } else {
        console.error("        \x1b[38;5;196mERROR\x1b[0m");
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


results.push(await run_tests("error_handlers", [
    ["null_to_option_null", TestErrorHandlers.null_option_null],
    ["null_to_option_value", TestErrorHandlers.null_option_value],
    ["null_to_result_null", TestErrorHandlers.null_result_null],
    ["null_to_result_value", TestErrorHandlers.null_result_value],
    ["option_to_result_some", TestErrorHandlers.option_result_some],
    ["option_to_result_none", TestErrorHandlers.option_result_none],
    ["result_to_option_ok", TestErrorHandlers.result_option_ok],
    ["result_to_option_err", TestErrorHandlers.result_option_err],
    ["option_unwrap_none", TestErrorHandlers.option_unwrap_none],
    ["option_unwrap_some", TestErrorHandlers.option_unwrap_some],
]));
results.push(await run_tests("sync", [
    ["mutex", TestSync.mutex],
    ["sleep", TestSync.sleep_timeout],
]));


let ok: boolean = true;
for (const result of results) {
    if (!result) {
        ok = false;
    }
}
if (!ok) {
    console.error("\n\x1b[38;5;196mSome tests failed\x1b[0m");
} else {
    console.info("\n\x1b[38;5;46mAll tests passed\x1b[0m");
}
