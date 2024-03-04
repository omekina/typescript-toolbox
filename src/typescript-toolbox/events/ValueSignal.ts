import { Signal } from "..";


/**
 * An abstraction for a signal with value.
 * The signal gets called everytime the value changes implicitly.
*/
class ValueSignal<T> {
    private signal: Signal;
    private value: T;

    public constructor(input_value: T) {
        this.value = input_value;
        this.signal = new Signal();
    }

    /**
     * @returns ID of the created hook
     */
    public add_hook(callback: () => void): number {
        return this.signal.add_hook(callback);
    }

    /**
    * @returns If the hook was removed or not (false if the hook was not found)
    */
    public remove_hook(id: number): boolean {
        return this.signal.remove_hook(id);
    }

    /**
     * Runs all the hooks
     */
    public call(): void {
        this.signal.call();
    }

    public get val(): T {
        return this.value;
    }

    public set val(input_value: T) {
        this.value = input_value;
        this.signal.call();
    }
}


export default ValueSignal;
