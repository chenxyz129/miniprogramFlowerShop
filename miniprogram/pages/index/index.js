import {
    reqIndexData
} from "../../api/index";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [], // 轮播图数据
        categoryList: [], // 分类数据
        activeList: [], // 活动广告
        hotList: [], // 人气推荐
        guessList: [], // 猜你喜欢
        loading: true
    },
    async getIndexData() {
        const res = await reqIndexData()
        this.setData({
            bannerList: res[0].data,
            categoryList: res[1].data,
            activeList: res[2].data,
            hotList: res[3].data,
            guessList: res[4].data,
            loading: false
        })
    },
    onShareAppMessage() {
        return {
            title:'慕尚花坊',
            path:'/pages/index/index',
            imageUrl:'../../assets/images/cate-1.png'
        }
    },
    onShareTimeline() {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getIndexData()

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
});