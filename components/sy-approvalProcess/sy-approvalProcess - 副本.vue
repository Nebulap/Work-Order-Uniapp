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
				<!--一个节点-->
				<view class="oneNode" v-for="item in liucheng" :key="item.id">
					<!--左侧小球-->
					<view class="check check-danger">
						{{item.state}}
					</view>
					<view class="tag-boder">
						<view class="tag">
						</view>
					</view>
					<!--右侧内容-->
					<view class="NodeDetail">
						<!--上-->
						<view class="NodeDetail-title" >
							<!--头像-->
							<image :src="item.avatar"></image>
							<!--内容-->
							<view class="details">
								<h4>{{item.name}}</h4>
								<view>{{item.state}}</view>
							</view>
						</view>
						<!--中-->
						<view class="NodeDetail-content">
							<text class="badge">回复:</text>
							<view>{{item.content}}</view>
						</view>
						<!--下-->
						<view class="NodeDetail-footer">
							<text>{{item.time}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				liucheng: [{
					id: 1,
					state: "审批",
					avatar: '../../../static/headImg.jpg',
					name: "李四",
					content: "巴拉巴拉巴拉",
					time: "2023.10.13"
				}, {
					id: 2,
					state: "审批",
					avatar: '../../../static/headImg.jpg',
					name: "李四",
					content: "巴拉巴拉巴拉",
					time: "2023.10.13"
				}]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
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