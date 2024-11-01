<template>
	<sy-taskDetailCard :Id="workOrderId" ></sy-taskDetailCard>
	<uni-section title="处理过程" type="line">
		<sy-step :Id="workOrderId"></sy-step>
	</uni-section>
	<view style="height: 45px;"></view>
	<view class="bottom-actions">
		<view class="bottomItem" style="border-right: 1px solid black;" @click="claimTask"><uni-icons
				type="checkbox-filled" color="#3c9ee1" /><text style="color:#3c9ee1;padding-left: 5px;">同意审核</text>
		</view>
		<view class="bottomItem" @click="declineTask"><uni-icons type="clear" color="#ef5350" /><text
				style="color:#ef5350;padding-left: 5px;">拒绝审核</text></view>
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
	import { WorkOrderExecute, WorkOrderService, WorkOrderTaskCloseDetail } from '../../../api/workOrderService';

	import { AddWorkOrderTaskCloseDetailDto } from '../../../model/workbench/WorkOrder/Dto/add.workordertaskclosedetail.dto';
	import {
		userStore
	} from '../../../store/user-store'
	import {
		storeToRefs
	} from "pinia"

	import { updateWorkOrderTaskDto } from '../../../model/workbench/WorkOrder/Dto/updateworkordertask.dto';
	const userstore = userStore()
	const {
		userInfo
	} = storeToRefs(userstore);
	const { inputDialog, workOrderId, executeData } = toRefs(reactive({
		inputDialog: false,
		workOrderId: 0,
		executeData: [] as any
	}))
	// 在 onLoad 函数中使用 async 关键字定义一个异步函数，并接收 options 参数
	onLoad(async (options) => {
		// 解析 options.item 的 JSON 字符串，并将结果存储在 Info 变量中
		let Info = JSON.parse(decodeURIComponent(options.item));
		workOrderId.value=Info.Id
	})

	const claimTask = async () => {
		let processData = await WorkOrderExecute.AgreeWorkOrderProcessing(workOrderId.value)
		console.log(processData);
		if (!!processData) {
			uni.showToast({
				title: '审核通过'
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 2000)
		}
	}
	const declineTask = () => {
		inputDialog.value.open()
	}
	const dialogInputConfirm = async (val) => {
		// 创建一个 AddWorkOrderTaskCloseDetailDto 对象，并设置相关属性的值
		let rufuseData = new AddWorkOrderTaskCloseDetailDto()
		rufuseData.Cause = val
		rufuseData.Type = 1
		rufuseData.TaskId = workOrderId.value
		rufuseData.DepartmentId = userInfo.value.DepartmentId
		rufuseData.UserId = userInfo.value.Id
    console.log("===========================================")
    console.log(rufuseData)

		// 调用 WorkOrderTaskCloseDetail 的 addworkordertaskclosedetail 方法，并传递 rufuseData 对象作为参数，获取 closeDetail 值
		let closeDetail = await WorkOrderTaskCloseDetail.addworkordertaskclosedetail(rufuseData)

		// 检查 closeDetail 是否存在
		if (closeDetail) {
			// 创建一个 updateWorkOrderTaskDto 对象，并设置相关属性的值
			const updateData = new updateWorkOrderTaskDto()
			updateData.Id = workOrderId.value
			updateData.State = 6
			updateData.AuditStatus = 1

			// 调用 WorkOrderService 的 UpdateWorkOrder 方法，并传递 updateData 对象作为参数，获取 UpdateData 值
			let UpdateData = await WorkOrderService.UpdateWorkOrder(updateData)

			// 检查 UpdateData 是否存在
			if (UpdateData) {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	// page {
	// 	background-color: #999;
	// }

	.textItem {
		color: #999;
		padding: 0px 10px;
	}

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
</style>
