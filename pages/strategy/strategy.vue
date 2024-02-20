<template>
	<view class="content">
		<scroll-view id="scrollView" scroll-y="true">
			<view>
				<image @load="loadSuccess" id="help" src="../../static/help.jpg" mode="widthFix"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		created() {
			uni.showLoading({
				mask: true,
				title: "正在加载..."
			});
		},
		methods: {
			loadSuccess() {
				uni.hideLoading();
			}
		}
	}
</script>

<style>
	#help {
		width: 100%;
		vertical-align: bottom;
	}
	
	#scrollView {
		width: 100%;
		height: 100%;
	}
</style>
