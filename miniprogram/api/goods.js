import http from "@/utils/http"

export const reqGoodsList = ({
    page,
    limit,
    category1Id,
    category2Id
}) => http.get(`/goods/list/${page}/${limit}?category1Id=${category1Id}&category2Id=${category2Id}`)

export const reqGoodsById = (goodsId) => http.get(`/goods/${goodsId}`)