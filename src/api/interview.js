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