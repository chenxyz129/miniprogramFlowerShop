import http from "../utils/http";

export const reqLogin = (code) => http.get(`/weixin/wxLogin/${code}`)

export const reqwUserInfo = () => http.get("/weixin/getuserInfo")

export const reqUpLoadAvatar = (avatarUrl) => http.upload("/fileUpload", avatarUrl, "file")

export const reqUpdateUserInfo = (userInfo) => {
    console.log(userInfo);
    return http.post("/weixin/updateUser", userInfo)
}