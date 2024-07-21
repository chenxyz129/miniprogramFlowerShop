import http from "@/utils/http"

export const reqAddToCart = (goodsId, count, blessing = '') => {
    return http.get(`/cart/addToCart/${goodsId}/${count}?blessing=${blessing}`)
}

export const reqGetCart = () => http.get('/cart/getCartList')

export const reqCheckCart = (goodsId, isChecked) => http.get(`/cart/checkCart/${goodsId}/${isChecked}`)

export const reqCheckAllCart = (isChecked) => http.get(`/cart/checkAllCart/${isChecked}`)

export const reqDelCartById = (goodsId) => http.get(`/cart/delete/${goodsId}`)