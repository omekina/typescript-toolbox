import Result from "./Result";
import Option from "./Option";
import { OptionEnum } from "./Option";


export default function<T, E>(value: Result<T, E> | Option<T>): T {
    if ("ok" in value && value.ok !== undefined) {
        return value.ok;
    }
    if ("option" in value) {
        if (value.option === OptionEnum.Some && value.value !== undefined) {
            return value.value;
        }
        UnwrapHandler.unwrap_error_handle();
        throw new Error("Error on Option unwrap - value is None");
    }
    if ("err" in value && value.err !== undefined) {
        UnwrapHandler.unwrap_error_handle();
        console.log("Logging error to console:");
        console.log(value.err);
        throw new Error("Error on Result unwrap - err is present");
    }
    throw new Error("Error on unwrap - invalid state");
}


/**
 * Warning: This will override any existing error handle
 */
export function set_unwrap_error_handle(handle: () => void): void {
    UnwrapHandler.unwrap_error_handle = handle;
}


namespace UnwrapHandler {
    export let unwrap_error_handle: () => void = () => {};
}
