// pages/login/login.js
import {
    userStore
} from "../../store/userStore"
import {
    storeBindingsBehavior
} from "mobx-miniprogram-bindings"
import {
    modal
} from "../../utils/extendApi"
import {
    setStorage
} from "../../utils/storage"
import {
    reqLogin,
    reqwUserInfo
} from "../../api/user"
Component({
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store: userStore,
        fields: {
            token: 'token',
            userInfo: 'userInfo'
        },
        actions: {
            setToken: 'setToken',
            setUserInfo: 'setUserInfo'
        }
    },

    methods: {
        login() {
            wx.login({
                success: async (wxRes) => {
                    const resData = await reqLogin(wxRes.code)
                    setStorage('token', resData.data.token)
                    this.setToken(resData.data.token)
                    this.getUserInfo()
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                },
                fail: (err) => {
                    console.log(err);
                    modal({
                        title: '登录失败，请检查网络！'
                    })
                }
            })
        },
        async getUserInfo() {
            const res = await reqwUserInfo()
            setStorage('userInfo', res.data)
            this.setUserInfo(res.data)
            return res.data
        }
    }
})