// pages/goods/list/index.js
import {
    reqGoodsList
} from "@/api/goods"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        goodsList: [], // 商品列表数据
        isFinish: false, // 判断数据是否加载完毕
        reqData: {
            page: 1,
            limit: 5,
            category1Id: '',
            category2Id: '',
        },
        total: '',
        isLoading: false
    },
    async getGoodsList() {
        if (this.data.isLoading == true) return
        this.setData({
            isLoading: true
        })
        const res = await reqGoodsList(this.data.reqData)
        if (res.code == 200) {
            this.setData({
                'goodsList': [...this.data.goodsList, ...res.data.records],
                total: res.data.total,
                isLoading: false
            })
        }
    },
    onLoad(options) {
        if (options.category1Id) {
            this.setData({
                'reqData.category1Id': options.category1Id ? options.category1Id : '',
                'reqData.category2Id': options.category2Id ? options.category2Id : ''
            })
        }

        this.getGoodsList()
    },
    onPullDownRefresh() {
        this.setData({
            goodsList: [],
            reqData: {
                page: 1,
                limit: 5,
                category1Id: '',
                category2Id: '',
            }
        })
        this.getGoodsList().then(() => wx.stopPullDownRefresh())
    },
    onReachBottom() {
        if (this.data.goodsList.length == this.data.total) {
            this.setData({
                isFinish: true
            })
            return
        }
        this.setData({
            "reqData.page": this.data.reqData.page + 1
        })
        this.getGoodsList()
    }
})