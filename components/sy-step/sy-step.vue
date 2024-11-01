<template>
	<view class="steps">
		<view class="step" v-for="(item, i) in list" :key="i">
			<!-- 左侧 -->
			<view class="step_left">
				<view class="leftBox">
					<span class="name">{{ item.UserName }}</span>
					<span class="time">{{ item.createdAt }}</span>
				</view>

			</view>
			<!-- 中部 -->
			<view class="step_mid">
				<view class="step_dot" :style="{ backgroundColor:  activeColor }">
					{{ stepType === 'number' ? i + 1 : '' }}
				</view>
				<template v-if="i < list.length - 1">
					<view class="step_line" :style="{ backgroundColor:  activeColor}"></view>
				</template>
			</view>
			<!-- 右侧 -->

			<view class="step_right" @click="jumpDetail(item)">
				<view class="step_idea">
					<span>{{ item.Action}}</span>

				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	//设置传入属性
	import { WorkOrderHistory } from '../../api/workOrderService';
	import { onMounted, reactive, toRefs } from 'vue';
	import { TimeUtil } from '../../util/date';
	import { GetUserInfoUtil } from '../../util/getUserInfo';
	interface ItemProps {
		stepType : string;
		activeColor : string;
		Id : number
	}
	const props = withDefaults(defineProps<ItemProps>(), {
		activeColor: '#2a62ed',
		stepType: 'number'
	});
	const { list } = toRefs(reactive({
		list: [] as any
	}))
	// 设置事件
	interface EmitEvent {
		(e : "itemClick", item : object) : void; // 当选项被点击时会触发该事件
	}
	const jumpDetail = async (workHistory:any) => {
		console.log(workHistory);
		if (workHistory.ChildrenWorkOrderId != null) {
			uni.navigateTo({
				url: '/page_workbench/TaskManagement/detailWorkOrder/detailWorkOrder?Id=' + workHistory.ChildrenWorkOrderId
			});
		} else {
			uni.navigateTo({
				url: '/page_workbench/TaskManagement/detailWorkOrder/detailWorkOrder?workOrderId=' + workHistory.WorkOrderId + '&ExecuteId=' + workHistory.ExecuteId
			});
		}

	};
	const emit = defineEmits<EmitEvent>();
	onMounted(async () => {
		const historyList : any = await WorkOrderHistory.GetWorkOrderHistoryById({ WorkOrderId: props.Id })
		for (let item of historyList) {
			item.createdAt = TimeUtil.getFomatTime(item.createdAt)
			item.UserName = await GetUserInfoUtil.getUserInfo(item.UserId)
		}
		list.value = historyList
		console.log(list.value);
	})
</script>

<style lang="scss" scoped>
	.steps {
		.step {
			display: flex;

			.step_left {
				width: 150rpx;
				margin-top: 5rpx;
				font-size: 26rpx;
				line-height: 36rpx;
				text-align: right;

				.leftBox {
					display: flex;
					flex-direction: column;

					.name {
						font-size: 16px;
						/* 名字的字号 */
						font-weight: bold;
						/* 名字的字重 */
						color: #333;
						/* 名字的颜色 */
					}

					.time {
						font-size: 12px;
						/* 时间的字号 */
						color: #999;
						/* 时间的颜色 */
					}

				}
			}

			.step_mid {
				width: 50rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				margin: 0 25rpx;

				.step_dot {
					width: 40rpx;
					height: 40rpx;
					background: #dcdcdc;
					border: 5rpx solid #f5f5f5;
					border-radius: 50%;
					color: #ffffff;
					font-size: 28rpx;
					text-align: center;
					line-height: 40rpx;
				}

				.active_dot {
					background: #2a62ed;
					border: 5rpx solid #e3ebff;
				}

				.step_line {
					width: 4rpx;
					height: 160rpx;
					background-color: #eeeeee;
				}

				.active_line {
					background: #2a62ed;
				}
			}

			.annexBOx {
				display: block;
			}

			.step_right {
				width: 430rpx;
				height: fit-content;
				padding: 25rpx 30rpx;
				margin-top: -14rpx;
				background-color: #f8f8f8;
				border-radius: 10rpx;
				display: flex;
				flex-wrap: wrap;
				align-content: center;

				view {
					width: 100%;
				}



				.step_idea {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 12px;
					// line-height: 1.5;
					color: #333;
				}
			}
		}
	}
</style>