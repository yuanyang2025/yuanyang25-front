// TODO: 只用于测试环境

import { request } from "./network";

export const login = async () => {
    let data = {
        userid: 16,
        auth: {
            method: 'Password',
            // username: 'lethe2',
            data: '9a55a0bb1ed3386227c141bff504da5596f66c1f75704ad9ee5341144ef57cfb',
            // token: 'be00103aa0cb30f3ecf630ce4ef8596d7b7c855fdc33e361debfab95578b4f09bc00103aa0cb30f3ecf630ce4ef8596d7b7c847a39a2e2d86123ab51c11d530f',
        }
    };
    return request<any>(`/api/login`, "POST", data);
};