<template>
	<view>
		<view class="cardbox">
			<view class="topbox">
				<text>{{userInfo.UserName}}</text>
				<view class="firmbox">
					<text>航天世源</text>
					<image src="https://www.sanchayou.cn:8070/public/images/uniApp/static/uni-center/icons/icon_attestation.png" mode="widthFix">
					<!-- <image src="http://localhost:8090/public/images/uniApp/static/uni-center/icons/icon_attestation.png" mode="widthFix"> -->
					</image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		onMounted,
		reactive,
		toRefs,
	} from 'vue'

	import {
		userStore
	} from '@/store/user-store'
	import {
		storeToRefs
	} from "pinia"
	const userstore = userStore()
	const {
		userInfo,
	} = storeToRefs(userstore);
	onMounted(() => {
		console.log(userInfo.value);
	})
	const {

	} = toRefs(reactive({

	}))
</script>

<style lang="scss">
	// http://localhost:8090/
	.cardbox {
		background: url('https://www.sanchayou.cn:8070/public/images/uniApp/static/uni-center/img/businesscard.jpg') no-repeat;
		// background: url('http://localhost:8090/public/images/uniApp/static/uni-center/img/businesscard.jpg') no-repeat;
		background-size: 100% auto;
		border-radius: 10px;
		margin: 20px;
		box-shadow: 0 5rpx 20rpx rgba(0, 0, 0, 0.1);
		padding: 40rpx;
		min-height: 300rpx;
		.topbox {
			display: flex;
			flex-direction: column;
			text {
				color: white;
				font-size: 40rpx;
				font-weight: bold;
				// margin-bottom: 20rpx;
			}

			.firmbox {
				margin-top: 10px;
				display: flex;
				align-items: center;
				text {
					font-size: 28rpx;
					padding-right: 10px;
				}
				image {
					width: 20px;
				}
			}
		}
	}
</style>