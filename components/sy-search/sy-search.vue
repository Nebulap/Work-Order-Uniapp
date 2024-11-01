<template>
	<view class="top-bar">
		<uni-icons type="bars" size="30" color="#fff" @click="showMenu" />
		<view class="search">
			<uni-data-select v-model="value" :localdata="range" @change="SelectChange" :clear="false"
				style="background-color: #fff;">
			</uni-data-select>
			<view class="middle">
				<input type="text" placeholder="请选择类型搜索" class="input" :disabled="isread">
			</view>
		</view>
		<uni-icons type="search" size="30" color="#fff" style="margin-right: 50px;"></uni-icons>
	</view>
	<uni-drawer ref="menu">
		<view style="padding:30rpx;">
			<text>功能菜单</text>
			<uni-list>
				<!-- link：显示右侧的箭头、增加点击反馈动画、指定跳转方式 -->
				<!-- to：指定跳转地址 -->
				<uni-list-item title="首页" link="switchTab" to="/pages/index/index" />
				<uni-list-item title="工作台" link="switchTab" to="/pages/workbench/workbench" />
				<uni-list-item title="我的" link="switchTab" to="/pages/me/me" />
			</uni-list>
			<button style="margin-top: 200rpx;" size="mini" type="primary" @click="hideMenu">关闭</button>
		</view>
	</uni-drawer>
</template>

<script setup lang="ts">
	import {
		reactive,
		toRefs,
		onMounted,
		getCurrentInstance,
	} from 'vue'
	let currentInstance = ''
	const {
		userInput,
		isread,
		range
	} = toRefs(reactive({
		userInput: '',
		isread: true,
		range: [{
				value: 1,
				text: "批次"
			},
			{
				value: 2,
				text: "产品"
			},
			{
				value: 3,
				text: "日期"
			},
		],
	}))

	onMounted(() => {
		currentInstance = getCurrentInstance()
	})
	const showMenu = () => {
		currentInstance.ctx.$refs.menu.open()
	}
	const hideMenu = () => {
		currentInstance.ctx.$refs.menu.close()
	}
	// 开始搜索
	const beginSearch = (res: any) => {
		uni.showToast({
			title: '搜索：' + res.value,
			icon: 'none'
		})
	}
	// 清楚搜索
	const clearSearch = () => {

	}
	// 下拉框数值发生改变
	const SelectChange = (e: any) => {
		// console.log(e)
		if (!!e) {
			isread.value = !isread
		}
	}
</script>

<style lang="scss">
	.top-bar {
		background-color: #0aa1ed;
		height: 90rpx;
		display: flex;
		align-items: center;
		.search {
			display: flex;
			align-items: center;
			flex: 1;
			margin-left: 25px;
			.middle {
				display: flex;
				align-items: center;
				.input {
					width: 200px;
					font-size: 13px;
					text-align: center;
					border: 1px solid #fff;
					height: 33px;
					color: #585858;
					background-color: #fff;
				}
			}
		}
	}
</style>
