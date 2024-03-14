<template>
	<view class="content">
		<view id="main">
			<view id="questionTypeView">
				<view class="questionType" v-for="(item, index) in question.list" :key="item.name"
					:class="{questionTypeSelect: index == question.index}" @click="questionTypeDetail(index)">
					<text v-text="item.name"></text>
				</view>
			</view>
			<view id="questionView">
				<view class="question" v-for="(item, index) in question.list[question.index].list" :key="index" @click="questionDetail(item)">
					<text v-text="item.name"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				question: {
					index: 0,
					list: [
						{
							name: "热门问题",
							list: [
								{
									id: 1,
									name: "怎么将商品分享给朋友？"
								},
								{
									id: 2,
									name: "怎么联系客服？"
								},
								{
									id: 3,
									name: "如何查看淘宝商品是否有优惠券？"
								},
								{
									id: 4,
									name: "在哪里查看我下过的订单？"
								},
								{
									id: 5,
									name: "如何查看商品物流信息？"
								},
								{
									id: 6,
									name: "优惠券的用途是什么？"
								},
								{
									id: 7,
									name: "如何领取优惠券？"
								},
								{
									id: 8,
									name: "如何使用优惠券下单？"
								},
								{
									id: 9,
									name: "领取优惠券时，为什么提示“券已失效”？"
								},
								{
									id: 10,
									name: "为什么付款价与标注的券后价不一致？"
								}
							]
						},
						{
							name: "产品功能",
							list: [
								{
									id: 11,
									name: "怎么收藏商品？怎么查看收藏的商品？"
								},
								{
									id: 1,
									name: "怎么将商品分享给朋友？"
								},
								{
									id: 12,
									name: "在哪里查看我浏览过的商品？"
								},
								{
									id: 2,
									name: "怎么联系客服？"
								},
								{
									id: 3,
									name: "如何查看淘宝商品是否有优惠券？"
								}
							]
						},
						{
							name: "关于订单",
							list: [
								{
									id: 13,
									name: "如何联系商品卖家？"
								},
								{
									id: 4,
									name: "在哪里查看我下过的订单？"
								},
								{
									id: 14,
									name: "如何申请退换货？"
								},
								{
									id: 15,
									name: "如何修改收货地址？"
								},
								{
									id: 5,
									name: "如何查看商品物流信息？"
								},
								{
									id: 16,
									name: "商品一直未发货/未收到货怎么办？"
								},
								{
									id: 17,
									name: "商品使用有问题怎么办？"
								},
								{
									id: 18,
									name: "购买“第二件0元”的商品，为什么最后只收到1件？"
								}
							]
						},
						{
							name: "关于优惠",
							list: [
								{
									id: 6,
									name: "优惠券的用途是什么？"
								},
								{
									id: 19,
									name: "什么样的商品有优惠券？"
								},
								{
									id: 7,
									name: "如何领取优惠券？"
								},
								{
									id: 8,
									name: "如何使用优惠券下单？"
								},
								{
									id: 9,
									name: "领取优惠券时，为什么提示“券已失效”？"
								},
								{
									id: 20,
									name: "领取优惠券时，为什么提示“系统繁忙”？"
								},
								{
									id: 21,
									name: "领取优惠券时，为什么提示“领取已达上限”？"
								},
								{
									id: 22,
									name: "优惠券可以和其他优惠叠加吗？"
								},
								{
									id: 10,
									name: "为什么付款价与标注的券后价不一致？"
								},
								{
									id: 23,
									name: "领取了优惠券但无法使用？"
								}
							]
						}
					]
				}
			}
		},
		methods: {
			questionTypeDetail(index) {
				this.question.index = index;
			},
			questionDetail(item) {
				uni.navigateTo({
					url: "/pages/help/helpcenter?id=" + item.id
				})
			}
		}
	}
</script>

<style>
#main {
	width: 100%;
	height: 100%;
	display: flex;
}

#questionTypeView {
	width: 250rpx;
	background-color: #F0F0F0;
}

.questionType {
	width: 100%;
	height: 120rpx;
	font-size: 28rpx;
	position: relative;
	padding-left: 25rpx;
	line-height: 120rpx;
}

.questionTypeSelect {
	color: #F59E00;
	font-weight: bold;
	background-color: #FFFFFF;
}

.questionTypeSelect::before {
	top: 50%;
	left: 0rpx;
	content: "";
	width: 8rpx;
	height: 40rpx;
	margin-top: -20rpx;
	position: absolute;
	background-color: #F59E00;
}

#questionView {
	width: 500rpx;
}

.question {
	padding: 20rpx;
	font-size: 26rpx;
	line-height: 50rpx;
	position: relative;
}

.question:nth-child(n+2)::after {
	top: 0rpx;
	left: 20rpx;
	content: "";
	height: 1rpx;
	width: 460rpx;
	position: absolute;
	background-color: #ebedf0;
}
</style>
