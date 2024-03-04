import { assert_eq, assert_higher } from "../tests";
import { Option, Result, null_to_option, null_to_result, option_to_result, result_to_option } from "../typescript-toolbox";


namespace TestErrorHandlers {
    export function null_option(): boolean {
        const option: Option<string> = null_to_option<string>(null);
        return assert_eq(1, option.option);
    }

    export function null_result(): boolean {
        const result: Result<string, string> = null_to_result<string>(null, "null_to_result_test");
        return assert_eq("null_to_result_test", result.err);
    }
}


export default TestErrorHandlers;
