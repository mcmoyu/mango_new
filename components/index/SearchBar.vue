<template>
	<view>
		<view id="searchBar">
			<image id="turn" src="/static/index/turnIcon.png" mode="scaleToFill" @click="toTurn"></image>
			<view id="search" @click="toSearchView()">
				<uni-icons id="searchIcon" type="search" color="#F59E00" size="40rpx"></uni-icons>
				<view id="placeholder">
					<text v-text="search.text.prefix"></text>
					<view id="searchIcons">
						<image class="searchIcon" v-for="item in search.icons" :src="item" mode="scaleToFill"></image>
					</view>
					<text v-text="search.text.suffix"></text>
				</view>
			</view>
			<view id="help">
				<uni-icons type="help" color="#FFFFFF" size="60rpx" @click="toHelp()"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"SearchBar",
		data() {
			return {
				search: {
					text: {
						prefix: "输入商品标题搜索",
						suffix: "隐藏优惠",
					},
					icons: [
						"/static/index/icon/taobaoIcon.png",
						"/static/index/icon/jingdongIcon.png",
						"/static/index/icon/pinduoduoIcon.png",
						"/static/index/icon/douyinIcon.png",
						"/static/index/icon/weipinhuiIcon.png"
					]
				}
			};
		},
		methods: {
			toTurn() {
				uni.navigateTo({
					url: "/pages/turnLink/turnLink"
				})
			},
			toSearchView() {
				uni.navigateTo({
					url: "/pages/search/search"
				});
			},
			toHelp() {
				uni.navigateTo({
					url: "/pages/help/help"
				})
			}
		}
	}
</script>

<style lang="less">
	#searchBar {
		height: 100rpx;
		display: flex;
		padding: 0 20rpx;
		align-items: center;
		background-color: #F59E00;
	}
	
	#turn {
		width: 50rpx;
		height: 50rpx;
		margin-right: 10rpx;
		vertical-align: bottom;
	}
	
	#search {
		flex: 1;
		height: 60rpx;
		color: #828282;
		padding: 10rpx;
		font-size: 26rpx;
		position: relative;
		align-items: center;
		border-radius: 50rpx;
		background-color: #EEEEEE;
	}
	
	#searchIcon {
		top: 10rpx;
		height: 60rpx;
		position: absolute;
	}
	
	#placeholder {
		flex: 1;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 100%;
		display: flex;
		position: absolute;
		align-items: center;
		justify-content: center;
	}
	
	#searchIcons {
		margin-left: 5rpx;
		margin-right: 5rpx;
		transform: translateY(3rpx);
	}
	
	.searchIcon {
		width: 26rpx;
		height: 26rpx;
		margin-left: 2rpx;
		margin-right: 2rpx;
		vertical-align: baseline;
	}
	
	#help {
		margin-left: 10rpx;
	}
</style>