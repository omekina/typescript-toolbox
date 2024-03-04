/**
 * Sleep for the given time
 * @param timeout in milliseconds
 */
export default async function sleep(timeout: number): Promise<void> {
    let resolve: () => void;
    const promise = new Promise<void>((r) => { resolve = r; });
    setTimeout(() => { resolve(); }, timeout);
    await promise;
}
