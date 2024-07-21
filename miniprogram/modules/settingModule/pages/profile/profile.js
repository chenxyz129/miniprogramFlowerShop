// modules/settingModule/pages/profile/profile.js
import {
    userStore
} from "../../../../store/userStore"
import {
    storeBindingsBehavior
} from "mobx-miniprogram-bindings"
import http from "../../../../utils/http"
import {
    setStorage
} from "../../../../utils/storage"
import {
    reqUpLoadAvatar,
    reqUpdateUserInfo,
    reqwUserInfo
} from "../../../../api/user"
import {
    toast
} from "../../../../utils/extendApi"
Component({
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store: userStore,
        fields: {
            token: "token",
            userInfo: "userInfo"
        },
        actions: {
            setUserInfo: "setUserInfo"
        }
    },
    // 页面的初始数据
    data: {
        isShowPopup: false // 控制更新用户昵称的弹框显示与否
    },

    methods: {
        // 显示修改昵称弹框
        onUpdateNickName() {
            this.setData({
                isShowPopup: true,
                "userInfo.nickname": this.data.userInfo.nickname
            })
        },

        // 弹框取消按钮
        cancelForm() {
            this.setData({
                isShowPopup: false
            })
        },
        async chooseAvatar(event) {
            console.log(event);
            const res = await reqUpLoadAvatar(event.detail.avatarUrl)
            console.log(res);
            this.setData({
                'userInfo.headimgurl': res.data
            })

        },
        async saveUserInfo() {
            setStorage('userInfo', this.data.userInfo)
            const updateRes = await reqUpdateUserInfo(this.data.userInfo)
            console.log(updateRes);
            if (updateRes.code == 200) {
                this.setUserInfo(this.data.userInfo)
                toast({
                    title: "保存成功",
                    icon: "success"
                })
            }

        },
        async submitForm(event) {
            console.log(event);
            this.setData({
                "userInfo.nickname": event.detail.value.nickname,
                isShowPopup: false
            })
        }
    }
})