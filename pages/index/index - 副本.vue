<template>
	<view class="content">
		<syTopBar style="margin-top: 50px;"></syTopBar>
		<swiper class="swiper" circular indicator-active-color="#0aa1ed" :indicator-dots="true" :autoplay="true"
			:interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperList" :key="item.Id">
				<image :src="item.url" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
	</view>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
			activeColor="#0aa1ed"></uni-segmented-control>
		<view>
			<view v-show="current === 0">
				<view v-for="item in HomePageShowList">
					<view class="textBox">
						<view class="left-right-line">{{item.ContentsTypeName}}</view>
					</view>
					<uni-list v-for="item2 in item.HomepageShows" :key="item.Id">
						<uni-list-item :title="item2.Title" ellipsis="2" link
							@click="jumpPage(item2.HTML)"></uni-list-item>
					</uni-list>
				</view>
			</view>
			<view v-show="current === 1">
				<uni-card v-for="item in learningPlatformChildNodeList" :title="item.ContentsTypeName" extra="更多">
					<uni-list v-for="item2 in item.HomepageShows"
						v-if="item.HomepageShows && item.HomepageShows.length > 0">
						<uni-list-item :title="item2.Title" @click="jumpPage(item2.HTML)" link></uni-list-item>
					</uni-list>
				</uni-card>
			</view>
			<view v-show="current === 2">
				<uni-collapse>
					<view v-for="item in documentationChildNodeList">
						<uni-collapse-item :title="item.ContentsTypeName" :show-animation="true">
							<uni-list v-for="item2 in item.HomepageShows"
								v-if="item.HomepageShows && item.HomepageShows.length > 0">
								<uni-list-item :title="item2.Title" link @click="jumpPage(item2.HTML)"></uni-list-item>
							</uni-list>
						</uni-collapse-item>
					</view>
				</uni-collapse>
			</view>
			<view v-show="current === 3">
				<uni-collapse v-for="item in WorkDeploymentChildNodeList">
					<uni-collapse-item :title="item.ContentsTypeName" :show-animation="true">
						<uni-list v-for="item2 in item.HomepageShows"
							v-if="item.HomepageShows && item.HomepageShows.length > 0">
							<uni-list-item :title="item2.Title" link @click="jumpPage(item2.HTML)"></uni-list-item>
						</uni-list>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
	</view>

	<!-- <navigator url="../../page_me/register/register">注册</navigator> -->
	<!-- <text>|</text> -->
	<view class="footer">
		<view class="f1">
			<navigator url="../../page_me/loginMain/loginMain">登录</navigator>
			<text>|</text>

			<text @click="manServe">人工服务</text>
			<text>|</text>
			<text @click="goTop">返回顶部</text>
		</view>
		<view class="f2">
			<text>世源科技 © 版权所有 2002-2022</text>
		</view>
	</view>
	<syGoTop></syGoTop>
</template>

<script lang="ts" setup>
	import {
		reactive,
		toRefs
	} from "vue";
	import {
		onShareAppMessage,
	} from '@dcloudio/uni-app';
	import { HomePageService } from "../../api/homePageService";
	import {
		onShow
	} from "@dcloudio/uni-app";
	onShow(() => {
		swiper()
		// learningPlatform()
		HomePageShow()
		learningPlatformChildNode()
		documentationChildNode()
		WorkDeploymentChildNode()
	})
	const { items, current, swiperList, learningPlatformList, HomePageShowList, learningPlatformChildNodeList, documentationChildNodeList, WorkDeploymentChildNodeList } = toRefs(reactive({
		swiperList: [],
		learningPlatformChildNodeList: [],
		learningPlatformList: [],
		documentationChildNodeList: [],
		WorkDeploymentChildNodeList: [],
		items: ['首页', '学习平台', '文件汇编', '工作部署',],
		current: 0,
		HomePageShowList: []
	}))
	const swiper = async () => {
		let result = await HomePageService.ShowHomepageByTypeId({ ContentsTypeId: 1 })
		console.log(result, 'aaaaa');
		swiperList.value = result
	}

	const HomePageShow = async () => {
		let result = await HomePageService.GetHomepageShowTreeByContentsTypeId({ ContentsTypeId: 2 })
		// console.log(result, '第一页');
		HomePageShowList.value = result[0].HomepageContentsTypes
		console.log(HomePageShowList.value, "第一页");

	}
	const learningPlatformChildNode = async () => {
		let result = await HomePageService.GetHomepageShowTreeByContentsTypeId({ ContentsTypeId: 3 })
		// console.log(result[0].HomepageContentsTypes);
		learningPlatformChildNodeList.value = result[0].HomepageContentsTypes
	}
	const documentationChildNode = async () => {
		let result = await HomePageService.GetHomepageShowTreeByContentsTypeId({ ContentsTypeId: 4 })
		console.log(result[0].HomepageContentsTypes, 'aa');
		documentationChildNodeList.value = result[0].HomepageContentsTypes
	}
	const WorkDeploymentChildNode = async () => {
		let result = await HomePageService.GetHomepageShowTreeByContentsTypeId({ ContentsTypeId: 5 })
		// console.log(result[0].HomepageContentsTypes,'aa');
		WorkDeploymentChildNodeList.value = result[0].HomepageContentsTypes
	}


	onShareAppMessage(res => {
		if (res.from === 'button') { // 来自页面内分享按钮
			console.log(res.target)
		}
		return {
			title: 'SCASY工作台',
			path: '/pages/index/index'
		}
	})


	const jumpPage = (Id : number) => {
		// console.log(Id);
		uni.navigateTo({
			url: `/page_index/jumpPage/jumpPage?Id=` + encodeURIComponent(Id)
		})
	}

	const onClickItem = (e : any) => {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex;
			HomePageShow()
			learningPlatformChildNode()
			documentationChildNode()
			WorkDeploymentChildNode()
		}
	}

	const goTop = () => {
		uni.pageScrollTo({
			scrollTop: 0
		})
	}
	const manServe = () => {
		uni.showModal({
			title: '请联系管理员',
			content: '刘先生:17780505276',
			success: function (res) {
				if (res.confirm) {
					// console.log('用户点击确定');
					uni.makePhoneCall({
						phoneNumber: '17780505276'
					});
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		})
	}

</script>

<style scoped lang="scss">
	.textBox {
		margin-top: 20px;
		display: flex;
		justify-content: center;

		.left-right-line {
			color: #60c0f0;
			position: relative;
			font-size: 24px;
			font-weight: bold;
			text-transform: uppercase;
		}

		.left-right-line::before,
		.left-right-line::after {
			content: "";
			position: absolute;
			height: 2px;
			background-color: #60c0f0;
			top: 50%;
			transform: translateY(-50%);
			width: 100px;
		}

		.left-right-line::before {
			left: -120px;
		}

		.left-right-line::after {
			right: -120px;
		}
	}

	.learnBox {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.itemBox {
			display: flex; // 使用 Flexbox 布局
			flex-direction: column;
			align-items: center;
			width: 40%;
			margin: 10px;

			image {
				width: 100%; // 设置图片宽度为 100px
				height: 90px; // 高度自适应
			}

			text {
				font-size: 14px;
				color: #3b4144;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.fileBox {
		margin: 10px;
	}



	.content {
		background-image: linear-gradient(180deg, #0aa1ed, #f5f5f5);
		margin-bottom: 20px;

		.swiper {
			margin: 0 10px;
			border-radius: 6px; //6px
			overflow: hidden; //溢出容器的部分：全部隐藏 —— 容器是圆角，但是里面的图片默认是方形的，会有溢出
			height: 200px;

			image {
				width: 100%;
				// height: 200px;

			}
		}
	}

	.footer {
		margin-top: 20px;
		border-top: 1px solid #c8c7cc;
		box-shadow: 0 0 12rpx #c8c7cc;

		.f1 {
			padding: 10px 0;
			display: flex;
			justify-content: space-evenly;
		}

		.f2 {
			padding: 10px 0;
			text-align: center;
		}
	}
</style>