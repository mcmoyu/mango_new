import {
	HTTP_REQUEST_URL,
	HEADER
} from '@/api/config.js';

/**
 * 发送请求
 */
function baseRequest(url, method, data, {
	noAuth = true
}, header = HEADER) {
	let Url = HTTP_REQUEST_URL;
	
	if (noAuth) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: Url + '/Dtk/' + url,
				method: method || 'GET',
				header: header,
				data: data || {},
				success: (res) => {
					if (res.statusCode == 200)
						resolve(res.data, res);
					else if ([410000, 410001, 410002, 40000].indexOf(res.data.code) !== -1) {
						toLogin();
						reject(res.data);
					} else if (res.data.status == 501) {
						uni.reLaunch({
							url: '/pages/index/index'
						})
						reject(res.data);
					} else
						reject(res.data.message || '系统错误');
				},
				fail: (message) => {
					reject('请求失败');
				},
				complete: (res) => {
					if (uni.getStorageSync("debug")) {
						console.log("[" + method + "]", Url + '/Dtk/' + url, data, header, res);
					}
				}
			})
		});
	}
	
	
}

const request = {
	upload: function(api, name, filePath, formData = "", {
		noAuth = false,
		noVerify = false
	}, header = HEADER) {
		let Url = HTTP_REQUEST_URL;
		return new Promise((resolve, reject)=>{
			uni.uploadFile({
				url: Url + '/api/' + api,
				filePath: filePath,
				name: name,
				// formData: formData,
				// header: header,
				success: (res) => {
					if (noVerify) {
						resolve(res.data, res);
					} else if (res.statusCode == 200) {
						resolve(JSON.parse(res.data), res);
					} else {
						reject(res.data);
					}
				},
				fail: (err) => {
					reject(err.message);
				},
				complete: (res) => {
					if (uni.getStorageSync("debug")) {
						console.log("[" + "upload" + "]", Url + '/api/' + api, formData, header, res);
					}
				}
			})
		})
	},
	get: function (api, data, opt, header) {
	    return baseRequest(api, "get", data || {}, opt || {}, header);
	},
	post: function (api, data, opt, header) {
		return baseRequest(api, "post", data || {}, opt || {}, header);
	}
};

// ['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
// 	request[method] = (api, data, opt, header) => baseRequest(api, method, data || {}, opt || {}, header)
// });

export default request;