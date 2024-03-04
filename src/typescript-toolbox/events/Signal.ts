/**
 * An abstraction for calling pre-defined hook(s)
 */
class Signal {
    private hooks: { [id: string] : (() => void) };
    private accumulator: number;

    public constructor() {
        this.hooks = {};
        this.accumulator = 0;
    }

    /**
     * @returns ID of the created hook
     */
    public add_hook(callback: () => void): number {
        const current_id = this.accumulator++;
        this.hooks[current_id] = callback;
        return current_id;
    }

    /**
    * @returns If the hook was removed or not (false if the hook was not found)
    */
    public remove_hook(id: number): boolean {
        if (!(id in this.hooks)) {
            return false;
        }
        delete this.hooks[id];
        return true;
    }

    /**
     * Runs all the hooks
     */
    public call(): void {
        for (const hook of Object.values(this.hooks)) {
            hook();
        }
    }
}


export default Signal;
