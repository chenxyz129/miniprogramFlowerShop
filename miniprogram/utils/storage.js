export const setStorage = (key, data) => {
    try {
        wx.setStorageSync(key, data)
    } catch (error) {
        console.error(`写入${key}发生了异常`);
    }
}
export const getStorage = (key) => {
    try {
        const value = wx.getStorageSync(key)
        if (value) {
            return value
        }
    } catch (error) {
        console.error(`读取${key}发生了异常`);
    }
}
export const removeStorage = async (key) => {
    try {
        await wx.removeStorageSync(key)
    } catch (error) {
        console.error(`删除${key}发生了异常`);
    }
}
export const clearStorage = () => {
    try {
        wx.clearStorage()
    } catch (error) {
        console.error(`清空本地数据发生了异常`);
    }
}