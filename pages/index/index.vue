<template>
	<view class="content">
		<!-- 搜索栏 -->
		<SearchBar></SearchBar>
		<!-- 领券步骤 -->
		<GetCouponStep :isHide="couponStep.hide"></GetCouponStep>
		<!-- 分类 -->
		<IndexCategory :defaultArr="category.defArr" @change="categoryChange"></IndexCategory>
		<!-- 主视图Swiper -->
		<swiper id="swiperView" :class="{swiperViewFull: couponStep.hide}" :indicator-dots="false" :autoplay="false" :disable-touch="true" :current="category.index">
			<!-- 精选 -->
			<swiper-item>
				<IndexSelect class="swiper-item" @fullChange="fullChange"></IndexSelect>
			</swiper-item>
			<!-- 美食 -->
			<swiper-item>
				<view class="swiper-item">
					美食
				</view>
			</swiper-item>
			<!-- 居家日用 -->
			<swiper-item>
				<view class="swiper-item">
					居家日用
				</view>
			</swiper-item>
			<!-- 女装 -->
			<swiper-item>
				<view class="swiper-item">
					女装
				</view>
			</swiper-item>
			<!-- 美妆 -->
			<swiper-item>
				<view class="swiper-item">
					美妆
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	
	// import $ from "@/lib/jquery.min.js";
	
	import {
		
	} from "@/api/api.js";
	
	import SearchBar from "@/components/index/SearchBar.vue";
	import GetCouponStep from "@/components/index/GetCouponStep.vue";
	import IndexCategory from "@/components/index/IndexCategory.vue";
	import IndexSelect from "@/components/index/IndexSelect.vue";
	
	export default {
		components: {
			SearchBar,
			GetCouponStep,
			IndexCategory,
			IndexSelect
		},
		data() {
			return {
				couponStep: {
					height: 0,
					hide: false
				},
				category: {
					index: 0,
					// defArr: ["精选"]
				},
			}
		},
		onShow() {
		},
		onLoad() {
		},
		methods: {
			categoryChange(index) {
				this.category.index = index;
			},
			fullChange(isFull) {
				this.couponStep.hide = isFull;
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		overflow: hidden;
		background-color: #F6F6F6;
	}
	
	#swiperView {
		overflow: hidden;
		transition: 0.5s;
		height: calc(100% - 249rpx);
	}
	
	#swiperView.swiperViewFull {
		height: calc(100% - 185rpx);
	}
	
	.swiper-item {
		height: 100%;
	}
	
</style>
