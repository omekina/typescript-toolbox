import Option from "./Option";
import { OptionEnum } from "./Option";
import Result from "./Result";


export function result_to_option<T, E>(value: Result<T, E>): Option<T> {
    if (value.err !== undefined) {
        return { option: OptionEnum.None };
    }
    return { value: value.ok, option: OptionEnum.Some };
}


export function option_to_result<T, E>(value: Option<T>, error: E): Result<T, E> {
    if (value.option === OptionEnum.Some && value.value !== undefined) {
        return { ok: value.value };
    }
    return { err: error };
}


export function null_to_option<T>(value: T | null): Option<T> {
    if (value === null) {
        return { option: OptionEnum.None };
    }
    return { value: value, option: OptionEnum.Some };
}


export function null_to_result<T, E>(value: T | null, error: E): Result<T, E> {
    if (value === null) {
        return { err: error };
    }
    return { ok: value };
}
