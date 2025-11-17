import { ResultAsync } from "neverthrow";

//const API_URL = import.meta.env.VITE_API_URL as string;
const API_URL = "https://qzkbh4dev6.execute-api.us-east-1.amazonaws.com";
const getToken = () => localStorage.getItem("token") ?? "";

export function wrap<T>(promise: Promise<T>): ResultAsync<T, Error> {
    return ResultAsync.fromPromise(promise, (err) =>
        err instanceof Error ? err : new Error("Error inesperado")
    );
}

export const apiClient = {
    get: <T>(path: string) =>
        wrap(
            fetch(`${API_URL}${path}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
            }).then(async (res) => {
                if (!res.ok) throw new Error(await res.text());
                return res.json() as Promise<T>;
            })
        ),

    post: <T>(path: string, body: any) =>
        wrap(
            fetch(`${API_URL}${path}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(body),
            }).then(async (res) => {
                if (!res.ok) throw new Error(await res.text());
                return res.json() as Promise<T>;
            })
        ),

    patch: <T>(path: string, body: any) =>
        wrap(
            fetch(`${API_URL}${path}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(body),
            }).then(async (res) => {
                if (!res.ok) throw new Error(await res.text());
                return res.json() as Promise<T>;
            })
        ),
};
