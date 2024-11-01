<template>
	<view>
		<uni-search-bar placeholder="搜索" @confirm="search" cancel-text="取消" />
		<sy-taskCard :cardList='harmonizeCard' :taskType="'草稿箱'"></sy-taskCard>
	</view>
</template>

<script lang="ts" setup>
	import {
		onShow,
	} from "@dcloudio/uni-app";
	import {
		userStore
	} from '@/store/user-store'
	import {
		storeToRefs
	} from "pinia"
	import {
		toRefs,
		reactive,
	} from 'vue';
	import { WorkOrderService } from "../../../api/workOrderService";
	import { UserService } from "../../../api/userService";
	const userstore = userStore()
	const {
		userInfo,
	} = storeToRefs(userstore);
	let {
		harmonizeCard,
	}
		= toRefs(
			reactive({
				harmonizeCard: [],
			})
		);

	// 在 onShow 函数中使用 async 关键字定义一个异步函数
	onShow(async () => {
		// 调用 WorkOrderService 的 GetWorkOrderTasksByInitiatorId 方法，并传递 { InitiatorId: userInfo.value.Id } 参数，获取 data 值
		let data = await WorkOrderService.GetWorkOrderTasksByInitiatorId({ InitiatorId: userInfo.value.Id });
		// 使用 filter 方法过滤 data，只保留 State 等于 0 的项，并将结果存储在 filteredData 变量中
		const filteredData : any = data.filter(obj => obj.State === 0);
		// 遍历 filteredData 数组
		for (let i = 0; i < filteredData.length; i++) {
			// 调用 getUserInfo 方法，并传递 filteredData[i].InitiatorId 参数，将返回的结果赋给 userName 变量
			const userName = await getUserInfo(filteredData[i].InitiatorId);
			// 将 userName 的值赋给 filteredData[i].UserName 属性
			filteredData[i].UserName = userName;
		}
		// 将 filteredData 的值赋给 harmonizeCard.value 变量
		harmonizeCard.value = filteredData;
	})
	const getUserInfo = async (Id : number) => {
		const userInfo = await UserService.SerachAUserbyUserID({ userID: Id });
		return userInfo.UserName;
	}

	const search = (res) => {
		console.log(res);
	}
</script>

<style lang="scss">
	.itemCard {
		display: flex;
		justify-content: space-between;
	}
</style>
