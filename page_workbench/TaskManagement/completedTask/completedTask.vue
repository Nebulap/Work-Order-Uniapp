<template>
	<sy-taskDetailCard :Id="workOrderId" ></sy-taskDetailCard>
	<uni-section title="处理过程" type="line"></uni-section>
	<sy-step :Id="workOrderId"></sy-step>
</template>

<script setup lang="ts">
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import { reactive, toRefs } from "vue";
	let {
		workOrderId
	} = toRefs(reactive({
		workOrderId: 0
	}))
	// 在 onLoad 函数中使用 async 关键字定义一个异步函数，并传入 options 参数
	onLoad(async (options : any) => {
		// 解码并解析 options.item 参数，将结果存储在 Info 变量中
		let Info = JSON.parse(decodeURIComponent(options.item));
		workOrderId.value = Info.Id
	})
</script>

<style scoped lang="scss">
	.textItem {
		color: #999;
		padding: 0px 15px;
	}

	.attachmentItem {
		display: flex;
		align-items: center;
		padding: 0 10px 10px 10px;
		color: #999;

		image {
			width: 20px;
		}
	}
</style>