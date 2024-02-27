export enum OptionEnum {
    Some,
    None,
}


type Option<T> = {
    value?: T,
    option: OptionEnum,
}


export default Option;
