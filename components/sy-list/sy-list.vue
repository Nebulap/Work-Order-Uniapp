<template>
	<view>
		<uni-list class="center-list" :border='false' v-for="(sublist , index) in ucenterList" :key="index">
			<uni-list-item v-for="(item,i) in sublist" :title="item.title" link :rightText="item.rightText" :key="i"
				:clickable="true" :to="item.to" @click="ucenterListClick(item)" :show-extra-icon="true"
				:extraIcon="{type:item.icon,color:'#999'}" :thumb="item.url" thumb-size="sm" >
			</uni-list-item>
			<view class="center-list-border" :style="borderStyle">
			</view>
		</uni-list>
	</view>
</template>

<script setup lang="ts">
	// import {
	// 	reactive,
	// 	toRefs
	// } from 'vue'

	// 传入属性的接口
	interface ItemProps {
		ucenterList: Array < object > ;
		borderStyle?: object;//间隔之间的颜色，也可以是style。。。默认颜色#f2f2f2;默认高度	height: 20rpx;
	}
	//设置传入属性
	const props = defineProps < ItemProps > ();

	// 设置事件
	interface EmitEvent {
		(e: "itemClick", item: any): void; // 当选项被点击时会触发该事件
	}

	const emit = defineEmits < EmitEvent > ();

	const ucenterListClick = (item: any) => {
		// console.log('组件内', item)
		let objItem = JSON.parse(JSON.stringify(item))
		// console.log(objItem)
		if (!!objItem.to) {
			//如果存在则跳转
			// console.log('应该跳转到', objItem.to)
			if (objItem.to == '/pages/index/index' || objItem.to == '/pages/me/me' || objItem.to ==
				'/pages/workbench/workbench') {
				uni.switchTab({
					url: objItem.to
				})
			} 

		} else {
			emit("itemClick", item);
		}

	};
</script>


<style lang="scss">
	.center-list-border {
		height: 20rpx;
		background-color:  #f2f2f2;
	}

</style>
