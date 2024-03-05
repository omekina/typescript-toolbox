/**
 * Sleep for the given time
 * @param timeout in milliseconds
 */
export default async function sleep(timeout: number): Promise<void> {
    const promise = new Promise<void>(resolve => setTimeout(resolve, timeout));
    await promise;
}
