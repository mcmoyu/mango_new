<template>
	<view id="float">
		<view id="floatView" @click="toTurnLink()" :style="'top:' + floatLogo.location.now.y + 'px; left:' + floatLogo.location.now.x + 'px;'"
			@touchstart="floatStart" @mousedown="floatStart" @touchmove.stop="floatMove" @mousemove.stop="floatMove" @touchend="floatEnd" @touchcancel="floatEnd" @mouseup="floatEnd">
			<image class="floatLogo" src="../static/floatLogo.png" mode="scaleToFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"FloatBtn",
		data() {
			return {
				domWidth: 0,
				domHeight: 0,
				floatLogo: {
					space: 10,
					topSpace: 150,
					bottomSpace: 80,
					isMove: false,
					inter: 0,
					width: 0,
					location: {
						old: {
							x: 0,
							y: 0,
							X: 0,
							Y: 0
						},
						new: {
							x: 0,
							y: 0
						},
						now: {
							x: "calc(100% - 10)",
							y: "calc(100% - 80)"
						}
					}
				},
			};
		},
		mounted() {
			let query = uni.createSelectorQuery().in(this);
			query.select("#float").boundingClientRect();
			query.exec(res => {
				this.domWidth = res[0].width;
				this.domHeight = res[0].top;
			});
			query.select("#floatView").boundingClientRect();
			query.exec(res => {
				this.floatLogo.width = res[1].width;
			});
		},
		methods: {
			toTurnLink() {
				uni.navigateTo({
					url: "/pages/turnLink/turnLink"
				})
			},
			floatStart(e) {
				this.floatLogo.isMove = true;
				this.floatLogo.location.old.x = e.touches.length > 0 ? e.touches[0].pageX : e.pageX;
				this.floatLogo.location.old.y = e.touches.length > 0 ? e.touches[0].pageY : e.pageY;
				this.floatLogo.location.old.X = e.currentTarget.offsetLeft;
				this.floatLogo.location.old.Y = e.currentTarget.offsetTop;
			},
			floatMove(e) {
				if (this.floatLogo.isMove) {
					this.floatLogo.location.new.x = e.touches.length > 0 ? e.touches[0].pageX : e.pageX;
					this.floatLogo.location.new.y = e.touches.length > 0 ? e.touches[0].pageY : e.pageY;
					this.floatLogo.location.now.x = this.floatLogo.location.old.X + (this.floatLogo.location.new.x - this.floatLogo.location.old.x);
					this.floatLogo.location.now.y = this.floatLogo.location.old.Y + (this.floatLogo.location.new.y - this.floatLogo.location.old.y);
					// console.log(uni.getSystemInfoSync().safeArea.height, this.tabbarHeight,  this.floatLogo.width);
					if (this.floatLogo.location.now.y >= uni.getSystemInfoSync().safeArea.height - this.tabbarHeight - this.floatLogo.width) {
						this.floatLogo.location.now.y = uni.getSystemInfoSync().safeArea.height - this.tabbarHeight - this.floatLogo.width;
					}
					if (this.floatLogo.location.now.y <= uni.getSystemInfoSync().statusBarHeight) {
						this.floatLogo.location.now.y = uni.getSystemInfoSync().statusBarHeight;
					}
					if (this.floatLogo.location.now.x <= this.floatLogo.space) {
						this.floatLogo.location.now.x = this.floatLogo.space;
					}
					if (this.floatLogo.location.now.x >= this.domWidth - this.floatLogo.width - this.floatLogo.space) {
						this.floatLogo.location.now.x = this.domWidth - this.floatLogo.width - this.floatLogo.space;
					}
					if (this.floatLogo.location.now.y <= this.floatLogo.topSpace) {
						this.floatLogo.location.now.y = this.floatLogo.topSpace;
					}
					if (this.floatLogo.location.now.y >= this.domHeight - this.floatLogo.width - this.floatLogo.bottomSpace) {
						this.floatLogo.location.now.y = this.domHeight - this.floatLogo.width - this.floatLogo.bottomSpace;
					}
					this.floatLogo.location.old.x = this.floatLogo.location.new.x;
					this.floatLogo.location.old.y = this.floatLogo.location.new.y;
					this.floatLogo.location.old.X = this.floatLogo.location.now.x;
					this.floatLogo.location.old.Y = this.floatLogo.location.now.y;
				}
			},
			floatEnd(e) {
				this.floatLogo.isMove = false;
				if (this.floatLogo.location.now.x > this.domWidth / 2 - this.floatLogo.width / 2) { // 右
					this.moveToLocation(this.domWidth - this.floatLogo.width - this.floatLogo.space);
				} else { // 左
					this.moveToLocation(this.floatLogo.space);
				}
			},
			moveToLocation(x) {
				this.floatLogo.inter && clearInterval(this.floatLogo.inter);
				this.floatLogo.inter = setInterval(() => {
					if (this.floatLogo.location.now.x > x) {
						this.floatLogo.location.now.x-=5;
						if (parseInt(this.floatLogo.location.now.x) <= x) {
							clearInterval(this.floatLogo.inter);
							this.floatLogo.location.now.x = x;
						}
					} else {
						this.floatLogo.location.now.x+=5;
						if (parseInt(this.floatLogo.location.now.x) >= x) {
							clearInterval(this.floatLogo.inter);
							this.floatLogo.location.now.x = x;
						}
					}
				}, 10);
			}
		}
	}
</script>

<style scoped>
#floatView {
	width: 85rpx;
	right: 15rpx;
	z-index: 999;
	height: 85rpx;
	bottom: 100rpx;
	color: #FFFFFF;
	position: fixed;
	border-radius: 50%;
	background-color: #FFFFFF;
	box-shadow: 0 0 5rpx 2rpx rgba(245, 158, 0, 0.5);
}

#floatView::after {
	left: 0;
	width: 100%;
	bottom: -30rpx;
	color: #F59E00;
	font-size: 20rpx;
	text-align: center;
	content: "一键转链";
	position: absolute;
	text-shadow: 0 0 10rpx #F59E00;
}

.floatLogo {
	width: 100%;
	height: 100%;
	vertical-align: bottom;
}
</style>