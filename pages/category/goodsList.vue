<template>
	<view class="content">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				name: ""
			}
		},
		onLoad(op) {
			this.id = op.id;
			this.name = decodeURIComponent(op.name);
			uni.setNavigationBarTitle({
				title: this.name
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
