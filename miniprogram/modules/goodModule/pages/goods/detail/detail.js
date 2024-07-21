// pages/goods/detail/index.js
import {
    reqGoodsById
} from "@/api/goods"
import {
    reqGetCart,
    reqAddToCart
} from "@/api/cart"
Page({
    // 页面的初始数据
    data: {
        goodsInfo: {}, // 商品详情
        show: false, // 控制加入购物车和立即购买弹框的显示
        count: 1, // 商品购买数量，默认是 1
        allCount: '',
        blessing: '', // 祝福语
        goodsId: "",
        buyNow: '', //true为立即购买，false为加入购物车
        cartNum: 0
    },

    // 加入购物车
    handleAddcart() {
        this.setData({
            show: true,
            buyNow: false
        })
        
    },

    // 立即购买
    handeGotoBuy() {
        this.setData({
            show: true,
            buyNow: true,
            count: 1
        })
    },
    //确定
    async submit() {
        const {
            goodsId,
            count,
            blessing
        } = this.data
        if (this.data.buyNow == false) {
            const res = await reqAddToCart(goodsId, count, blessing)
            if (res.code == 200) {
                wx.toast({
                    title: "加入购物车成功！"
                })
                this.getCartList()
               this.setData({
                   show:false
               })
            }
        } else {
            wx.navigateTo({
                url: `/modules/orderPayModule/pages/order/detail/detail?goodsId=${goodsId}&blessing=${blessing}`,
            })
        }
    },
    async getGoodsById() {
        const res = await reqGoodsById(this.data.goodsId)
        this.setData({
            goodsInfo: res.data
        })
    },
    // 点击关闭弹框时触发的回调
    onClose() {
        this.setData({
            show: false
        })
    },
    async getCartList() {
        const res = await reqGetCart()
        if (res.code == 200) {
            this.setData({
                cartNum: res.data.length
            })
        }
    },
    // 监听是否更改了购买数量
    onChangeGoodsCount(event) {
        console.log(event.detail)
        this.setData({
            count: event.detail
        })
    },
    onLoad(options) {
        this.setData({
            goodsId: options.goodsId
        })
        this.getGoodsById()
        this.getCartList()
    }
})