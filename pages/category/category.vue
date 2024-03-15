<template>
	<view class="content">
		<uv-vtabs :list="list" :height="height" :chain="chain" keyName="cname" iconName="cpic" hdHeight="100rpx" barWidth="200rpx" @change="change">
			<template v-for="(item, index) in list">
				<uv-vtabs-item class="list" :index="index" :key="index">
					<view class="item-title" v-text="item.cname"></view>
					<view class="item-list">
						<view class="item" v-for="(item, index) in item.subcategories" :key="index" @click="detail(item)">
							<image class="item-icon" :src="item.scpic" mode="scaleToFill"></image>
							<view class="item-name" v-text="item.subcname"></view>
						</view>
					</view>
				</uv-vtabs-item>
			</template>
		</uv-vtabs>
	</view>
</template>

<script>
	
	import {
		getSuperCategory
	} from "@/api/api.js"
	
	
	export default {
		data() {
			return {
				chain: true,
				list: [],
				value: 0,
			}
		},
		computed: {
			height(){
				return uni.getSystemInfoSync().windowHeight// - uni.upx2px(160);
			}
		},
		watch: {
			chain() {
				this.current = 0;
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中'
			});
			getSuperCategory().then(res => {
				this.list = res.data;
				uni.hideLoading();
			}).catch(err => {
				console.log(err, "err");
				uni.hideLoading();
			})
		},
		methods: {
			change(index) {
				this.value = index;
			},
			detail(item) {
				uni.navigateTo({
					url: "/pages/category/goodsList?id=" + item.subcid + "&name=" + encodeURIComponent(item.subcname)
				})
			}
		}
	}
</script>

<style scoped lang="less">
.list {
	padding: 10rpx;
}

.item-title {
	text-align: center;
	line-height: 100rpx;
}

.item-list {
	display: flex;
	flex-wrap: wrap;
}

.item {
	margin: 10rpx;
	/* #ifdef APP */
	width: 161rpx;
	/* #endif */
	/* #ifdef H5 */
	width: 157rpx;
	/* #endif */
	display: flex;
	height: 200rpx;
	align-items: center;
	flex-direction: column;
	&-icon {
		width: 140rpx;
		height: 140rpx;
		vertical-align: bottom;
	}
	
	&-name {
		font-size: 25rpx;
		text-align: center;
	}
}
</style>
