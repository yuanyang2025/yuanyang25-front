import { OkResp, Resp } from "../data/interface/network";

export const isOk = <T>(resp: Resp<T>): resp is OkResp<T> => {
    return 200 <= resp.status && resp.status < 300;
};

export const request = async <T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    data?: object | null,
    auth?: string,
): Promise<Resp<T>> => {
    const headers: Record<string, string> = {};
    let body;
    if (method !== "GET" && data) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(data);
    }
    if (typeof auth !== "undefined") {
        headers["Authorization"] = `Bearer ${auth}`;
    }

    const response = await fetch(url, { method, headers, body });
    let res, cres;

    try {
        res = response;
        cres = response.clone();
        res = await res.json();
    } catch (e) {
        try {
            res = await cres?.text();
        } catch (e) {
            console.error(url, e);
            res = null;
        }
    }
    return {
        status: response.status,
        data: res,
    };
};