<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
			activeColor="#137ef1"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">
				<uni-card isFull >
					<view class="timePickerBox">
						<uni-icons type="calendar" size="20"></uni-icons>
						<view class="timeBox">
							<picker mode="date" fields="month" :value="date" @change="bindDateChange">
								<view class="uni-input">{{date}}</view>
							</picker>
							<uni-icons type="bottom" size="20"></uni-icons>
						</view>
					</view>
				</uni-card>
				<view class="pointCard">
					<uni-card is-full>
							<view class="UserInfoBox">
								<image src="../../../static/logo.jpg" mode=""></image>
								<view class="name">程德坤</view>
							</view>
							<view class="contentBox">
								<view class="detail">
									发表专利论文
								</view>
								<view class="otherBox">
									<view class="time">
										2022-04-14
									</view>
									<view class="points">
										+20
									</view>
								</view>
							</view>
						</uni-card>
					</view>
				</view>
				
			<view v-show="current === 1">
				选项卡2的内容
			</view>
		</view>
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
		current,
		items,
		date
	} = toRefs(reactive({
		current: 0,
		date: '',
		items: ['个人', '全部'],
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


	const onClickItem = (e : any) => {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex;
		}
	}
</script>

<style  lang="scss">
	page{
		background-color: #f2f2f2 ;
	}
	.timePickerBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #6a6a6a;
		padding: 10px;

		.timeBox {
			display: flex;

			.uni-input {
				padding-right: 5px;
				font-size: 14px;
			}
		}
	}
.pointCard{
	margin: 10px 0;
}
	.UserInfoBox {
		display: flex;
		align-items: center;
		padding-bottom: 10px;
		border-bottom: 1px solid #c5c5c7;
		image {
			width: 25px;
			height: 25px;
			border-radius: 50%;
			margin-right: calc(8px * 2);
		}
		.name {
			font-weight: bold;
			font-size: 20px;
		}
	}

	.contentBox {
		margin-top: calc(8px * 2);

		.detail {
			font-weight: bold;
			font-size: 15px;
			margin-bottom: 8px;
		}

		.otherBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: calc(16px - 2px);
			.time {
				color: #6c757d;
			}
			.points {
				color: #137ef1;
			}
		}
	}
</style>