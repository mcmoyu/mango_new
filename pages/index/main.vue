<template>
	<view>
		<view id="main">
			<uni-data-select id="type" v-model="type" :localdata="types" :clear="false"></uni-data-select>
			<textarea id="content" type="textarea" v-model.trim="content" @input="input"></textarea>
			<button class="clear" @click="content = ''">清空内容</button>
			<button @click="turn()" plain="true" :loading="isTurn" v-text="turnBtnText.list[turnBtnText.index]"></button>
			<textarea v-show="result" id="result" type="textarea" v-model="result"></textarea>
			<button v-show="result" @click="copy()" plain="true">立即复制</button>
			<button v-show="type == 'jd' && result" @click="jumpToJDminiApp">跳转JD小程序</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: "tb",
				types: [
					{
						text: "淘宝",
						value: "tb"
					},
					{
						text: "京东",
						value: "jd"
					}
				],
				content: "",
				isTurn: false,
				turnBtnText: {
					index: 0,
					list: ["立即转链", "正在转链"]
				},
				result: ""
			}
		},
		watch: {
			type(newVal) {
				
				this.result = "";
			}
		},
		onShow() {
			// uni.getClipboardData({
			// 	success: (res) => {
			// 		console.log(res.data);
			// 		uni.showModal({
			// 			title: "剪贴板内容",
			// 			content: "是否对【" + res.data + "】进行识别？",
			// 			confirmText: "立即识别",
			// 			cancelText: "暂不处理",
			// 			cancelColor: "#BBBBBB",
			// 			confirmColor: "#F59E00",
			// 			success: (btn) => {
			// 				if (btn.confirm) {
			// 					this.content = res.data;
			// 					this.turn();
			// 				}
			// 			}
			// 		})
			// 	}
			// })
		},
		methods: {
			input(e) {
				this.result = "";
			},
			turn() {
				if (this.content) {
					this.isTurn = true;
					this.turnBtnText.index = 1;
					switch (this.type) {
						case "tb":
							let regTb = new RegExp(/[\S\s]+\?tk=([\w]{11})[\S\s]+/);
							let resTb = regTb.exec(this.content);
							uni.request({
								url: "https://api.mangou.shop/myq/doItemHighCommissionPromotionLinkByTpwd",
								method: "GET",
								data: {
									tpwdcode: resTb.length > 1 ? resTb[1] : ""
								},
								success: (res) => {
									if (res.data.code == 200) {
										if (res.data.data.tpwd_str) {
											this.result = res.data.data.tpwd_str;
										} else {
											uni.showModal({
												title: "提示",
												content: "抱歉，当前商品未加入转链",
												showCancel: false,
												confirmText: "我知道了"
											})
										}
									} else {
										uni.showModal({
											title: "提示",
											content: res.data.msg,
											showCancel: false,
											confirmText: "我知道了"
										})
									}
									console.log(res, "success");
								},
								fail: (err) => {
									console.log(err, "error");
								},
								complete: (res) => {
									console.log(res, "complete");
									this.isTurn = false;
									this.turnBtnText.index = 0;
								}
							})
						break;
						case "jd":
							let regJd = new RegExp(/https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/);
							let resJd = regJd.exec(this.content);
							uni.request({
								url: "https://api.mangou.shop/dtk/getJdSinglePromotionUnionConvert",
								method: "GET",
								data: {
									unionId: "1000782038",
									materialId: resJd[0],
									chainType: 3
								},
								success: (res) => {
									if (res.data.msg == "成功") {
										this.result = res.data.data.shortUrl;
									} else {
										uni.showModal({
											title: "提示",
											content: res.data.msg,
											showCancel: false,
											confirmText: "我知道了"
										})
									}
									console.log(res, "success");
								},
								fail: (err) => {
									console.log(err, "error");
								},
								complete: (res) => {
									console.log(res, "complete");
									this.isTurn = false;
									this.turnBtnText.index = 0;
								}
							})
						break;
					}
				} else {
					uni.showToast({
						icon: "none",
						title: "不能为空"
					})
				}
			},
			copy() {
				uni.setClipboardData({
					data: this.result,
					success: (res) => {
						uni.showToast({
							title: "复制成功"
						})
					}
				})
			},
			jumpToJDminiApp() {
				uni.navigateToMiniProgram({
					appId: "wx91d27dbf599dff74",
					envVersion: "release",
					path: "pages/proxy/union/union?spreadUrl=" + encodeURI(this.request),
					success: (res) => {
						console.log(res, "res");
					},
					fail: (err) => {
						console.log(err, "err");
					}
				})
			}
		}
	}
</script>

<style>
#main {
	padding: 20rpx;
}

textarea {
	/* #ifdef H5 */
	width: 100%;
	/* #endif */
	/* #ifdef MP-WEIXIN */
	width: calc(100% - 20rpx);
	/* #endif */
	height: 300rpx;
	padding: 10rpx;
	border-radius: 10rpx;
	border: 1px solid #F59E00;
}

#type {
	text-align: center;
}

#content {
	margin-top: 10rpx;
}

#main button {
	border: 0px;
	outline: none;
	color: #FFFFFF;
	margin-top: 10rpx;
	background-color: #F59E00;
}

#main .clear {
	color: #888888;
	background-color: rgba(245, 158, 0, 0.5);
}

#result {
	margin-top: 10rpx;
}
</style>
