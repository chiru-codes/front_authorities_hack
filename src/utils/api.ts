import { ResultAsync } from "neverthrow";

export function wrap<T>(promise: Promise<T>): ResultAsync<T, Error> {
    return ResultAsync.fromPromise(promise, (err) =>
        err instanceof Error ? err : new Error("Error inesperado"),
    );
}