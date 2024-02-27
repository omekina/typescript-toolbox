class Mutex<T> {
    public value: T;
    private locked: boolean;
    private queue: (() => void)[];

    public constructor(init_value: T) {
        this.locked = false;
        this.queue = [];
        this.value = init_value;
    }

    public async lock(): Promise<void> {
        let resolve: () => void;
        let promise: Promise<void> = new Promise<void>(r => resolve = r);
        this.queue.push(resolve!);

        if (!this.locked) {
            this.dequeue();
        }

        return promise;
    }

    public unlock(): void {
        this.locked = false;
        this.dequeue();
    }

    private dequeue(): void {
        if (this.queue.length > 0 && !this.locked) {
            this.locked = true;
            const resolve = this.queue.shift();
            if (!resolve) { return; }
            resolve();
        }
    }
}


export default Mutex;
