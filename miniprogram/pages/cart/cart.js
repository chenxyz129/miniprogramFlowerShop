// pages/cart/component/cart.js
import {
    debounce
} from "lodash"
import {
    reqGetCart,
    reqAddToCart,
    reqCheckAllCart,
    reqCheckCart,
    reqDelCartById
} from "@/api/cart"
import {
    userStore
} from "@/store/userStore"
import {
    storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
    swipeCellBehavior
} from "@/behaviors/swipeCellBehavior"
const computedBehavior = require('miniprogram-computed').behavior
Component({
    behaviors: [storeBindingsBehavior, computedBehavior, swipeCellBehavior],
    storeBindings: {
        store: userStore,
        fields: {
            token: 'token'
        }
    },
    computed: {
        isAllChecked(data) {
            return data.cartList.every((item) => item.isChecked == 1) ? 1 : 0
        },
        totalPrice(data) {
            let total = 0
            data.cartList.forEach((item) => {
                if (item.isChecked == 1) {
                    total += item.price
                }
            })
            return total
        }
    },
    // 组件的属性列表
    properties: {},

    // 组件的初始数据
    data: {
        cartList: [],
        emptyDes: '还没有添加商品，快去添加吧～'
    },
    // 组件的方法列表
    methods: {
        async getCartList() {
            const res = await reqGetCart()
            if (res.code == 200) {
                this.setData({
                    cartList: res.data
                })
            }
        },
        stepperChange: debounce(async function (event) {
            const newCount = event.detail
            const {
                goodsid,
                index,
                oldcount
            } = event.target.dataset
            this.setData({
                [`cartList[${index}].count`]: newCount
            })
            const diffCount = newCount - oldcount
            const res = await reqAddToCart(goodsid, diffCount)
        }, 1000),
        changeChekbox: debounce(async function (event) {
            const newCheckedStatus = event.detail
            const {
                goodsid,
                index,
            } = event.target.dataset
            this.setData({
                [`cartList[${index}].isChecked`]: newCheckedStatus ? 1 : 0
            })
            const res = await reqCheckCart(goodsid, newCheckedStatus ? 1 : 0)
        }, 500),
        CheckAll: debounce(async function (event) {
            let cartlist = JSON.parse(JSON.stringify(this.data.cartList))
            cartlist.forEach(item => {
                item.isChecked = this.data.isAllChecked ? 0 : 1
            });
            this.setData({
                cartList: cartlist
            })
            const res = await reqCheckAllCart(this.data.isAllChecked)

        }, 500),
        async delGoods(event) {
            const {
                id
            } = event.currentTarget.dataset
            const modalRes = await wx.modal({
                title: "是否删除？"
            })
            if (modalRes) {
                const res = await reqDelCartById(id)
                this.getCartList()
            }

        },
        //去结算
        submit(){
            if(!this.data.totalPrice){
                wx.toast({
                    title:'请先选择商品！'
                })
                return
            }
            wx.navigateTo({
              url: '/modules/orderPayModule/pages/order/detail/detail',
            })
        }
    },
    lifetimes: {

    },
    pageLifetimes: {
        show() {
            this.getCartList()
            this.closeSwipe()
        }
    }
})