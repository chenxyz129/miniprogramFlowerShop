
export default class WxRequest {
  defaults = {
    baseURL: "",
    url: "",
    data: null,
    method: "GET",
    header: {
      "Content-type": "application/json",
    },
    timeout: 60000,
    isLoading: true,
  };
  constructor(opts) {
    this.defaults = {
      ...this.defaults,
      ...opts,
    };
  }
  interceptors = {
    request: (config) => {
      return config;
    },
    response: (response) => {
      return response;
    },
  };
  queue = [];
  requst(options) {
    let reqOptions = {
      ...this.defaults,
      ...options,
    };
    reqOptions.url = this.defaults.baseURL + reqOptions.url;
    reqOptions = this.interceptors.request(reqOptions);
    return new Promise((reslove, reject) => {
      if (reqOptions.isLoading && reqOptions.method != "UPLOAD") {
        this.queue.push("request");
        this.timeoutid && clearTimeout(this.timeoutid);
        wx.showLoading({
          title: "title",
        });
      }
      if (reqOptions.method === "UPLOAD") {
        //uploadfile
        wx.uploadFile({
          ...reqOptions,
          success: (res) => {
            res.data = JSON.parse(res.data);
            const mergeRes = Object.assign({}, res, {
              config: reqOptions,
              isSuccess: true,
            });
            reslove(this.interceptors.response(mergeRes));
          },
          fail: (err) => {
            const mergeErr = Object.assign({}, err, {
              config: reqOptions,
              isSuccess: false,
            });
            reject(this.interceptors.response(mergeErr));
          },
        });
      } else {
        //普通请求 get post put delete
        wx.request({
          ...reqOptions,
          success: (res) => {
            const mergeRes = Object.assign({}, res, {
              config: reqOptions,
              isSuccess: true,
            });
            reslove(this.interceptors.response(mergeRes));
          },
          fail: (err) => {
            const mergeErr = Object.assign({}, err, {
              config: reqOptions,
              isSuccess: false,
            });
            reject(this.interceptors.response(mergeErr));
          },
          complete: () => {
            if (reqOptions.isLoading && reqOptions.method != "UPLOAD") {
              this.queue.pop();
              this.timeoutid = setTimeout(() => {
                this.queue.length === 0 && wx.hideLoading();
              }, 100);
            }
          },
        });
      }
    });
  }
  get(url, data, config) {
    return this.requst({
      url,
      data,
      method: "GET",
      ...config,
    });
  }
  post(url, data, config) {
    return this.requst({
      url,
      data,
      method: "post",
      ...config,
    });
  }
  put(url, data, config) {
    return this.requst({
      url,
      data,
      method: "put",
      ...config,
    });
  }
  delete(url, data, config) {
    return this.requst({
      url,
      data,
      method: "delete",
      ...config,
    });
  }
  all(...promise) {
    return Promise.all(promise);
  }
  upload(url, filePath, name = "file", config) {
    return this.requst(
      Object.assign(
        {
          url,
          filePath,
          name,
          method: "UPLOAD",
        },
        config
      )
    );
  }
}
