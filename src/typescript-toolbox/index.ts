// Typescript Toolbox
// @author Ondřej Mekina


// ---------- ERROR HANDLERS ----------


import { sleep } from "bun";


// Option
export { default as Option } from "./error_handlers/Option";
export { OptionEnum } from "./error_handlers/Option";

// Result
export { default as Result } from "./error_handlers/Result";

// Unwrap
export { default as unwrap } from "./error_handlers/unwrap";

// Convertors
export { result_to_option, option_to_result, null_to_result, null_to_option } from "./error_handlers/convertor";


// ---------- OBJECT HELPERS ----------


// Clone
export { default as Clone } from "./traits_generic/Clone";


// ---------- SYNC ----------


// Mutex
export { default as Mutex } from "./sync/Mutex";

// Sleep
export { default as sleep } from "./sync/sleep";


// ---------- EVENTS ----------

// Signal
export { default as Signal } from "./events/Signal";

// Value signal
export { default as ValueSignal } from "./events/ValueSignal";
