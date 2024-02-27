/// <reference lib="dom" />

import { Mutex } from "./typescript-toolbox";


async function resolve<T>(mutex: Mutex<T>) {
    console.log("Hello from resolve");
    mutex.unlock();
}


async function wait_for_mutex(mutex: Mutex<string>) {
    await mutex.lock();
    console.log("Got lock on Mutex");
    console.log("Mutex says: " + mutex.value);
    mutex.unlock();
}


let m: Mutex<string> = new Mutex("Hello, world!");
await m.lock();
console.log("Starting...");
wait_for_mutex(m);
setTimeout(() => { resolve(m); }, 1000);
