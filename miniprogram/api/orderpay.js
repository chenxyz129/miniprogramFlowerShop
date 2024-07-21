import http from "@/utils/http"

export const reqGetTrade = () => http.get("/order/trade")

export const reqGetOrderAddr = () => http.get("/userAddress/getOrderAddress")

export const reqOrderById = (goodsId, blessing) => http.get(`/order/buy/${goodsId}?blessing=${blessing}`)

export const reqSubmitOrder = (data) => http.post('/order/submitOrder', data)

export const reqGetPayInfo = (orderId) => http.get(`/webChat/createJsapi/${orderId}`)

export const reqQueryPayStatus = (OrderId) => http.get(`/webChat/queryPayStatus/${OrderId}`)

export const reqOrderList = (page, limit) => http.get(`/order/order/${page}/${limit}`)