<template>
	<uni-swipe-action>
		<uni-swipe-action-item v-for="item in suggestionCard" :key="item.Id" :right-options="options"
			@click="bindClick(item.Id, $event)">
			<view class="opinionCard" @click="actionsClick(item)">
				<view class="title">
					{{item.Title}}
				</view>
				<view class="content">
					<view class="time">
						{{item.createdAt.slice(0, 19).replace('T', ' ')}}
					</view>
					<view class="State">
						<uni-tag :text="item.State==1?'执行中':item.State==2?'已完成':'等待审批'"
							:type="item.State==1?'primary':item.State==2?'success':'warning'" />
					</view>
				</view>
			</view>
		</uni-swipe-action-item>
	</uni-swipe-action>
</template>

<script setup lang="ts">
	import {
		toRefs,
		reactive,
	} from 'vue';
	import { SuggestionBoxService } from '../../api/suggestionBoxService';
	let {
		options,
	} = toRefs(
		reactive({
			options: [{
				text: '删除',
				style: {
					backgroundColor: '#dd524d'
				}
			}],
		})
	);
	// 传入属性的接口
	interface ItemProps {
		suggestionCard : Array<object>;
	}
	//设置传入属性
	const props = defineProps<ItemProps>();

	// 设置事件
	interface EmitEvent {
		(e : "itemClick", item : object) : void; // 当选项被点击时会触发该事件
	}
	const emit = defineEmits<EmitEvent>();
	// 定义一个异步函数 bindClick，用于处理建议卡片中的按钮点击事件	//删除和修改
	const bindClick = async (id : number, event : Record<string, any>,) => {
		console.log(id, event);
		// 如果点击了第一个按钮（删除），弹出确认框并执行删除操作
		if (event.index == 0) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该建议吗？',
				success: async (res) => {
					if (res.confirm) {
						// 调用 SuggestionBoxService 的 DeleteSuggestion 方法执行删除操作
						const data = await SuggestionBoxService.DeleteSuggestion({
							Id: id // 传递建议 ID 参数
						});
						if (data.code == 404) {
							uni.showModal({
								title: data.msg,
								showCancel: false
							})
						}
						if (data.code == 200) {
							// 如果删除成功，更新页面显示
							const index = suggestionCard.value.findIndex((item : Record<string, any>
							) => {
								return item.Id == id;
							});
							if (index !== -1) {
								suggestionCard.value.splice(index, 1);
							}
						}
					} else if (res.cancel) {
						// 用户点击了取消按钮，不执行任何操作
					}
				}
			});
		}

	}
	// 定义一个函数 actionsClick，用于处理建议列表中的操作按钮点击事件
	const actionsClick = (obj : any) => {
		// 将 obj 对象序列化并进行 URL 编码后作为参数传递给 appraiseSuggestion 页面
		uni.navigateTo({
			url: "/page_me/suggestionBox/appraiseSuggestion/appraiseSuggestion?info=" +
				encodeURIComponent(JSON.stringify({
					...obj // 将 obj 对象中的所有属性展开到新对象中
				}))
		})
	}
</script>

<style lang="scss" scoped>
	.opinionCard {
		background-color: #fff;
		border-radius: 10px;
		border: 1rpx solid #e0e0e0;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
		/* 添加阴影效果 */
		/* 设置阴影 */
		padding: 15px;
		margin: 10px;
		.title {
			font-size: 36rpx;
			color: #333;
			margin-bottom: 20rpx;
		}

		.content {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.time {
			font-size: 24rpx;
			color: #999;
		}

		.State {
			font-size: 24rpx;
			color: #ff0000;
		}
	}
</style>