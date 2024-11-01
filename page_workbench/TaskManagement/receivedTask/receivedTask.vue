<template>
	<view>
		<uni-search-bar placeholder="搜索" cancel-text="取消" @input="search" @cancel="cancelSearch" clear-button="false" />
		<uni-segmented-control :values="items" @clickItem="onClickItem" styleType="button"
			activeColor="#4cd964"></uni-segmented-control>
		<sy-taskCard :cardList='harmonizeCard' :taskType="'我收到的工单'"></sy-taskCard>
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
		reactive, watch, ref
	} from 'vue';

	import { WorkOrderService } from "../../../api/workOrderService";
	import { UserService } from "../../../api/userService";
	const userstore = userStore()
	const {
		userInfo,
	} = storeToRefs(userstore);
	let {
		harmonizeCard,
		items
	}
		= toRefs(
			reactive({
				harmonizeCard: [],
				items: ['全部', '待接收', '处理中', '处理驳回', '已完成']
			})
		);

	// 在 onShow 函数中使用 async 关键字定义一个异步函数
	onShow(async () => {
		let data = await getWorkOrder()
		// 过滤 receivedData，只保留 State 等于 1、2、4 或 6 的项，并将结果存储在 harmonizeCard 变量中
		harmonizeCard.value = data.filter((item) => item.State == 1 || item.State == 2 || item.State == 4 || item.State == 6);
	});
	const getWorkOrder = async () => {
    console.log(userInfo.value)
		// 调用 WorkOrderService 的 GetWorkOrderTasksByAcceptManId 方法，并传递 { AcceptManId: userInfo.value.Id } 参数，获取 receivedData 值
		let receivedData = await WorkOrderService.GetWorkOrderTasksByAcceptManId({ AcceptManId: userInfo.value.Id })
		// 遍历 data 数组
		for (let i = 0; i < receivedData.length; i++) {
			// 调用 getUserInfo 方法，并传递 data[i].InitiatorId 参数，将返回的结果赋给 userName 变量
			const userName = await getUserInfo(receivedData[i].InitiatorId);
			// 将 userName 的值赋给 data[i].UserName 属性
			receivedData[i].UserName = userName;
		}
		// 将 data 的值赋给 harmonizeCard.value 变量
		return receivedData
	}
	const getUserInfo = async (Id : number) => {
		const userInfo = await UserService.SerachAUserbyUserID({ userID: Id });
		return userInfo.UserName;
	}
	const onClickItem = async (e) => {
		let data = await getWorkOrder()
		if (e.currentIndex === 1) {
			harmonizeCard.value = data.filter((item) => item.State === 1);
		} else if (e.currentIndex === 2) {
			harmonizeCard.value = data.filter((item) => item.State === 2);
		} else if (e.currentIndex === 3) {
			harmonizeCard.value = data.filter((item) => item.State === 6);
		} else if (e.currentIndex === 4) {
			harmonizeCard.value = data.filter((item) => item.State === 4);
		} else if (e.currentIndex === 0) {
			harmonizeCard.value = data.filter((item) => item.State == 1 || item.State == 2 || item.State == 4 || item.State == 6);
		}

	}
	const cancelSearch = (res) => {
		uni.reLaunch({
			url: '/page_workbench/TaskManagement/receivedTask/receivedTask' // 替换成你需要重新加载的页面路径
		});
	}
	// 监听 e.currentIndex 的变化
	const search = async (res) => {

		harmonizeCard.value = harmonizeCard.value.filter((item) =>
			item.Title.includes(res)
		);
	}
</script>

<style lang="scss">
	.itemCard {
		display: flex;
		justify-content: space-between;
	}
</style>
