<template>
	<sy-taskDetailCard :Id='Id'></sy-taskDetailCard>
	<view class="bottom-actions">
		<view class="bottomItem" style="border-right: 1px solid black;" @click="claimTask"><uni-icons
				type="checkmarkempty" color="#3c9ee1" /><text style="color:#3c9ee1;padding-left: 5px;">认领工单</text>
		</view>
		<view class="bottomItem" @click="declineTask"><uni-icons type="closeempty" color="#ef5350" /><text
				style="color:#ef5350;padding-left: 5px;">拒绝工单</text></view>
	</view>
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog mode="input" title="拒接理由" placeholder="请输入内容"
			@confirm="dialogInputConfirm"></uni-popup-dialog>
	</uni-popup>
</template>

<script lang="ts" setup>
	import { reactive, toRefs } from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import { WorkOrderService, WorkOrderTaskCloseDetail } from '../../../api/workOrderService';
	import { updateWorkOrderTaskDto } from '../../../model/workbench/WorkOrder/Dto/updateworkordertask.dto';
	import { AddWorkOrderTaskCloseDetailDto } from '../../../model/workbench/WorkOrder/Dto/add.workordertaskclosedetail.dto';
	import {
		userStore
	} from '../../../store/user-store'
	import {
		storeToRefs
	} from "pinia"
	const userstore = userStore()
	const {
		userInfo,
	} = storeToRefs(userstore);

  const { inputDialog, Id } = toRefs(reactive({
    inputDialog: false,
    Id: 0
  }))

	onLoad((res : any) => {
		const reqData = JSON.parse(decodeURIComponent(res.item));
		console.log(reqData);
		Id.value = reqData.Id
	})

	const claimTask = async () => {
		let taskData = new updateWorkOrderTaskDto()
		taskData.Id = Id.value
		taskData.State = 2
		let updateData = await WorkOrderService.UpdateWorkOrder(taskData)

		if (updateData.code == 200) {
			uni.showToast({
				title: updateData.msg
			})
			uni.navigateBack();
		}

	}
	const declineTask = () => {
		inputDialog.value.open()
	}
	// 定义一个名为 dialogInputConfirm 的异步函数，接收 val 参数
	const dialogInputConfirm = async (val) => {
		// 创建一个 AddWorkOrderTaskCloseDetailDto 实例，并设置其属性值
		const addData = new AddWorkOrderTaskCloseDetailDto();
		addData.Cause = val;
		addData.DepartmentId = userInfo.value.DepartmentId;
		addData.TaskId = Id.value;
		addData.UserId = userInfo.value.Id;
		addData.Type = 0;
		// 调用 WorkOrderTaskCloseDetail 的 addworkordertaskclosedetail 方法，并传递 addData 参数，获取 addDataDetail 值
		let addDataDetail = await WorkOrderTaskCloseDetail.addworkordertaskclosedetail(addData);
		// 如果 addDataDetail 存在
		if (!!addDataDetail) {
			// 创建一个 updateWorkOrderTaskDto 实例，并设置其属性值
			const updateData = new updateWorkOrderTaskDto();
			updateData.Id = Id.value;
			updateData.State = 5;

			// 调用 WorkOrderService 的 UpdateWorkOrder 方法，并传递 updateData 参数，获取 updateWorkOrderData 值
			let updateWorkOrderData = await WorkOrderService.UpdateWorkOrder(updateData);
			if (!!updateWorkOrderData) {
				// 弹出一个提示框，内容为 '退回完成'
				uni.showToast({
					title: '退回完成'
				});
			}

			// 延时 2 秒后返回上一页
			setTimeout(() => {
				uni.navigateBack();
			}, 2000);
		}
	}
</script>

<style lang="scss">
	// page {
	// 	background-color: #f8f8f8;
	// }


	.bottom-actions {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: white;
		padding: 10px;
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
		display: flex;

		.bottomItem {
			width: 50%;
			display: flex;
			justify-content: center;
		}
	}


	.gap {
		margin: 10px 0;
	}
</style>
