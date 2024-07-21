const accountInfo = wx.getAccountInfoSync();
const envVersion = accountInfo.miniProgram.envVersion;
export const env = {
  baseUrl: "https://gmall-prod.atguigu.cn/mall-api",
};
switch (envVersion) {
  case "develop":
    env.baseUrl = "https://gmall-prod.atguigu.cn/mall-api";
    break;
  case "trail":
    env.baseUrl = "https://gmall-prod.atguigu.cn/mall-api";
    break;
  case "release":
    env.baseUrl = "https://gmall-prod.atguigu.cn/mall-api";
    break;
  default:
    break;
}
