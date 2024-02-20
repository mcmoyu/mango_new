<template>
	<view>
		<scroll-view class="swiper-item" scroll-y="true" lower-threshold="100rpx" @scroll="scroll_1" @scrolltolower="scroll_1_lower">
			<view class="swiper-item-view">
				<!-- 轮播图 -->
				<swiper id="carouse" :indicator-dots="true" :autoplay="true" :interval="5000"
					:circular="true" indicator-color="rgba(255, 255, 255, 0.3)" indicator-active-color="#FFFFFF">
					<swiper-item v-for="(item, index) in carouse.list" :key="index">
						<view class="carouse-item" @click="carouseDetail(item)">
							<image :src="item.img" mode="scaleToFill"></image>
						</view>
					</swiper-item>
				</swiper>
				<!-- NavIcons -->
				<view id="nav">
					<view id="navMain">
						<view class="navMainItem" v-for="(item, index) in nav.icons" :key="index">
							<image :src="item.img" mode="scaleToFill"></image>
							<text v-text="item.title"></text>
						</view>
					</view>
					<view id="navSmall">
						<swiper :indicator-dots="true" indicator-active-color="#F21724" indicator-color="#E0E0E0" :circular="true">
							<swiper-item>
								<view class="nav-swiper-item">
									<view class="navSmallItem" v-for="(item, index) in nav.smallIcons" :key="index"
										v-if="index < 10">
										<image :src="item.img" mode="scaleToFill"></image>
										<text v-text="item.title"></text>
									</view>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="nav-swiper-item">
									<view class="navSmallItem" v-for="(item, index) in nav.smallIcons" :key="index"
										v-if="index >= 10">
										<image :src="item.img" mode="scaleToFill"></image>
										<text v-text="item.title"></text>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<!-- 每日半价 -->
				<view id="halfprice">
					<view id="halfpriceTitle">每日<br>半价</view>
					<swiper :circular="true" :autoplay="true" :vertical="true">
						<swiper-item v-for="(item, index) in halfPrice.list" :key="index">
							<view class="halfpriceItem" v-text="item.desc"></view>
						</swiper-item>
					</swiper>
					<uni-icons type="right" size="16" color="#F21724"></uni-icons>
				</view>
				<!-- 快捷入口 -->
				<view id="shortcut">
					<!-- 历史新低 -->
					<view id="recordLow">
						<view class="shortcutHeader">
							<view class="shortcutTitle">历史新低</view>
							<view class="shortcutNote">
								<text>查看更多</text>
								<uni-icons type="right" color="#888888" size="24rpx"></uni-icons>
							</view>
						</view>
						<ol class="shortcutList">
							<li class="shortcutItem" v-for="(item, index) in record.list" :key="index" v-if="index < 5">
								<image class="shortcutItemImage" :src="item.mainPic" mode="scaleToFill"></image>
								<view class="shortcutItemTitle" v-text="item.title"></view>
							</li>
						</ol>
					</view>
					<!-- 高佣精选 -->
					<view id="selection">
						<view class="shortcutHeader">
							<view class="shortcutTitle">高佣精选</view>
							<view class="shortcutNote">
								<text>查看更多</text>
								<uni-icons type="right" color="#888888" size="24rpx"></uni-icons>
							</view>
						</view>
						<ol class="shortcutList">
							<li class="shortcutItem" v-for="(item, index) in selection.list" :key="index" v-if="index < 5">
								<image class="shortcutItemImage" :src="item.mainPic" mode="scaleToFill"></image>
								<view class="shortcutItemTitle" v-text="item.dtitle"></view>
							</li>
						</ol>
					</view>
				</view>
				<!-- 首页 实时榜单2 -->
				<view id="goodsTitle">好物推荐</view>
				<view id="goodsList">
					<view class="goodsItem" v-for="(item, index) in goods.list" :key="index">
						<image :src="item.mainPic" mode="scaleToFill"></image>
						<view class="goodsItemContent">
							<view class="goodsItemTitle" v-text="item.title"></view>
							<view class="goodsItemCouponInfo">
								<view class="goodsItemCouponTip">
									<text class="goodsItemSmallText">券后</text>
									<text class="goodsItemSmallText goodsItemColorText">￥</text>
									<text class="goodsItemColorText" v-text="item.actualPrice"></text>
								</view>
								<view class="goodsItemPrice">
									<text class="goodsItemPriceText">原价￥</text>
									<text class="goodsItemPriceText" v-text="item.originalPrice"></text>
								</view>
							</view>
						</view>
						<view class="goodsItemLabels">
							<view class="goodsItemLabelType" v-show="item.activityType != 1">
								<text v-if="item.activityType == 2">淘抢购</text>
								<text v-if="item.activityType == 3">聚划算</text>
							</view>
							<view class="goodsItemLabelCoupon">
								<text class="goodsItemLabelCouponTip">券</text>
								<text class="goodsItemLabelCouponPrice" v-text="item.couponPrice + '元'"></text>
							</view>
						</view>
						<view class="goodsItemSaleCount">
							<view>
								<text>月销</text>
								<text v-text="item.monthSales"></text>
								<text>+</text>
							</view>
							<view>
								<text>2H销</text>
								<text v-text="item.twoHoursSales"></text>
							</view>
						</view>
					</view>
				</view>
				<uni-load-more id="more" :status="status"></uni-load-more>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	
	import $ from "@/lib/jquery.min.js";
	
	import {
		getHomeInfo,
		getHalfPriceDay,
		getHistoryLowPriceList,
		getListHeightCommission,
		getRankingList
	} from "@/api/api.js";
	
	export default {
		name:"IndexSelect",
		props: {
			isFull: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			"couponStep.hide"(newVal) {
				this.$emit("fullChange", newVal);
			}
		},
		data() {
			return {
				couponStep: {
					height: 0,
					hide: false
				},
				carouse: {
					list: []
				},
				nav: {
					icons: [],
					smallIcons: []
				},
				halfPrice: {
					list: []
				},
				record: {
					list: []
				},
				selection: {
					list: []
				},
				goods: {
					page: 1,
					oldCount: 0,
					newCount: 0,
					list: []
				},
				status: "more"
			};
		},
		created() {
			this.getHomeInfo();
			this.getHalfPriceDay();
			this.getHistoryLowPriceList();
			this.getListHeightCommission();
			this.getRankingList();
		},
		methods: {
			scroll_1_lower() {
				if (this.status == "more") {
					this.status = "loading";
					getRankingList(8, ++this.goods.page, 20).then(res => {
						this.goods.oldCount = this.goods.list.length;
						res.data.forEach(item => {
							this.goods.list.push(item);
						});
						this.goods.newCount = this.goods.list.length;
						if (this.goods.oldCount == this.goods.newCount) {
							this.status = "noMore";
						} else {
							this.goods.oldCount = this.goods.newCount;
							this.status = "more";
						}
					}).catch(err => {
						console.log(err);
					})
				}
			},
			scroll_1(e) {
				if (!this.couponStep.height) {
					this.couponStep.height = $("#couponStep").height();
				}
				this.couponStep.hide = e.detail.scrollTop > 0;
			},
			getHomeInfo() {
				getHomeInfo().then(res => {
					this.carouse.list = res.data.w_banners;
					this.nav.icons = res.data.icons;
					this.nav.smallIcons = res.data.small_icons;
				}).catch(err => {
					console.log(err);
				})
			},
			getHalfPriceDay() {
				getHalfPriceDay(1).then(res => {
					this.halfPrice.list = res.data.list;
				}).catch(err => {
					console.log(err);
				})
			},
			getHistoryLowPriceList() {
				getHistoryLowPriceList(1, 10).then(res => {
					this.record.list = res.data.list;
				}).catch(err => {
					console.log(err);
				})
			},
			getListHeightCommission() {
				getListHeightCommission(1, 10).then(res => {
					this.selection.list = res.data.list;
				}).catch(err => {
					console.log(err);
				})
			},
			getRankingList() {
				this.goods.page = 1;
				getRankingList(8, this.goods.page, 20).then(res => {
					this.goods.list = res.data;
					this.goods.oldCount = this.goods.list.length;
				}).catch(err => {
					console.log(err);
				})
			},
		}
	}
</script>

<style>
	.swiper-item {
		height: 100%;
	}
	
	.swiper-item-view {
		overflow: hidden;
	}
	
	#carouse {
		margin: 20rpx;
		width: 710rpx;
		height: 280rpx; /* 0.393 * width */
		overflow: hidden;
		margin-top: 10rpx;
		border-radius: 20rpx;
		background-color: rgba(242, 23, 36, 0.1);
		box-shadow: 0 0 10rpx 3rpx rgba(242, 23, 36, 0.2);
	}
	
	.carouse-item {
		width: 100%;
		height: 100%;
	}
	
	.carouse-item image {
		width: 100%;
		height: 100%;
	}
	
	#nav {
		margin-left: 20rpx;
		margin-right: 20rpx;
		width: calc(100% - 40rpx);
	}
	
	#navMain {
		display: flex;
		justify-content: space-around;
	}
	
	.navMainItem {
		width: 142rpx;
		display: flex;
		color: #F21724;
		position: relative;
		align-items: center;
		flex-direction: column;
	}
	
	.navMainItem>image {
		width: 100rpx;
		height: 100rpx;
	}
	
	.navMainItem>text {
		font-size: 24rpx;
	}
	
	.nav-swiper-item {
		display: flex;
		flex-wrap: wrap;
	}
	
	#navSmall {
		margin-top: 5rpx;
	}
	
	#navSmall>swiper {
		height: 320rpx;
	}
	
	.navSmallItem {
		width: 142rpx;
		display: flex;
		color: #333333;
		position: relative;
		align-items: center;
		flex-direction: column;
	}
	
	.navSmallItem>image {
		width: 100rpx;
		height: 100rpx;
	}
	
	.navSmallItem>text {
		font-size: 24rpx;
	}
	
	#halfprice {
		display: flex;
		overflow: hidden;
		margin-left: 20rpx;
		margin-right: 20rpx;
		align-items: center;
		padding-right: 10rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		justify-content: space-between;
		box-shadow: 0 0 5rpx 2rpx rgba(128, 128, 128, 0.1);
	}
	
	#halfpriceTitle {
		width: 85rpx;
		height: 85rpx;
		display: flex;
		color: #FFFFFF;
		font-size: 26rpx;
		line-height: 30rpx;
		margin-right: 10rpx;
		align-items: center;
		padding-left: 15rpx;
		background-color: #F21724;
	}
	
	#halfprice>swiper {
		width: 100%;
		height: 85rpx;
		font-size: 26rpx;
		line-height: 85rpx;
	}
	
	.halfpriceItem {
		opacity: 0.8;
		color: #F21724;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	#shortcut {
		display: flex;
		margin: 20rpx;
		justify-content: space-between;
	}
	
	#recordLow {
		width: 345rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #fff;
		box-shadow: 0 0 5rpx 2rpx rgba(128, 128, 128, 0.1);
	}
	
	#selection {
		width: 345rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #fff;
		box-shadow: 0 0 5rpx 2rpx rgba(128, 128, 128, 0.1);
	}
	
	.shortcutHeader {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.shortcutTitle {
		font-size: 30rpx;
		font-weight: bold;
	}
		
	.shortcutNote {
		color: #888888;
		font-size: 24rpx;
	}
	
	.shortcutList {
		margin-left: 0;
		padding-left: 0;
		font-size: 24rpx;
		list-style-type: none;
	}
	
	.shortcutItem {
		display: flex;
		overflow: hidden;
		margin-top: 5rpx;
		margin-bottom: 5rpx;
		align-items: center;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.shortcutItemImage {
		width: 50rpx;
		height: 50rpx;
		min-width: 50rpx;
		margin-right: 5rpx;
	}
	
	.shortcutItemTitle {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	#goodsTitle {
		color: #333333;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 50rpx;
		text-align: center;
		margin-left: 20rpx;
		margin-right: 20rpx;
		font-family: '华文细黑';
	}
	
	#goodsList {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.goodsItem {
		width: 345rpx;
		margin: 20rpx;
		overflow: hidden;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		box-shadow: 0 0 5rpx 2rpx rgba(128, 128, 128, 0.1);
	}
	
	.goodsItem>image {
		width: 100%;
		height: 345rpx;
		vertical-align: bottom;
	}
	
	.goodsItem:nth-child(odd) {
		margin-right: 0rpx;
	}
	
	.goodsItem:nth-child(even) {
		margin-left: 0rpx;
	}
	
	.goodsItem:nth-child(n+3) {
		margin-top: 0rpx;
	}
	
	.goodsItemContent {
		margin: 15rpx;
	}
	
	.goodsItemTitle {
		font-size: 26rpx;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}
	
	.goodsItemCouponInfo {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.goodsItemCouponTip {
		font-size: 20rpx;
	}
	
	.goodsItemSmallText {
		font-size: 20rpx !important;
	}
	
	.goodsItemColorText {
		color: #F21724;
		font-size: 34rpx;
		font-weight: bold;
	}
	
	.goodsItemPrice {
		font-size: 22rpx;
		text-decoration-color: #CCCCCC;
		text-decoration-line: line-through;
	}
	
	.goodsItemPriceText {
		color: #CCCCCC;
	}
	
	.goodsItemLabels {
		display: flex;
		padding: 0 15rpx 15rpx 15rpx;
	}
	
	.goodsItemLabelType {
		color: #F21724;
		padding: 0 5rpx;
		font-size: 20rpx;
		border-radius: 5rpx;
	}
	
	.goodsItemLabelCoupon {
		padding: 0 5rpx;
		font-size: 20rpx;
		border-radius: 5rpx;
		background-image: linear-gradient(to right, #ff8873, #ff4f4f);
	}
	
	.goodsItemLabelCouponTip {
		width: 40rpx;
		color: #F21724;
		text-align: center;
		position: relative;
		border-radius: 5rpx;
		display: inline-block;
		background-color: #FFFFFF;
		transform: translateX(-1rpx);
	}
	
	.goodsItemLabelCouponTip::before {
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		content: "";
		height: 2rpx;
		position: absolute;
		background-image: linear-gradient(to right, #FF8672, #FF7567);
	}
	
	.goodsItemLabelCouponTip::after {
		left: 0rpx;
		width: 100%;
		content: "";
		bottom: 0rpx;
		height: 2rpx;
		position: absolute;
		background-image: linear-gradient(to right, #FF8672, #FF7567);
	}
	
	.goodsItemLabelCouponPrice {
		color: #FFFFFF;
		padding-left: 5rpx;
		padding-right: 5rpx;
	}
	
	.goodsItemSaleCount {
		display: flex;
		color: #888888;
		font-size: 20rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx;
		justify-content: space-between;
	}
	
	#more {
		margin: 0rpx auto;
		margin-bottom: 15rpx;
	}
</style>