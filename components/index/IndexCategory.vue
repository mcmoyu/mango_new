<template>
	<view>
		<view id="category">
			<view id="categoryTop"></view>
			<v-tabs v-model="category.index" :tabs="category.list" lineColor="#F59E00" activeColor="#F59E00"></v-tabs>
		</view>
	</view>
</template>

<script>
	
	import {
		getSuperCategory
	} from "@/api/api.js";
	
	export default {
		name:"IndexCategory",
		props: {
			defaultArr: {
				type: Array,
				default() {
					return ["精选"];
				}
			}
		},
		watch: {
			"category.index"(newVal) {
				this.$emit("change", newVal);
			}
		},
		data() {
			return {
				category: {
					index: 0,
					list: []
				},
			};
		},
		created() {
			this.getSuperCategory();
		},
		methods: {
			getSuperCategory() {
				getSuperCategory().then(res => {
					this.category.list = res.data.map(item => item.cname);
					this.defaultArr.reverse();
					this.defaultArr.forEach(item => {
						this.category.list.unshift(item);
					});
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style>
	#category {
		width: 100%;
		height: 85rpx;
		position: relative;
		padding: 10rpx 20rpx;
		background-color: #F6F6F6;
		border-radius: 30rpx 30rpx 0 0;
	}
	
	#categoryTop {
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 40rpx;
		position: absolute;
		background-size: 100%;
		background-repeat: no-repeat;
		background-image: url("../../static/index/categoryTop_Orange.png");
	}
</style>