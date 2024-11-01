<template>
	<view>
		<view class="top-bar">
			<view class="search-bar" @click="goToSearch">
				<input disabled class="input" type="text" placeholder="开始搜索">
				<image class="logo" src="/static/logo.png" mode="widthFix" />
				<view class="search-icon">
					<!-- 大多数扩展组件 或 自定义组件都是没有class/@click属性的 -->
					<uni-icons type="search" size="24"></uni-icons>
				</view>
			</view>
			<!-- 右侧的登录链接 -->
			<navigator url="../../page_me/loginMain/loginMain" class="link">登录</navigator>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		toRefs,
		onMounted,

	} from 'vue'

	const {

	} = toRefs(reactive({

	}))
	onMounted(() => {

	})
	const goToSearch = () => {
		uni.navigateTo({
			url:"/page_index/searchFile/searchFile"
		})
	}
</script>


<style lang="scss">
	.top-bar {
		display: flex;
		padding: 15px;
		align-items: center;
		padding-top: 180rpx;

		.search-bar {
			flex: 1;
			margin: 0 8px;
			position: relative;

			/*相对定位的父元素，为绝对定位的子元素提供定位参照物*/
			.input {
				background-color: #fff;
				text-align: center;
				padding: 20rpx;
				border-radius: 50rpx;
				font-size: 14px;
			}

			.logo {
				position: absolute;
				left: 20rpx;
				top: calc(50% - 50rpx / 2);
				width: 50rpx;
			}

			.search-icon {
				position: absolute;
				right: 20rpx;
				top: calc(50% - 48rpx / 2);
			}
		}

		.link {
			color: #fff;
			font-size: 16px;
		}
	}
</style>