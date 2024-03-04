import { assert_eq, assert_higher } from "../tests";
import { Mutex, sleep } from "../typescript-toolbox";


namespace TestSync {
    export async function mutex(): Promise<boolean> {
        let m: Mutex<number> = new Mutex(0);
        await m.lock();
        setTimeout(() => {
            m.value = 1;
            m.unlock();
        }, 50);
        await m.lock();
        m.unlock();
        return assert_eq(m.value, 1);
    }

    export async function sleep_timeout(): Promise<boolean> {
        const start = new Date();
        await sleep(100);
        const diff = (new Date().getTime()) - start.getTime();
        return assert_higher(diff, 99);
    }
}


export default TestSync;
