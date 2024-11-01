<template>
	<view>
		<view class="topBox">
			<uni-search-bar placeholder="搜索相关应用" bgColor="#EEEEEE" />
			<uni-icons type="scan" size="30" color="#777777" @click=""></uni-icons>
		</view>
		<uni-card :is-shadow="true" class="card">
			<image src="https://26128846.s21i.faiusr.com/4/ABUIABAEGAAgoKGDpgYogOvwhgIwuAg4igU.png" mode="widthFix"
				style="width: 100%"></image>
		</uni-card>
		<uni-card :is-shadow="true" title="我的" extra="管理" @click="admin">
			<sy-grid :gridList="gridList" @itemClick=""></sy-grid>
		</uni-card>
		<uni-card :is-shadow="true" title="全员" extra="全部" @click="allWorkOrder">
			<sy-grid :gridList="workbenchALLUsageList" @itemClick=""></sy-grid>
		</uni-card>
    <uni-card :is-shadow="true" title="我的进度" extra="全部" @click="schedule">
      <sy-grid :gridList="workbenchALLUsageList" @itemClick=""></sy-grid>
    </uni-card>
	</view>
</template>

<script setup lang="ts">
	// 引入组合式的生命周期函数
	import {
		onShow
	} from "@dcloudio/uni-app";
	import {
		reactive,
		toRefs
	} from "vue";
	import {
		userStore
	} from "../../store/user-store";
	// 使普通数据变响应式的函数

	// import { qrService } from "../../api/qrService";
	const userstore = userStore();


	// 解构并使数据具有响应式


	let {
		gridList,
		workbenchALLUsageList
	} = toRefs(
		reactive({
			gridList: [],
			workbenchALLUsageList: [],
		})
	);


	const girdClick = (item) => {
		console.log("父组件", item);
	};

  const admin = () => {
    console.log(1)
    uni.navigateTo({
      url: '/page_workbench/TaskManagement/main/main'
    })
  }

  const schedule = ()=>{
    uni.navigateTo({
      url: '/page_workbench/TaskManagement/schedule/schedule'
    })
  }

  const allWorkOrder = ()=>{
    uni.navigateTo({
      url: '/page_workbench/TaskManagement/allWorkOrder/allWorkOrder'
    })
  }


	onShow(async () => {
    userstore.login()

    // let objworkbenchALLUsageList = await workenchService.getWorkbenchAllUsageList();
    // workbenchALLUsageList.value = objworkbenchALLUsageList.workbenchALLUsageList;
    // let objGetWorkbenchMeList = await workbenchService.GetWorkbenchMeList()
    // gridList.value = objGetWorkbenchMeList.workbenchMeList;

		// if (userstore.loginCheck()) {
		// 	try {
    //
		// 	} catch (e) {
		// 		//TODO handle the exception
		// 		console.log('获取列表失败', e)
		// 	}

		// }
	});
</script>

<style lang="scss">
	.topBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-image: linear-gradient(180deg, #0aa1ed, #f5f5f5);
		padding: 30px 20px 20px 20px;

		.uni-searchbar {
			flex: 1;
			// margin-top: 20px;
		}
	}

	.card {
		position: relative;
		margin: 0;
		padding: 0;

		.card-actions-item {
			position: absolute;
			top: 360rpx;
			z-index: 999999;
			width: 80px;
			height: 30px;
			background-color: #fff;
			border-radius: 15px;
			text-align: center;
			line-height: 30px;
			font-weight: bold;
		}

		.card-actions-itemtwo {
			font-weight: bold;
			position: absolute;
			right: 40rpx;
			top: 360rpx;
			z-index: 999999;
			width: 80px;
			height: 30px;
			background-color: #fff;
			text-align: center;
			line-height: 30px;
			border-radius: 15px;
		}
	}
</style>
