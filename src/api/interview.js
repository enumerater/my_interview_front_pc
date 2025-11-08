import request from "@/utils/requests";

export const queryInterview = (params) => {
    return request({
        url: "/admin/interview/query",
        method: "get",
        params,
    });
}

export const showInterview = (id) => {
    return request({
        url: "/admin/interview/show",
        method: "get",
        params: {
            id
        }
    });
}

export const addInterview = (data) => {
    return request({
        url: "/admin/interview/create",
        method: "post",
        data,
    });
}

export const updateInterview = (data) => {
    return request({
        url: "/admin/interview/update",
        method: "put",
        data,
    });
}