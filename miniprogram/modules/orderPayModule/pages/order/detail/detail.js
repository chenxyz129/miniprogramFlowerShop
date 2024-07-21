import {
    reqOrderById,
    reqGetOrderAddr,
    reqGetTrade,
    reqSubmitOrder,
    reqGetPayInfo,
    reqQueryPayStatus
} from "@/api/orderpay"
import {
    formatTime
} from "@/utils/formatTime"
const computedBehavior = require('miniprogram-computed').behavior
import Schema from "async-validator"
Component({
    behaviors: [computedBehavior],
    computed: {
        totalPrice(data) {
            let total = 0
            data.cartList.forEach((item) => total += item.price)
            return total
        }
    },
    data: {
        buyName: '', // 订购人姓名
        buyPhone: '', // 订购人手机号
        deliveryDate: '选择送达日期', // 期望送达日期
        blessing: '', // 祝福语
        show: false, // 期望送达日期弹框
        minDate: new Date().getTime(),
        currentDate: new Date().getTime(),
        orderAddr: '',
        goodsId: '', // goodsId有数据代表点击立即购买进入该页面，否则代表点击购物车结算进入该页面
        cartList: [],
        orderId: '', //订单id
        prePayInfo: {}
    },
    methods: {
        async getOrderAddr() {
            const app = getApp()
            if (app.address) {
                this.setData({
                    orderAddr: app.address
                })
            } else {
                const res = await reqGetOrderAddr()
                this.setData({
                    orderAddr: res.data
                })
            }
        },
        async getOrderList() {
            if (this.data.goodsId) {
                const res = await reqOrderById(this.data.goodsId)
                this.setData({
                    cartList: res.data.cartVoList
                })
            } else {
                const res = await reqGetTrade()
                this.setData({
                    cartList: res.data.cartVoList
                })
            }
        },
        //根据订单id获取预付信息
        async getPrePayInfo() {
            const res = await reqGetPayInfo(this.data.orderId)
            console.log(res);
            if (res.code == 200) {
                this.data.prePayInfo = res.data
            } else {
                wx.toast({
                    title: '支付失败！'
                })
            }
        },

        //根据预付信息支付
        async payTheOrder() {
            const res = await wx.requestPayment(this.data.prePayInfo,)
        },
        //根据订单id查询订单支付结果
        async getQueryPayStatus() {
            const res = await reqQueryPayStatus(this.data.orderId)
            if (res.code == 200) {
                wx.redirectTo({
                    url: '/modules/orderPayModule/pages/order/list/list',
                })
                wx.toast({
                    title: '支付成功！'
                })
            }else{
                wx.toast({title:'支付失败！'})
            }
        },
        // 选择期望送达日期
        onShowDateTimerPopUp() {
            this.setData({
                show: true
            })
        },

        // 期望送达日期确定按钮
        onConfirmTimerPicker(event) {
            this.setData({
                deliveryDate: formatTime(new Date(event.detail))
            })
            this.setData({
                show: false
            })
        },

        // 期望送达日期取消按钮 以及 关闭弹框时触发
        onCancelTimePicker() {
            this.setData({
                show: false,
                minDate: new Date().getTime(),
                currentDate: new Date().getTime()
            })
        },

        // 跳转到收货地址
        toAddress() {
            wx.navigateTo({
                url: '/modules/settingModule/pages/address/list/index'
            })
        },
        //校验表单信息
        async validateInfo() {
            const rules = {
                buyName: [{
                    type: 'string',
                    required: true,
                    message: '姓名不能为空'
                }],
                buyPhone: [{
                    type: 'string',
                    required: true,
                    message: '手机号不能为空'
                }, {
                    pattern: /^1[3456789]\d{9}$/,
                    required: true,
                    message: '手机号不合法'
                }],

            }
            const validator = new Schema(rules)
            return new Promise((resolve, reject) => {
                validator.validate(this.data).then(() => resolve(true)).catch(({
                    errors,
                    fields
                }) => {
                    wx.toast({
                        title: errors[0].message
                    })
                    return reject(false)
                })
            })
        },
        //提交订单
        async submit() {
            const validateRes = await this.validateInfo()
            if (!validateRes) return
            const {
                buyName,
                buyPhone,
                cartList,
                deliveryDate,
                remarks,
            } = this.data
            const userAddressId = this.data.orderAddr.id
            const submitData = {
                buyName,
                buyPhone,
                cartList,
                deliveryDate,
                remarks,
                userAddressId
            }
            //提交订单并获取订单id
            const res = await reqSubmitOrder(submitData)
            this.data.orderId = res.data
            this.getPrePayInfo().then(() => this.payTheOrder()).then(() => this.getQueryPayStatus())
        },
        onShow() {
            this.getOrderAddr()
        },
        onLoad(options) {
            if (options.goodsId) {
                this.data.goodsId = options.goodsId
            }
            this.getOrderList()
        }
    }
})