import http from "../utils/http";

export const reqGetCategoryData = () => http.get("/index/findCategoryTree")