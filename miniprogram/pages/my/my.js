// pages/info/info.js
import {
    userStore
} from "../../store/userStore"
import {
    storeBindingsBehavior
} from "mobx-miniprogram-bindings"
Component({
    behaviors:[storeBindingsBehavior],
    storeBindings:{
        store:userStore,
        fields:{
            token: 'token',
            userInfo: 'userInfo'
        },
        actions:{

        }
    },
  // 页面的初始数据
  data: {
    // 初始化第二个面板数据
    initpanel: [
      {
        url: '/modules/orderPayModule/pages/order/list/list',
        title: '商品订单',
        iconfont: 'icon-dingdan'
      },
      {
        url: '/modules/orderPayModule/pages/order/list/list',
        title: '礼品卡订单',
        iconfont: 'icon-lipinka'
      },
      {
        url: '/modules/orderPayModule/pages/order/list/list',
        title: '退款/售后',
        iconfont: 'icon-tuikuan'
      }
    ]
  },
  // 跳转到登录页面
  methods:{
    toLoginPage() {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
  }
})
