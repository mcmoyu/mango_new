<template>
	<view class="content">
		<scroll-view scroll-y="true" @scrolltolower="getGoodsList">
			<view id="goodsList">
				<view class="goodsItem" v-for="(item, index) in list" :key="index">
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
				<uni-load-more id="more" :status="status"></uni-load-more>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	
	import {
		getGoodsList
	} from "@/api/api.js";
	
	export default {
		data() {
			return {
				id: 0,
				name: "",
				list: [],
				page: 1,
				status: "nomore"
			}
		},
		onLoad(op) {
			this.id = op.id;
			if (op.name) {
				this.name = decodeURIComponent(op.name);
				this.$nextTick(() => {
					uni.setNavigationBarTitle({
						title: this.name
					});
				});
			}
			this.list = [];
			this.getGoodsList();
		},
		methods: {
			getGoodsList() {
				this.status = "loading"
				getGoodsList({
					pageId: this.page++,
					pageSize: 20,
					subcid: this.id
				}).then(res => {
					this.list = this.list.concat(res.data.list);
					if (this.list.length == res.data.totalNum) {
						this.status = "nomore";
					} else {
						this.status = "more";
					}
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped>
	scroll-view {
		height: 100%;
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
		color: #F59E00;
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
		color: #F59E00;
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
		color: #F59E00;
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
