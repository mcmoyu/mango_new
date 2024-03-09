<script>
	export default {
		onLaunch: function() {
			uni.BASE_API = "https://mangoapi.ittu.cn";
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	* {
		box-sizing: border-box;
	}
	
	page {
		width: 100%;
		height: 100%;
	}
	
	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #F6F6F6;
	}
	
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>
