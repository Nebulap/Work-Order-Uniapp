<template>
	<view>
		<uni-card>
			<view class="rankBox">
				<view class="right-box">
					<view class="title">
						排名
					</view>
					<image class="avatar" src="../../../static/logo.jpg" mode="aspectFit"></image>
					<view class="name">
						蔡徐坤
					</view>
				</view>
				<view class="left-box">
					<image class="avatar" src="../../../static/icons/icon_jiangbai.png" mode="aspectFit"></image>
					<view class="num">
						第三名
					</view>
					<view class="points">
						244
					</view>
				</view>
			</view>
		</uni-card>
		<view class="filterBox">
			<uni-data-picker placeholder="请选择部门" popup-title="请选择部门" :localdata="dataTree" v-model="DisposeDepartment"
				:clear-icon="false">
			</uni-data-picker>
			<view class="timeBox">
				<picker mode="date" fields="month" :value="date" @change="bindDateChange">
					<view class="uni-input">{{date}}</view>
				</picker>
				<uni-icons type="bottom" size="20"></uni-icons>
			</view>
		</view>
		<uni-list>
			<uni-list-item title="刘佳琦" showArrow thumb="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				thumb-size="sm" rightText="344" />
			<uni-list-item title="写进" showArrow thumb="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				thumb-size="sm" rightText="244" />
			<uni-list-item title="蔡徐坤" showArrow thumb="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				thumb-size="sm" rightText="244" />
		</uni-list>
		<uni-list>
			<uni-list-item showArrow title="周杰伦" rightText="244">
				<template v-slot:header>
					<view class="rank">4</view>
				</template>
			</uni-list-item>
			<uni-list-item showArrow title="写进" rightText="244">
				<template v-slot:header>
					<view class="rank">5</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		toRefs,
	} from 'vue'
	import {
		onShow
	} from "@dcloudio/uni-app";
	let {
		dataTree,
		DisposeDepartment,
		date
	} = toRefs(reactive({
		dataTree: [],
		date: '',
		DisposeDepartment: 0
	}))

	onShow(() => {
		date.value = getCurrentMonth()
	})
	const bindDateChange = (e : any) => {
		date.value = e.target.value
	}
	const getCurrentMonth = () => {
		const date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		month = month > 9 ? month : '0' + month
		return `${year}-${month}`
	}
</script>

<style scoped lang="scss">
	.rankBox {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.right-box {
			display: flex;
			align-items: center;

			.title {
				font-size: 14px;
				color: #b4c9ea;
				// width: 55rpx;
				border-right: 2px solid #ccc;
				padding-right: 10px;
			}

			.avatar {
				padding-left: 10px;
				width: 30px;
				height: 30px;
				border-radius: 50%;
				margin-right: 10px;
			}

			.name {
				font-size: 16px;
			}
		}

		.left-box {
			display: flex;
			align-items: center;


			.avatar {
				width: 25px;
				height: 25px;
				margin-right: 10px;
			}

			.num {
				font-size: 16px;
				color: #5aa1f0;
				border-right: 2px solid #ccc;
				padding-right: 10px;
			}

			.points {
				padding-left: 10px;
				font-size: 16px;
				color: #5aa1f0;
			}
		}
	}

	.filterBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #e5e5e5;

		uni-data-picker {
			flex: 1;
			padding-left: 20px;
		}

		.timeBox {
			padding: 0 20px;
			display: flex;
		}
	}

	.rank {
		margin-right: 55rpx;
		color: #bfbfbf;
	}
</style>