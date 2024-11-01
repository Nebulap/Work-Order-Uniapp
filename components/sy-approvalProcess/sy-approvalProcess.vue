<template>
	<view class="content">
		<!--事件时间轴-->
		<view class="flowChart">
			<!--左侧轴-->
			<view class="flowChart-left">
				<!--虚线-->
				<view class="dashed"></view>
			</view>
			<!--右侧内容-->
			<view class="flowChart-right">
				<!-- 开始节点 -->
				<view class="oneNode">
					<!--左侧小球-->
					<view class="check check-danger">
						<!-- <image :src="item.avatar"></image> -->
					</view>
					<view class="tag-boder">
						<view class="tag">
						</view>
					</view>
					<!--右侧内容-->
					<view class="NodeDetail">
						<!--上-->
						<view class="NodeDetail-title">
							<!--头像-->
							
							<!-- <image :src="item.avatar"></image> -->
							<!--内容-->
							<view class="details">
								<h4>发起申请</h4>
								<view>{{LaunchData.LaunchUserName}}</view>
							</view>
							<text>{{LaunchData.LaunchCreateTime}}</text>
						</view>

					</view>
				</view>
				<!--一个节点-->
				<view class="oneNode" v-for="item in liucheng" :key="item.id">
					<!--左侧小球-->
					<view class="check check-danger">
						<!-- <image :src="item.avatar"></image> -->
					</view>
					<view class="tag-boder">
						<view class="tag">
						</view>
					</view>
					<!--右侧内容-->
					<view class="NodeDetail">
						<!--上-->
						<view class="NodeDetail-title">
							<!--头像-->
							<!-- <image :src="item.avatar"></image> -->
							<!--内容-->
							<view class="details">
								<h4>{{item.CurrentTaskStatus}}</h4>
								<view>{{item.HandlePersons}}</view>
							</view>
							<view class="" style="display: flex;flex-direction: column;align-items: center;">
								<text>{{item.LastHandTime=="1970-01-01"?"":item.LastHandTime}}</text>
								<button type="primary" size="mini" @click="poupRecord(item)">处理记录</button>
							</view>

						</view>
						<!--中-->
						<view class="NodeDetail-content" v-if="item.ApproverCommentMessage">
							<!-- <text class="badge">评论:</text> -->
							<view v-for="items in item.ApproverCommentMessage" class="comment">
								<view>
									{{items.CommentMessage}}
								</view>
								<image :src="item.url" v-for="item in items.Picture"></image>
							</view>
							<view style="border-bottom: 1px solid #8c8c8c;"></view>
							<view v-for="items in item.CommentMessage" class="comment">
								<view style="display: flex;justify-content: space-between;">
									<view class="comment-name badge">{{items.UserName}}</view>
									<view>{{items.CreateTime}}</view>
								</view>
								<view class="comment-message">{{items.CommentMessage}}</view>
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popupDispose" background-color="#fff">
			<view class="popup-content" v-for="item in Record">
				<view class="popup-item">
					<view class="popup-label">处理时间：</view>
					<view class="popup-value">{{item.HandleTime}}</view>
				</view>
				<view class="popup-item">
					<view class="popup-label">处理结果：</view>
					<view class="popup-value">{{item.HandleResult}}</view>
				</view>
				<view class="popup-item">
					<view class="popup-label">处理人：</view>
					<view class="popup-value">{{item.HandUserName}}</view>
				</view>
			</view>

		</uni-popup>
	</view>
</template>

<script>
	import {
		formatTime
	} from '@/util/timeUtil';
	export default {
		props: ['liucheng', "LaunchData"],
		data() {
			return {
				popupDispose: null,
				title: 'Hello',
				Record: [],
				// LaunchData:{LaunchCreateTime:'2023-10-22',LaunchUserName:"aa"},
				// liucheng: [{
				// 	id: 1,
				// 	CurrentTaskStatus: "已处理",
				// 	// avatar: '../../../static/headImg.jpg',
				// 	HandlePersons: "李四",
				// 	ApproverCommentMessage: [{
				// 		CommentMessage: "裂开就打开了",
				// 	}, {
				// 		CommentMessage: "哈SDK哈萨克",
				// 	}],
				// 	LastHandTime: "2023.10.13",
				// 	CommentMessage: [{
				// 		UserName: "张三:",
				// 		CommentMessage: "我阿迪阿呆及奥四季豆"
				// 	}, {
				// 		UserName: "张三:",
				// 		CommentMessage: "萨达是京东怕就怕"
				// 	}]
				// }]
			}
		},
		onLoad() {

		},
		methods: {

			poupRecord(val) {
				// console.log(val.Record);
				if (val.Record && val.Record.length > 0) {
					val.Record.forEach(item => {
						item.HandleTime = formatTime(item.HandleTime).date;
					});
				}
				this.Record = val.Record
				if (val.Record.length == 0) {
					uni.showToast({
						title: "处理记录为空",
						icon: "none"
					})
					return
				}
				this.$refs.popupDispose.open('bottom')
			}
		}
	}
</script>

<style>
	.popup-content {

		border: 1px solid;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		border-radius: 5px;
		padding: 10px;
		margin: 10px;
	}

	.popup-item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.popup-label {
		width: 80px;
		font-weight: bold;
	}

	.popup-value {
		flex-grow: 1;
	}



	.comment {
		display: flex;
		margin-bottom: 10px;
	}

	.comment-name {
		font-weight: bold;
		width: 30%;
	}

	.comment-message {
		margin-left: 10px;
	}

	.flowChart {
		background-color: rgb(245, 245, 245);
		padding: 12px;
		display: flex;
	}

	.flowChart-left {
		width: 50px;
		flex-shrink: 0;
	}

	.flowChart .dashed {
		width: 0px;
		height: 100%;
		margin-left: 50%;
		border-left-style: dashed;
		border-left-color: darkgray;
		border-left-width: 2px;
	}

	.flowChart-right {
		flex-grow: 1;
	}

	.flowChart .oneNode {
		display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: 14px;
	}

	.flowChart .check {
		width: 40px;
		height: 40px;
		border-radius: 50px;
		line-height: 40px;
		color: white;
		font-size: 12px;
		text-align: center;
		position: relative;
		left: -49px;
		flex-shrink: 0;
		background-color: rgb(125, 122, 117);
		border: 4px solid rgb(173, 168, 163);
	}

	.flowChart .check-success {
		background-color: rgb(87, 194, 64);
		border: 4px solid rgba(198, 228, 177, 0.9);
	}

	.flowChart .check-danger {
		background-color: rgb(228, 108, 35);
		border: 4px solid rgb(250, 166, 122);
	}

	.flowChart .check-prime {
		background-color: rgb(0, 136, 165);
		border: 4px solid rgb(88, 191, 243);
	}

	.flowChart .check-warning {
		background-color: rgb(248, 144, 2);
		border: 4px solid rgba(255, 208, 122, 1);
	}

	.flowChart .NodeDetail {
		background-color: white;
		margin-left: -60px;
		flex-grow: 1;
		border: 1px solid gainsboro;
		border-radius: 3px;
		padding: 14px;
		display: flex;
		flex-direction: column;
		box-shadow: 1px 1px 3px gainsboro;
	}

	.flowChart image {
		width: 40px;
		height: 40px;
		border-radius: 20px;
	}

	.NodeDetail .details {
		flex-grow: 1;
		padding-left: 8px;
		margin-left: 8px;
		border-left: 4px solid rgb(72, 108, 160);
	}

	.details view {
		color: rgb(154, 154, 154);
		font-size: 14px;
		font-weight: 100;
	}

	.NodeDetail-title {
		display: flex;
		margin-bottom: 10px;
	}

	.NodeDetail-content {
		flex-grow: 1;
	}

	.NodeDetail-content view {
		text-indent: 2em;
		text-align: justify;
		font-size: 14px;
	}

	.NodeDetail-footer {
		margin-top: 10px;
	}

	.NodeDetail-footer text {
		font-size: 12px;
		font-weight: 100;
		color: rgb(104, 104, 104);
		float: right;
	}

	.badge {
		width: 40%;
		padding: 2px 5px;
		font-size: 12px;
		background-color: rgb(72, 108, 160);
		border-radius: 10px;
		font-weight: 100;
		color: white;
		letter-spacing: 2px;
		box-shadow: 1px 1px 1px gainsboro;
	}

	.BadgeGray {
		background-color: rgb(104, 108, 104);
	}

	.tag {
		width: 0;
		height: 0;
		border: 14px solid;
		border-style: dashed;
		border-color: transparent white transparent transparent;
		position: absolute;
		left: -13px;
		top: -14px;
	}

	.tag-boder {
		width: 0;
		height: 0;
		border: 12px solid;
		border-style: dashed;
		border-color: transparent gainsboro transparent transparent;
		position: relative;
		left: -59px;
	}

	.NodeDetail-content view {
		margin-top: 7px;
	}
</style>