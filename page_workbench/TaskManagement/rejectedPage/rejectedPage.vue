<template>
	<view>
		<uni-section title="接受退回详情" type="line">
			<uni-list v-for="item in rejectCard">
				<uni-list-item title="退回原因" :rightText="item.Cause" />
				<uni-list-item title="退回人" :rightText="item.UserName" />
			</uni-list>
		</uni-section>

		<sy-taskForm :Id="Id" :formType="'processReturn'"></sy-taskForm>
		<view style="height: 45px;"></view>
	</view>
</template>

<script setup lang='ts'>
	import {
		onLoad
	} from "@dcloudio/uni-app";

	import {
		reactive,
		toRefs
	} from "vue";
	import {
		UserService
	} from "../../../api/userService";
	import {
		WorkOrderTaskCloseDetail
	} from "../../../api/workOrderService";
	// 在 onLoad 函数中使用 async 关键字定义一个异步函数，并传入 res 参数
	onLoad(async (res: any) => {
		// 解码并解析 res.item 参数，将结果存储在 reqData 变量中
		const reqData = JSON.parse(decodeURIComponent(res.item));
		// 将 reqData 的 Id 属性的值赋给 Id.value 变量
		Id.value = reqData.Id;
		// 调用 WorkOrderTaskCloseDetail 的 GetWorkOrderTaskCloseDetailByTaskId 方法，并传递 Id.value 参数，获取 data 值
		let data = await WorkOrderTaskCloseDetail.GetWorkOrderTaskCloseDetailByTaskId(Id.value);

		for (let item of data) {
			console.log(item);
			item.UserName = await getUserInfo(item.UserId);
		}

		// 调用 getUserInfo 方法，并传递 reqData.AcceptManId 参数，将返回的结果赋给 rejectCard.value.UserName 变量
		rejectCard.value = data
	})
	const getUserInfo = async (Id: number) => {
		const userInfo = await UserService.SerachAUserbyUserID({
      userID: Id
		});
		return userInfo.UserName;
	}
	const {
		Id,
		rejectCard
	} = toRefs(reactive({
		Id: 0,
		rejectCard: []
	}))
</script>

<style>

</style>
