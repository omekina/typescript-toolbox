import { assert_eq, error_message } from "../tests";
import { Option, OptionEnum, Result, null_to_option, null_to_result, option_to_result, result_to_option, unwrap } from "../typescript-toolbox";


namespace TestErrorHandlers {
    export function null_option_null(): boolean {
        const option: Option<string> = null_to_option<string>(null);
        return assert_eq(1, option.option);
    }

    export function null_option_value(): boolean {
        const option: Option<string> = null_to_option<string>("null_to_option_test_string");
        return assert_eq("null_to_option_test_string", option.value);
    }

    export function null_result_null(): boolean {
        const result: Result<string, string> = null_to_result<string, string>(null, "null_to_result_test_null");
        return assert_eq("null_to_result_test_null", result.err);
    }

    export function null_result_value(): boolean {
        const result: Result<string, string> = null_to_result<string, string>("null_to_result_test_string", "null_to_result_test_null");
        return assert_eq("null_to_result_test_string", result.ok);
    }

    export function option_result_none(): boolean {
        const result: Result<string, string> = option_to_result<string, string>({ option: OptionEnum.None, value: "option_to_result_test_ok" }, "option_to_result_test_err");
        return assert_eq("option_to_result_test_err", result.err);
    }

    export function option_result_some(): boolean {
        const result: Result<string, string> = option_to_result<string, string>({ option: OptionEnum.Some, value: "option_to_result_test_ok" }, "option_to_result_test_err");
        return assert_eq("option_to_result_test_ok", result.ok);
    }

    export function result_option_ok(): boolean {
        const option: Option<string> = result_to_option({ ok: "result_to_option_test_ok" });
        return assert_eq("result_to_option_test_ok", option.value);
    }

    export function result_option_err(): boolean {
        const option: Option<string> = result_to_option({ err: "result_to_option_test_err" });
        return assert_eq(1, option.option);
    }

    export function option_unwrap_some(): boolean {
        try {
            const result = unwrap({ option: OptionEnum.Some, value: "option_unwrap_test_some" });
            return assert_eq("option_unwrap_test_some", result);
        }
        catch (e) {
            error_message("Unwrap panicked");
            return false;
        }
    }

    export function option_unwrap_none(): boolean {
        try {
            unwrap({ option: OptionEnum.None });
            error_message("Unwrap not triggered");
            return false;
        }
        catch (e) {
            return true;
        }
    }

    export function result_unwrap_err(): boolean {
        try {
            unwrap({ err: "result_unwrap_test_error" });
            error_message("Unwrap not triggered");
            return false;
        }
        catch (e) {
            return true;
        }
    }

    export function result_unwrap_ok(): boolean {
        try {
            const result = unwrap({ ok: "result_unwrap_test_ok" });
            return assert_eq("result_unwrap_test_ok", result);
        }
        catch (e) {
            error_message("Unwrap panicked");
            return false;
        }
    }
}


export default TestErrorHandlers;
