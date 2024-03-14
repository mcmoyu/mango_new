<template>
	<view>
		<view id="main">
			<view class="platforms">
				<uv-tabs :list="list" :current="current" lineColor="#F59E00" lineWidth="30" lineHeight="5" activeStyle="font-weight: bold; color: #F59E00;" @change="change"></uv-tabs>
			</view>
			<textarea id="content" type="textarea" maxlength="-1" :placeholder="list[current].placeholder" v-model.trim="content" @input="input"></textarea>
			<button class="clear" @click="content = ''">清空内容</button>
			<button @click="turn()" plain="true" :loading="isTurn" v-text="turnBtnText.list[turnBtnText.index]"></button>
			<textarea v-show="result && content" maxlength="-1" id="result" type="textarea" v-model="result"></textarea>
			<button v-show="result && content" @click="copy()" plain="true">立即复制</button>
			<button v-show="result && content" @click="jumpToThirdApp">点击跳转到{{ list[current].realname }}App</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				list: [
					{
						name: "淘淘",
						realname: "淘宝",
						code: "tb",
						disabled: false,
						icon: "/static/main/tb.png",
						placeholder: "请粘贴从淘宝App分享的链接/淘口令"
					},{
						name: "东东",
						realname: "京东",
						code: "jd",
						disabled: false,
						icon: "/static/main/jd.png",
						placeholder: "请粘贴从京东App分享的链接文案"
					},{
						name: "多多",
						realname: "拼多多",
						code: "pdd",
						disabled: false,
						icon: "/static/main/pdd.png",
						placeholder: "请粘贴从拼多多App分享的链接地址"
					},{
						name: "抖抖",
						realname: "抖音",
						code: "dy",
						disabled: false,
						icon: "/static/main/dy.png",
						placeholder: "请粘贴从抖音App分享的链接文案"
					},{
						name: "团团",
						realname: "美团",
						code: "mt",
						disabled: true,
						icon: "/static/main/mt.png",
						placeholder: ""
					},{
						name: "么么",
						realname: "饿了么",
						code: "elm",
						disabled: true,
						icon: "/static/main/elm.png",
						placeholder: ""
					},{
						name: "唯唯",
						realname: "唯品会",
						code: "wph",
						disabled: true,
						icon: "/static/main/wph.png",
						placeholder: ""
					}
				],
				content: "",
				isTurn: false,
				turnBtnText: {
					index: 0,
					list: ["立即转链", "正在转链"]
				},
				result: "",
				urlScheme: "",
				parseUrl: {
					tb: "",
					jd: "",
					pdd: "",
					dy: ""
				},
				hasCoupon: {
					tb: -1,
					jd: -1, // -1失败 0没有 1有
				},
				jumpData: {
					pdd: {
						appid: "",
						path: ""
					}
				}
			}
		},
		watch: {
			current() {
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
			change(item) {
				this.current = item.index;
				console.log(item);
			},
			input(e) {
				this.result = "";
			},
			turn() {
				if (this.content) {
					this.isTurn = true;
					this.turnBtnText.index = 1;
					switch (this.list[this.current].code) {
						case "tb":
							let regTb = new RegExp(/[\S\s]+\?tk=([\w]{11})[\S\s]+/g);
							let resTb = regTb.exec(this.content);
							if (resTb != null) {
								this.parseUrl.tb = resTb.length > 1 ? resTb[1] : ""
								uni.request({
									url: uni.BASE_API + "/myq/doItemHighCommissionPromotionLinkByTpwd",
									method: "GET",
									data: {
										tpwdcode: this.parseUrl.tb
									},
									success: (res) => {
										if (res.data.code == 200) {
											if (res.data.data.tpwd_str) {
												this.result = res.data.data.tpwd_str;
												this.urlScheme = res.data.data.tpwd_str;
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
							} else {
								uni.showModal({
									title: "提示",
									content: "请输入从淘宝App分享的淘口令链接",
									showCancel: false,
									confirmText: "我知道了",
									success: () => {
										this.isTurn = false;
									}
								})
							}
						break;
						case "jd":
							let regJd = new RegExp(/https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/g);
							let resJd = regJd.exec(this.content);
							this.parseUrl.jd = resJd.length > 0 ? resJd[0] : "";
							uni.request({
								url: uni.BASE_API + "/dtk/getJdSinglePromotionUnionConvert",
								method: "GET",
								data: {
									unionId: "1000782038",
									materialId: this.parseUrl.jd,
									chainType: 3
								},
								success: (res) => {
									if (res.data.msg == "成功") {
										this.result = res.data.data.shortUrl;
										this.urlScheme = res.data.data.shortUrl;
										this.checkJDHasCoupon();
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
						case "pdd":
							let regPdd = new RegExp(/goods_id=([\d]+)&?/g);
							let resPdd = regPdd.exec(this.content);
							this.parseUrl.pdd = resPdd.length > 0 ? resPdd[0] : "";
							uni.request({
								url: uni.BASE_API + "/dtk/getPddGoodsSearch",
								method: "GET",
								data: {
									keyword: this.parseUrl.pdd
								},
								success: (goodsSign) => {
									console.log(goodsSign);
									this.parseUrl.pdd = goodsSign.data.data.goodsList.length > 0 ? goodsSign.data.data.goodsList[0].goodsSign : "";
									if (this.parseUrl.pdd) {
										uni.request({
											url: uni.BASE_API + "/dtk/getPddGoodsPromGenerate",
											method: "GET",
											data: {
												pid: "8464534_211987743",
												goodsSign: this.parseUrl.pdd
											},
											success: (res) => {
												console.log(res);
												this.result = res.data.data.weAppWebViewShortUrl;
												this.urlScheme = res.data.data.tzSchemaUrl;
												this.jumpData.pdd.appid = res.data.data.weAppInfo.appId;
												this.jumpData.pdd.path = res.data.data.weAppInfo.pagePath;
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
									} else {
										uni.showToast({
											icon: "none",
											title: "未解析出goodsSign"
										})
									}
								},
								fail: (err) => {
									console.log(err, "error");
								},
								complete: (res) => {
									console.log(res, "complete");
									// this.isTurn = false;
									// this.turnBtnText.index = 0;
								}
							})
						break;
						case "dy":
							uni.request({
								url: uni.BASE_API + "/dtk/getTiktokKolProductShare",
								method: "GET",
								data: {
									productUrl: this.content,
									externalInfo: 0
								},
								success: (res) => {
									console.log(res);
									this.result = res.data.data.dyPassword;
									this.urlScheme = res.data.data.dyDeeplink;
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
						default:
							uni.showToast({
								icon: "error",
								title: "暂未开启"
							})
							this.current = 0;
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
			checkJDHasCoupon() {
				uni.request({
					url: uni.BASE_API + "/dtk/getJdParseUrl",
					method: "GET",
					data: {
						url: this.parseUrl.jd
					},
					success: (res) => {
						console.log(res, "check");
						this.hasCoupon.jd = res.data.data.hasCoupon;
					}
				})
			},
			jumpToJDminiApp() {
				let path = (this.hasCoupon.jd == "1" ? "pages/proxy/union/union" : "pages/union/proxy/proxy") + "?spreadUrl=" + encodeURI(this.result);
				console.log(path, "path");
				uni.navigateToMiniProgram({
					appId: "wx91d27dbf599dff74",
					envVersion: "release",
					path: path,
					success: (res) => {
						console.log(res, "res");
					},
					fail: (err) => {
						console.log(err, "err");
					}
				})
			},
			jumpToPDDminiApp() {
				uni.navigateToMiniProgram({
					appId: this.jumpData.pdd.appid,
					envVersion: "release",
					path: this.jumpData.pdd.path,
					success: (res) => {
						console.log(res, "res");
					},
					fail: (err) => {
						console.log(err, "err");
					}
				})
			},
			jumpToThirdApp() {
				// #ifdef APP
				let code = this.list[this.current].code;
				let urlScheme = "";
				let finalUrl = "";
				if (code == "tb") {
					let regTb = new RegExp(/([a-zA-z]+:\/\/[^\s]*)/g);
					let resTb = regTb.exec(this.result);
					finalUrl = (resTb && resTb.length > 1) ? resTb[1] : ""
					urlScheme = this.getUrlScheme.TB(finalUrl);
				} else if (code == "jd") {
					let regJd = new RegExp(/([a-zA-z]+:\/\/[^\s]*)/g);
					let resJd = regJd.exec(this.result);
					finalUrl = (resJd && resJd.length > 1) ? resJd[1] : ""
					urlScheme = this.getUrlScheme.JD(finalUrl);
				} else if (code == "pdd") {
					let regPdd = new RegExp(/([a-zA-z]+:\/\/[^\s]*)/g);
					let resPdd = regPdd.exec(this.result);
					finalUrl = (resPdd && resPdd.length > 1) ? resPdd[1] : ""
					urlScheme = this.getUrlScheme.PDD(finalUrl);
				} else if (code == "dy") {
					finalUrl = this.urlScheme;
					urlScheme = this.getUrlScheme.DY(finalUrl);
				}
				// console.log(finalUrl, "finalUrl");
				console.log(urlScheme, "urlScheme");
				plus.runtime.openURL(urlScheme, (err) => {
					uni.showModal({
						title: "err",
						content: JSON.stringify(err)
					});
				});
				// #endif
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
	/* #ifdef APP-PLUS */
	width: 100%;
	/* #endif */
	height: 300rpx;
	padding: 10rpx;
	border-radius: 10rpx;
	border: 1px solid #F59E00;
}

.platforms {
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
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
