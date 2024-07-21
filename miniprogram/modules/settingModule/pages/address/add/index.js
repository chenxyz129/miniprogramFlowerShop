import {
    reqGetAddressById,
    reqUpdateAddress
} from "../../../../../api/addr"
import Schema from 'async-validator';
Page({

    // 页面的初始数据
    data: {
        name: "", //收货人
        phone: "", //手机号码
        provinceName: "", //省
        provinceCode: "", //省编码
        cityName: "", //市
        cityCode: "", //市编码
        districtName: "", //区
        districtCode: "", //市编码
        address: "", //详细地址
        fullAddress: "", //完整地址
        isDefault: false //是否默认地址
    },

    // 保存收货地址
    async saveAddrssForm(event) {
        let addrObj = {
            ...this.data,
            isDefault: this.data.isDefault ? 1 : 0,
            fullAddress: this.data.provinceName + this.data.cityName + this.data.districtName
        }
        const ValidateRes = await this.validateInfo()
        if (!ValidateRes) return
        const res = await reqUpdateAddress(addrObj)
        if (res.code == 200) {
            wx.toast({
                title: "保存成功"
            })
        } else {
            wx.toast({
                title: "保存失败"
            })
        }
    },
    // 省市区选择
    onAddressChange(event) {
        const [provinceName, cityName, districtName] = event.detail.value
        const [provinceCode, cityCode, districtCode] = event.detail.code
        this.setData({
            provinceName,
            cityName,
            districtName,
            provinceCode,
            cityCode,
            districtCode,
        })
    },
    //通过id获取地址数据
    async getGetAddressById(id) {
        const res = await reqGetAddressById(id)
        this.setData({
            name: res.data.name,
            phone: res.data.phone,
            provinceName: res.data.provinceName,
            provinceCode: res.data.provinceCode,
            cityName: res.data.cityName,
            cityCode: res.data.cityCode,
            districtName: res.data.districtName,
            districtCode: res.data.districtCode,
            address: res.data.address,
            fullAddress: res.data.fullAddress,
            isDefault: res.data.isDefault,
        })
    },
    //校验收货信息
    validateInfo() {
        const rules = {
            name: [{
                type: 'string',
                required: true,
                message: "收货人姓名不能为空！"
            }, {
                min: 2,
                max: 8,
                message: "收货人姓名长度需在2-8位"
            }],
            phone: [{
                type: 'string',
                required: true,
                pattern: /^1[3456789]\d{9}$/,
                message: "手机号不合法！"
            }],
            provinceName: [{
                type: 'string',
                required: true,
                message: "省市信息不能为空！"
            }],
            address: [{
                type: 'string',
                required: true,
                message: "详细地址不能为空！"
            }]

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
                reject(false)
            })
        })
    },
    onLoad(options) {
        if (options.id) {
            this.getGetAddressById(options.id)
        }
    }
})