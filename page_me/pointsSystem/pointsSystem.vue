<template>
	<uni-card>
		<view class="points-card">
			<view class="top-box">
				<view class="name">
					您好！陈德坤
				</view>
				<view class="time">
					2023年5月
				</view>
			</view>
			<view class="bottom-box">
				<view class="topBox">
					<text>本月积分</text>
					<uni-icons type="right" size="18" color="#137ef1"></uni-icons>
				</view>
				<view class="points-count">
					2000
				</view>
			</view>
		</view>
	</uni-card>
	<view class="noticeBarCard">
		<uni-notice-bar show-get-more show-icon scrollable text="2023.5.10 陈德坤:因发表专利+40分" @getmore="getMore"
			background-color="#fff" />
	</view>
	<uni-card>
		<view class="topTitle">
			<uni-section title="奖扣" type="line"></uni-section>
			<uni-icons type="help" size="20" color="#137ef1"></uni-icons>
		</view>
		<sy-grid :gridList="pointsList"></sy-grid>
	</uni-card>
</template>

<script lang='ts' setup>
	import {
		reactive,
		toRefs,
	} from 'vue'
	import {
		onShow
	} from "@dcloudio/uni-app";
	import workbenchService from '@/api/workbenchService'

	let {
		pointsList,
	} = toRefs(reactive({
		pointsList: [{
				"text": '奖扣',
				"url": '../../static/icons/icon_jiangpai.png',
				"to": './pointsBonus/pointsBonus'
			},
			{
				"text": '排行榜',
				"url": '../../static/icons/iocn_rank.png',
				"to": './pointsRanking/pointsRanking'
			}
		],
	}))

	onShow(() => {

	})
</script>


<style lang="scss" scoped>
	.points-card {
		background-color: #e8efff;
		border-radius: 10px;

		.top-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px 10px;

			.name {
				font-weight: bold;
				color: black;
			}

			.time {
				color: black;
			}
		}

		.bottom-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-bottom: 20px;

			.topBox {
				display: flex;

				text {
					font-weight: bold;
					color: #137ef1;
				}
			}

			.points-count {
				font-size: 24px;
				font-weight: bold;
				color: #137ef1;
			}
		}
	}

	.noticeBarCard {
		margin: 0px 15px;
		box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.08);
	}

	.topTitle {
		border-bottom: 1px solid #e8efff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>