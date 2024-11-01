<template>
	<!-- 发起事项 -->
	<sy-taskDetailCard :Id='workOrderId'></sy-taskDetailCard>
	<!-- 退回事项 -->
	<uni-section title="处理退回事由" type="line" v-show="launchInfoObject.State==6">
		<uni-list v-for="item in rejectDisposeList">
			<uni-list-item title="退回原因" :rightText="item.Cause" />
			<uni-list-item title="退回人" :rightText="item.UserName" />
		</uni-list>
	</uni-section>
	<view v-if="shouldRenderSyStep">
		<uni-section title="处理过程" type="line"></uni-section>
		<sy-step :Id="workOrderId"></sy-step>
	</view>
	<view>
		<uni-icons type="plus-filled" size="50" class="custom-button" @click="selectDisposeWay" color="#2979ff"
			v-if="showAdd"></uni-icons>
		<uni-icons type="closeempty" size="50" class="custom-button" @click="closeWorkOrder" color="#2979ff"
			v-else-if="showAdd && !detail"></uni-icons>
		<view v-show="current === 1">
			<!-- 添加子工单 -->
			<sy-taskForm :formType="'childWorkOrde'" :Id="launchInfoObject.Id"
				@formSubmitted="handleFormSubmitted"></sy-taskForm>
			<view style="height: 41px;" />
		</view>
		<!-- 添加处理事项 -->
		<view v-show="current === 2">
			<uni-section title="处理事项" type="line">
				<view class="matterBox">
					<uni-forms ref="mattersForm" :rules="mattersrules" :model="matterFormData">
						<uni-forms-item label="结果描述" name="Detail" required>
							<uni-easyinput placeholder="请输入详情" v-model="matterFormData.Detail" type="textarea" />
						</uni-forms-item>
						<view class="fujianBox">
							<uni-file-picker file-mediatype="all" @select="select" title="上传附件" @delete='deleteFile'
								border=false>
							</uni-file-picker>
						</view>
						<view class="bottom-actions">
							<view class="bottomItem" style="border-right: 1px solid black;" @click="submit(false)">
								<uni-icons type="paperplane-filled" color="#3c9ee1" /><text
									style="color:#3c9ee1;padding-left: 5px;">提交工单</text>
							</view>
							<view class="bottomItem" @click="submit(true)"><uni-icons type="checkbox-filled"
									color="#3c9ee1" /><text style="color:#3c9ee1;padding-left: 5px;">提交审核</text></view>
						</view>
					</uni-forms>
				</view>
			</uni-section>
			<view style="height: 41px;" />
		</view>

	</view>
</template>
<script setup lang="ts">
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		reactive,
		toRefs,
		nextTick
	} from "vue";

	import {
		userStore
	} from '../../../store/user-store'
	import {
		storeToRefs
	} from "pinia"
	import { WorkOrderExecute, WorkOrderHistory, WorkOrderService } from "../../../api/workOrderService";
	import { AddWorkOrderExecuteDto } from "../../../model/workbench/WorkOrder/Dto/add.workordereXecyte.dto";
	import { updateWorkOrderTaskDto } from "../../../model/workbench/WorkOrder/Dto/updateworkordertask.dto";
	import { UserService } from "../../../api/userService";

	const userstore = userStore()
	const {
		userInfo,
	} = storeToRefs(userstore);
	let {
		current,
		launchInfoObject,
		mattersForm,
		mattersrules,
		matterFormData,
		rejectDisposeList,
		workOrderId,
		shouldRenderSyStep,
		showAdd,
    detail
	} = toRefs(reactive({
		current: 0 as any,
		launchInfoObject: {} as any,
		mattersForm: false,
		mattersrules: {
			Detail: {
				rules: [{
					required: true,
					errorMessage: '详情不能为空'
				}]
			},
		},
		matterFormData: {},
		rejectDisposeList: [],
		workOrderId: 0,
		shouldRenderSyStep: false,
		showAdd: true,
    detail:false
	}))
	const reRenderSyStep = (newWorkOrderId : number) => {
		workOrderId.value = newWorkOrderId;
		shouldRenderSyStep.value = false; // 隐藏 sy-step 组件
		// 使用 $nextTick 方法时，可以直接在普通函数中调用而无需箭头函数
		// 在 nextTick 回调函数内进行组件状态的修改
		// 这里使用异步的方式是因为我们需要等待 shouldRenderSyStep.value 内容变化后再显示组件
		// 如果直接将 shouldRenderSyStep.value 设置为 true，则组件会立即显示，页面无法正确响应
		nextTick(() => {
			shouldRenderSyStep.value = true; // 显示 sy-step 组件，触发重新传入 workOrderId
		});
	}
	const handleFormSubmitted = () => {
		reRenderSyStep(workOrderId.value)
	}
	// 在 onLoad 函数中使用 async 关键字定义一个异步函数，并传入 options 参数
	onLoad(async (options : any) => {
		// 解码并解析 options.item 参数，将结果存储在 Info 变量中
		let Info = JSON.parse(decodeURIComponent(options.item));
		console.log(options);
		let taskType = options.taskType;

    if (options.detail){
      detail.value = true
    }

		if (taskType == "我发起的工单") {
			showAdd.value = false
		}
		workOrderId.value = Info.Id
		let detailData : any = await WorkOrderService.GetWorkOrderTaskDetailById({ Id: Info.Id })
		detailData.UserName = await getUserInfo(detailData.InitiatorId)
		detailData.createdAt = detailData.createdAt.split("T")[0]
		if (!!detailData.RequiredCompletionTime) {
			detailData.RequiredCompletionTime = detailData.RequiredCompletionTime.split("T")[0]
		}
		launchInfoObject.value = detailData
		reRenderSyStep(workOrderId.value)
		// console.log(launchInfoObject.value);
		getReject()
	})

	// 选择方式
	const selectDisposeWay = () => {
		uni.showModal({
			title: '选择处理方式',
			cancelText: '处理工单',
			cancelColor: '#576B95',
			confirmText: '添加工单',
			success: function (res) {
				if (res.confirm) {
					console.log('用户点击添加工单');
					current.value = 1
					selectDisposeWay
				} else if (res.cancel) {
					current.value = 2
					console.log('用户点击处理工单');
				}
			},
		});
	}
	//拒绝详情
	const getReject = async () => {
		if (!!launchInfoObject.value.WorkOrderTaskCloseDetails) {
			// const rejectList = data.value.WorkOrderTaskCloseDetails.filter((item : any) => item.Type == 0)
			// rejectCard.value = rejectList
			const diposeRejectCard = launchInfoObject.value.WorkOrderTaskCloseDetails.filter((item : any) => item.Type == 1)
			rejectDisposeList.value = diposeRejectCard
			for (let item of rejectDisposeList.value) {
				item.UserName = await getUserInfo(item.UserId)
			}
		}
	}

	const getUserInfo = async (Id : number) => {
		const userInfo = await UserService.SerachAUserbyUserID({ userID: Id });
		return userInfo.UserName;
	}
	const submit = (bool) => {
		// 使用 mattersForm.value.validate() 方法进行表单验证，并返回一个 Promise 对象
		mattersForm.value.validate().then(async (res : any) => {
			// 创建一个 AddWorkOrderExecuteDto 对象 executeData，并设置相关属性的值
			let executeData = new AddWorkOrderExecuteDto()
			executeData.TaskId = launchInfoObject.value.Id
			executeData.Process = 1
			executeData.Detail = res.Detail
			executeData.ExecutorId = userInfo.value.Id
			executeData.ExecutorDepartmentId = userInfo.value.DepartmentId
			// 调用 WorkOrderExecute 的 AddWorkOrderExecuteByTaskId 方法，并传递 executeData 对象作为参数，获取 addData 值
			let addData : any = await WorkOrderExecute.AddWorkOrderExecuteByTaskId(executeData)
			let historyData = await WorkOrderHistory.AddWorkOrderHistory({ Action: res.Detail, UserId: userInfo.value.Id, WorkOrderId: launchInfoObject.value.Id, ExecuteId: addData.Id })
			// 检查 addData 是否存在
			if (!!addData) {
				if (bool) {
					// 创建一个 updateWorkOrderTaskDto 对象 updateData，并设置相关属性的值
					let updateData = new updateWorkOrderTaskDto()
					updateData.Id = launchInfoObject.value.Id
					updateData.State = 3
					// 调用 WorkOrderService 的 UpdateWorkOrder 方法，并传递 updateData 对象作为参数，获取 updateWorkData 值
					let updateWorkData = await WorkOrderService.UpdateWorkOrder(updateData)
					// 检查 updateWorkData 是否存在，并且 code 是否等于 200
					if (updateWorkData.code == 200) {
						uni.navigateBack()
					}
				} else {
					reRenderSyStep(workOrderId.value)
					matterFormData.value.Detail = ''
					// uni.navigateBack()
				}

			}
		})
	}

	const closeWorkOrder=()=>{
		//关闭工单
		uni.showModal({
			title: '确定关闭工单',
			success: async (res) => {
				if (res.confirm) {
					// 用户点击了确定按钮
					// 在这里执行相应的操作
					const updateWorkOrderTask = new updateWorkOrderTaskDto()
					updateWorkOrderTask.Id = workOrderId.value;
					updateWorkOrderTask.State = 4;
					const result = await WorkOrderService.UpdateWorkOrder(updateWorkOrderTask);
					if(!!result){
						uni.navigateBack()
					}
				}
			}
		});
	}

</script>

<style lang="scss" scoped>
	.custom-button {

		position: fixed;
		top: 80%;
		right: 20px;
	}

	.annexBox {
		display: flex;
		justify-content: space-between;
		padding: 12px 15px;
		// border-top: 1px solid #999999;
		border-bottom: 1px solid #f7f7f7;

		.leftbox {
			width: 80%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.rightbox {
			width: 13%;
			display: flex;
			align-items: center;
			color: #999999;
			justify-content: space-around;
		}
	}

	.fujianBox {
		margin: 20px 0px;

		button {
			background-color: #2979ff;
		}

		.file-title {
			color: #606266;
		}
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

	.textItem {
		color: #999;
		padding: 0px 15px;
	}

	.matterBox {
		padding: 12px 15px;
	}
</style>
