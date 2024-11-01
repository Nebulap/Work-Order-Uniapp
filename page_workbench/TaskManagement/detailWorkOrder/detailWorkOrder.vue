<template>
	<sy-taskDetailCard :Id='WrokOrderId'></sy-taskDetailCard>
	<uni-section title="处理流程" type="line" v-if="ExecuteId==0">
		<sy-step :Id="WrokOrderId" ></sy-step>
	</uni-section>
	<view v-if="ExecuteId!=0">
		<sy-excute :Id='ExecuteId' ></sy-excute>
	</view>

</template>

<script lang="ts" setup>
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import { reactive, toRefs } from "vue";
	onLoad(async (res : any) => {
		console.log(res, '父组件收到的内容');
		if (res.Id != null) {
			WrokOrderId.value = res.Id
			console.log('子工单走的分支');
		} else {
			console.log('处理流程走的分支');
			WrokOrderId.value = res.workOrderId
			ExecuteId.value = res.ExecuteId
		}
	})
	let { WrokOrderId, ExecuteId } = toRefs(reactive({

		WrokOrderId: 0,
		ExecuteId: 0
	}))
</script>

<style scoped lang="scss">

</style>