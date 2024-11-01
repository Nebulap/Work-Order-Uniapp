<template>
	<view>
		<uni-list v-for="item in harmonizeInfo" :key="item.ID">
			<uni-list-item title="标题" :note="item.Title"></uni-list-item>
			<uni-list-item title="内容" :note="item.Content" />
			<uni-list-item title="发起人" :note="item.Sponsor" />
			<uni-list-item title="部门" :note="item.Department" />
			<uni-list-item title="发起时间" :note="TimeUtil.getFomatTime(item.createdAt) " />
		</uni-list>
		<uni-list v-for="item in harmonizeInfo[0].task_harmonizeinfos" :key="item.ID">
			<uni-list-item title="处理人" :note="item.DisposeMan"></uni-list-item>
			<uni-list-item title="部门" :note="item.DisposeDepartment" />
			<uni-list-item title="处理事项" :note="item.ItemsProcessed" />
			<uni-list-item title="需完成时间" :note="TimeUtil.getFomatTime(item.ResolutionTiem) " />
			<uni-list-item title="状态" :note="item.State==1||item.OrderIndex==1?'处理中':'等待中'"  />
		</uni-list>
	</view>
</template>

<script setup lang="ts">
	import {
		TimeUtil
	} from '../../util/date';
	// 传入属性的接口
	interface ItemProps {
		harmonizeInfo: Array < object > ;
	}
	//设置传入属性
	const props = defineProps < ItemProps > ();

	// 设置事件
	interface EmitEvent {
		(e: "itemClick", item: object): void; // 当选项被点击时会触发该事件
	}
	const emit = defineEmits < EmitEvent > ();
</script>

<style lang="scss">

</style>
