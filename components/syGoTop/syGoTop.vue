<template>
	<view class="go-top" @click="go">
		<uni-icons type="arrow-up" size="35" color="#666"></uni-icons>
	</view>
</template>

<script lang="ts" setup>
	const go = () => {
		uni.pageScrollTo({
			scrollTop: 0
		})
	}
</script>

<style lang="scss">
	.go-top {
		position: fixed;
		right: 15rpx;
		bottom: 150rpx;
		border: 1px solid #c8c7cc;
		border-radius: 50%;
		background-color: #fff;
		opacity: 0.7; //0.3+0.4

		&:active {
			opacity: 1;
		}
	}
</style>
