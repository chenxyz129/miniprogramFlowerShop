import {
    reqGetCategoryData
} from "../../api/category"
Page({

    /**
     * 页面的初始数据
     */
    data: {
            categoryList:[],
            activeIndex:0
    },
   async GetCategoryData() {
        const res = await reqGetCategoryData()
        console.log(res);
        this.setData({
            categoryList:res.data
        })
    },
    switchCategory(event){
        console.log(event.currentTarget.dataset.index);
        this.setData({
            activeIndex:event.currentTarget.dataset.index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.GetCategoryData()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})