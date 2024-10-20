const _requestTask = new WeakMap();

export default function fetch(req) {
  return new Promise((resolve, reject) => {
    const { url, options } = req;
    const { method = 'GET', headers = {}, body } = options;
    const requestTask = wx.request({
      url,
      method,
      header: headers,
      data: body,
      success: (res) => {
        const { statusCode, data, header } = res;
        const response = new Response(data, {
          status: statusCode,
          statusText: 'OK',
          headers: header,
        });
        resolve(response);
      },
      fail: (err) => {
        reject(err);
      },
    });
    _requestTask.set(req, requestTask);
  });
}
