let httpApi = 'https://mangoapi.ittu.cn'; // 接口地址，结尾不带/

let ret = {};
if (uni.getStorageSync("userInfo").access_token) {
	ret = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': 'Bearer ' + uni.getStorageSync("userInfo").access_token
	}
} else {
	ret = {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
}

module.exports = {
	HTTP_REQUEST_URL: httpApi,
	HEADER: ret,
};
