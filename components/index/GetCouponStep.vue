<template>
	<view>
		<view id="couponStep" :class="{couponStepHide: isHide}">
			<image src="../../static/index/step.png" mode="widthFix" @click="toStrategy()"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"GetCouponStep",
		props: {
			isHide: {
				default: false,
				type: Boolean
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			toStrategy() {
				uni.navigateTo({
					url: "/pages/strategy/strategy"
				})
			},
		}
	}
</script>

<style>
	#couponStep {
		width: 100%;
		height: 65rpx;
		transition: 0.5s;
		padding: 0 20rpx;
		text-align: center;
		background-color: #F21724;
	}
	
	#couponStep image {
		width: 100%;
	}
	
	#couponStep.couponStepHide {
		height: 0rpx;
	}
</style>