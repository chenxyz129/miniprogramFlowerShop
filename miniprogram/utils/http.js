import WxRequest from "./request";
import { env } from "../utils/env";
const instance = new WxRequest({
  baseURL: env.baseUrl,
  timeout: 15000,
  isLoading: true,
});
instance.interceptors.request = (req) => {
  const token = wx.getStorageSync("token");
  if (token) {
    req.header["token"] = token;
  }
  return req;
};
instance.interceptors.response = async (response) => {
  const { isSuccess, data } = response;
  if (!isSuccess) {
    wx.showToast({
      title: "网络异常请重试",
      icon: "error",
    });
    return response;
  }
  switch (data.code) {
    case 200:
      return data;
    case 208:
      const modalStatus = await wx.showModal({
        title: "提示",
        content: "登录授权过期，或未登录！",
        showCancel: false,
      });
      if (modalStatus) {
        wx.clearStorage("token");
        wx.navigateTo({
          url: "/pages/login/login",
        });
      }
      return Promise.reject(respoense);
    default:
      wx.showToast({
        title: "程序出现异常，请联系客服或稍后重试",
      });
      console.log(data);
      return Promise.reject(response);
  }
  return data;
};

export default instance;
