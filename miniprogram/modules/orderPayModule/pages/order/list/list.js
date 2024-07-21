// pages/order/list/index.js

import {
    reqOrderList
} from "@/api/orderpay"
Page({
    // 页面的初始数据
    data: {
        orderList: [],
        page: 1,
        limit: 5,
        total: 0
    },
    async getOrderList() {
        
        const res = await reqOrderList(this.data.page, this.data.limit)
        console.log(res);
        this.data.total = res.data.total
        if(this.data.orderList.length == res.data.total) return
        this.setData({
            orderList: [...this.data.orderList, ...res.data.records]
        })
        wx.stopPullDownRefresh()
    },
    onLoad() {
        this.getOrderList()
    },
    onPullDownRefresh() {
        this.data.page = 1
        this.setData({
            orderList: []
        })
        this.getOrderList()
    },
    onReachBottom() {
        this.data.page++
        this.getOrderList()
    }
})