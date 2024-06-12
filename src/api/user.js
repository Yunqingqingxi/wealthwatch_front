import request from "@/util/request.js";

export const login = (data) =>{
    return request({
        method:"POST",
        url:"user/login",
        data,
    })
}
export const changed = (data) =>{
 return request({
    method:'post',
    url:'user/changed',
    data
 })   
}

export const register = (data) =>{
    return request({
        method:"POST",
        url:"user/register",
        data,
    })
}

export const getUserInfo = () =>{
    return request({
        method:"GET",
        url:"user/info",
    })
}

export const updateUserInfo = (data) =>{
    return request({
        method:"POST",
        url:"user/update",
        data
    })
}

