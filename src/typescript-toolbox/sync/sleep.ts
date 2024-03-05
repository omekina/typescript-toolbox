/**
 * Sleep for the given time
 * @param timeout in milliseconds
 */
export default async function sleep(timeout: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, timeout));
}
