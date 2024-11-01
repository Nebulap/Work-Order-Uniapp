<template>
	<view>
		<uni-list >
			<uni-list-chat v-for="item in AppraiseData" :key="item.ID" :avatar-circle="true" :title="item.User_Name" :avatar="item.User_AvatarUrl"
				:note="item.Appraise" :time="TimeUtil.getFomatTime(item.createdAt)" :badge-text="item.RateValue"></uni-list-chat>
		</uni-list>
	</view>
</template>

<script setup lang="ts">
	import {
		TimeUtil
	} from '../../util/date';
	// 传入属性的接口
	interface ItemProps {
		AppraiseData: Array < object > ;
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
