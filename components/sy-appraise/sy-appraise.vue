<template>
	<view class="appraiseBox">
		<uni-forms ref="appraiseForm" :rules="appraiseRules" :model="appraiseData">
			<uni-forms-item label="星级" name="rateValue" style="align-items: center;">
				<uni-rate v-model="appraiseData.rateValue" />
			</uni-forms-item>
			<uni-forms-item label="评价" name="appraise">
				<uni-easyinput placeholder="请输入评价" v-model="appraiseData.appraise" type="textarea" />
			</uni-forms-item>
			<button @click="Submit" class="btn-save">提交</button>
		</uni-forms>
	</view>
	<uni-swipe-action>
		<uni-swipe-action-item v-for="item in AppraiseManData" :key="item.Id" :right-options="options"
			@click="bindClick(item.Id, $event)">
			<view class="comment-card">
				<image :src="item.User.UserAvatarUrl"></image>
				<view class="right-box">
					<view class="name">{{item.User.UserName}}</view>
					<view class="right-title">
						{{ item.Comments ? item.Comments : item.Comment }}
					</view>
				</view>
				<view class="left-box">
					<view class="time">
						{{item.createdAt.slice(0, 19).replace('T', ' ')}}
					</view>
					<view class="star">
						<uni-rate :max="5" :value="item.Star" :readonly="true" :size="18" />
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
		Ref
	} from 'vue';
	let {
		appraiseForm,
		appraiseData,
		options,
		appraiseRules
	} : {
		appraiseForm : Ref<any>;
		appraiseData : Ref<{
			rateValue : any;
			appraise : any;
		}>;
		options : Ref<any[]>;

		appraiseRules : Ref<any>
	} = toRefs(
		reactive({
			appraiseForm: 0,
			options: [{
				text: '删除',
				style: {
					backgroundColor: '#dd524d'
				}
			}],
			appraiseRules: {
				rateValue: {
					rules: [{
						required: true,
						errorMessage: '星级不能为空'
					}]
				},
				appraise: {
					rules: [{
						required: true,
						errorMessage: '评价不能为空'
					}]
				}
			},
			appraiseData: {
				rateValue: 0,
				appraise: ""
			},

		})
	);
	
	// 传入属性的接口
	interface ItemProps {
		AppraiseManData : Array<object>;
	}
	//设置传入属性
	const props = defineProps<ItemProps>();
	// 设置事件
	interface EmitEvent {
		(e : "itemClick", item : object) : void; // 当选项被点击时会触发该事件
		(e : 'deleteClick', item : number) : void
	}
	const emit = defineEmits<EmitEvent>();
	// 定义一个异步函数 bindClick，用于处理建议卡片中的按钮点击事件	//删除
	const bindClick = async (id : number, event : Record<string, any>) => {
		// 如果点击了第一个按钮（删除），弹出确认框并执行删除操作
		if (event.index == 0) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该评论吗？',
				success: async (res) => {
					if (res.confirm) {
						emit("deleteClick", id)
					} else if (res.cancel) {
						// 用户点击了取消按钮，不执行任何操作
					}
				}
			});
		}
	}
	// 定义一个名为 submit 的箭头函数，用于处理提交按钮的点击事件
	const Submit = async () => {
		try {
			// 调用表单组件的 validate 方法进行表单验证，并返回 Promise 对象
			const values = await appraiseForm.value.validate();
			// 如果表单验证通过，则将表单数据存储在 appraiseInfo 对象中
			emit("itemClick", values)
			// 清空输入框的值		
			appraiseData.value.rateValue = ""
			appraiseData.value.appraise = ""
			// 将新添加的评论数据添加到 AppraiseManData 数组中
			// AppraiseManData.value.push(commentData.data)
		} catch (error) {
			// 如果表单验证失败，则输出错误信息到控制台
			console.error(error);
		}
	};
	
</script>

<style lang="scss" scoped>
	.appraiseBox {
		padding: 12px 15px;

		.btn-save {
			background-color: #2979ff;
			width: 65%;
			border-radius: 22.5px;
			color: white;
			font-weight: bold;
		}
	}

	// 定义整个卡片的样式
	.comment-card {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #ffffff;
		padding: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0 5rpx 5rpx rgba(0, 0, 0, 0.1);
		margin-bottom: 20rpx;

		// 图片样式
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 20rpx;
			background-color: red;
		}

		// 右边盒子的样式
		.right-box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			height: 100rpx;

			// 名称样式
			.name {
				// width: 100%;
				height: 30rpx;
				// background-color: #f2f2f2;
				border-radius: 5rpx;
			}

			// 标题样式
			.right-title {
				font-size: 30rpx;
				color: #333333;
				width: 180px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		// 左边盒子的样式
		.left-box {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: space-between;
			height: 100rpx;

			// 时间样式
			.time {
				font-size: 24rpx;
				color: #999999;
			}

			// 星星样式
			.star {
				font-size: 28rpx;
				color: #ff9900;
			}
		}
	}
</style>