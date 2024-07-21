const toast = ({
    title = "数据加载中...",
    icon = "none",
    duration = 2000,
    mask = true
} = {}) => {
    wx.showToast({
        title,
        icon,
        duration,
        mask
    })
}
const modal = (options) => {
    return new Promise((reslove) => {
        const defaultOpts = {
            title: '',
            content: '',

        }
        const opts = Object.assign({}, defaultOpts, options)
        wx.showModal({
            ...opts,
            complete: (res) => {
                if (res.cancel) {
                    reslove(false)
                }

                if (res.confirm) {
                    reslove(true)
                }
            }
        })
    })
}
wx.toast = toast
wx.modal = modal
export {
    toast,modal
}