<template>
	<view class="content">
		<syTopBar ></syTopBar>
		<swiper class="swiper" circular indicator-active-color="#0aa1ed" :indicator-dots="true" :autoplay="true"
			:interval="3000" :duration="1000" >
			<swiper-item v-for="item in swiperList" :key="item.Id">
				<image :src="item.url" mode="widthFix" class="imageBox"></image>
			</swiper-item>
		</swiper>
	</view>
	<view class="footer">
		<view class="f1">
			<navigator url="../../page_me/loginMain/loginMain">登录</navigator>
			<text>|</text>

			<text @click="manServe">人工服务</text>
			<text>|</text>
			<text @click="goTop">返回顶部</text>
		</view>
		<view class="f2">
			<text>世源科技 © 版权所有 2002-2023</text>
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

	import {
		onShow
	} from "@dcloudio/uni-app";
	onShow(() => {
		swiper()
	})
	const {swiperList} = toRefs(reactive({
		swiperList: [],
	}))
	const swiper = async () => {
		// let result = await HomePageService.ShowHomepageByTypeId({ ContentsTypeId: 1 })
		// console.log(result, 'aaaaa');
		let result = [{ "url": "https://26128846.s21i.faiusr.com/4/ABUIABAEGAAgoKGDpgYo5OuD6wMwuAg4nwQ.png" }, { "url": "https://26128846.s21i.faiusr.com/4/ABUIABAEGAAgn6GDpgYo-4Cq6gMwuAg49wQ.png" }, { "url": "https://26128846.s21i.faiusr.com/4/ABUIABAEGAAgoKGDpgYogOvwhgIwuAg4igU.png" }]
		swiperList.value = result
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
			height: 180px;

			image {
				width: 100%;
				height: 180px;
			}
		}
	}


	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		/* 根据实际情况设定高度 */
		background-color: #f2f2f2;
		/* 设置底部背景色 */

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
