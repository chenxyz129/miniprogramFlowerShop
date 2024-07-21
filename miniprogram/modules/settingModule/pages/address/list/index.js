// modules/settingModule/pages/address/list/index.js
import {
    reqAddressList,
    reqDelAddress
} from "../../../../../api/addr"
import {
    swipeCellBehavior
} from "@/behaviors/swipeCellBehavior"
Component({
    behaviors: [swipeCellBehavior],
    // 页面的初始数据
    data: {
        addressList: []
    },

    methods: {
        // 去编辑页面
        toEdit(event) {
            const {
                id
            } = event.currentTarget.dataset
            wx.navigateTo({
                url: `/modules/settingModule/pages/address/add/index?id=${id}`,
                success: () => {
                    wx.setNavigationBarTitle({
                        title: '编辑收货地址',
                    })
                }
            })
        },
        //获取地址列表
        async getAddressList() {
            const resAddressList = await reqAddressList()
            if (resAddressList.code == 200) {
                this.setData({
                    addressList: resAddressList.data
                })
                wx.toast({
                    title: "获取地址列表数据成功"
                })
            } else {
                wx.toast({
                    title: "获取地址列表数据失败"
                })
            }
        },
        //通过id删除地址
        async reqDelAddress(event) {
            const res = await reqDelAddress(event.currentTarget.dataset.id)
            if (res.code == 200) {
                wx.toast({
                    title: "删除成功"
                })
            } else {
                wx.toast({
                    title: "删除失败"
                })
            }
        },
        //选择某一项地址
        tapAddr(event) {
            const {
                index
            } = event.currentTarget.dataset
            const app = getApp()
            app.address = this.data.addressList[index]
            wx.navigateBack()
        },
        onShow() {
            this.getAddressList()
            this.closeSwipe()
        },
        onLoad(options) {
            this.data.flag = options.flag
        }
    },


})