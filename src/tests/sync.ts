import { assert_eq } from "../tests";
import { Mutex } from "../typescript-toolbox";


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
}


export default TestSync;
