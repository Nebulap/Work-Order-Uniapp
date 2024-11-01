<template>
	<view>
		<uni-grid :column="4" :highlight="true" :show-border="false" @change="changeGrid">
			<uni-grid-item v-for="(item, index) in gridList" :index="index" :key="index">
				<view class="grid-item-box" style="background-color: #fff;">
					<image v-if='!!item.url' :src="item.url" class="image" mode="aspectFill" />
					<uni-icons v-else :type="item.icon" :size="30" color="#777" />
					<text class="text">{{item.text}}</text>
					<view v-if="item.badge" class="grid-dot">
						<uni-badge :text="item.badge" :type="item.type" />
					</view>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script setup lang="ts">
	// import {
	// 	reactive,
	// 	toRefs
	// } from 'vue'

	// 传入属性的接口
	interface ItemProps {
		gridList: Array < object > ;
	}
	//设置传入属性
	const props = defineProps < ItemProps > ();

	// 设置事件
	interface EmitEvent {
		(e: "itemClick", item: object): void; // 当选项被点击时会触发该事件
	}
	const emit = defineEmits < EmitEvent > ();

	const changeGrid = function(e: any) {
		let {
			index
		} = e.detail
		// console.log(index);
		let item = props.gridList[index]
		// console.log(item);
		let objItem = JSON.parse(JSON.stringify(item))
		// console.log(objItem)
		if (!!objItem.to) {
			//如果存在则跳转
			console.log('应该跳转到', objItem.to)
			if (objItem.to == '/pages/index/index' || objItem.to == '/pages/me/me' || objItem.to ==
				'/pages/workbench/workbench') {
				uni.switchTab({
					url: objItem.to
				})
			} else {
				uni.navigateTo({
					url: objItem.to
				})
			}
		} else {
			emit("itemClick", item);
		}
	}
</script>

<style lang="scss">
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.image {
		width: 56rpx;
		height: 56rpx;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}
</style>
