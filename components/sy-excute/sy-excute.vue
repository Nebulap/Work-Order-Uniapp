<template>
	<uni-section title="工单处理" type="line">
		<uni-list>
			<uni-list-item title="处理详情" />
			<view class="textItem">
				{{dataList.Detail}}
			</view>
			<uni-list-item title="处理人" :rightText="dataList.UserName" />
			<uni-list-item title="处理时间" :rightText="dataList.createdAt" />
		</uni-list>
	</uni-section>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, toRefs } from 'vue';
	import { WorkOrderExecute } from '../../api/workOrderService';
	import { TimeUtil } from '../../util/date';
	import { GetUserInfoUtil } from '../../util/getUserInfo';
	interface ItemProps {
		Id : number;
	}
	//设置传入属性
	const props = defineProps<ItemProps>();
	// 设置事件
	interface EmitEvent {
		(e : "itemClick", item : object) : void; // 当选项被点击时会触发该事件
	}
	const emit = defineEmits<EmitEvent>();
	const { dataList } = toRefs(reactive({
		dataList: {} as any
	}))
	onMounted(async () => {
		console.log(props.Id);
		dataList.value = (await WorkOrderExecute.GetWorkOrderExecuteById(props.Id))[0]
		dataList.value.createdAt = TimeUtil.getFomatTime(dataList.value.createdAt)
		dataList.value.UserName = await GetUserInfoUtil.getUserInfo(dataList.value.ExecutorId)
	})
</script>

<style lang="scss" scoped>
	.textItem {
		color: #999;
		padding: 0px 15px;
	}
</style>
