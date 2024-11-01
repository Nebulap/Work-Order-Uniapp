<template>
	<view class="calendarBox">
		<!-- 插入模式 -->
		<uni-calendar :selected="selected" :showMonth="false" @change="change" @monthSwitch="monthSwitch" />
	</view>

	<view class="daKaRecord" v-if="Object.keys(punchRecords).length!==0">
		<view class="topBOx">{{punchRecords.date}}打卡记录</view>
		<view class="centerBOx">{{punchRecords.data.punchIn}}</view>
		<view class="bottomBOx">{{punchRecords.data.punchOut}}</view>
	</view>

</template>

<script setup lang="ts">
	import { onMounted, reactive, toRefs } from "vue";
	const { selected, punchRecords
	} = toRefs(reactive({
		selected: [],
		punchRecords: {}
	}))
	onMounted(() => {
		selected.value = [{
			date: "2023-12-17",
			data: {
				punchIn: "9:00",
				punchOut: "18:00",
			}
		}]
	})
	const change = (e) => {
		console.log('change 返回:', e.extraInfo);
		punchRecords.value = e.extraInfo
		console.log(punchRecords.value);
	}

	const monthSwitch = (e) => {
		console.log('monthSwitchs 返回:', e);
	}
</script>

<style lang="scss">
	.calendarBox {
		margin: 10px;
	}

	.daKaRecord {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 10px;
		margin: 10px;
		justify-content: space-around;
		border-radius: 5px;
		.topBOx {
			padding: 5px 0;
		}
		.centerBOx {
			padding-bottom: 5px;
			border-bottom: 1px dashed forestgreen;
		}

		.bottomBOx {
			padding: 5px 0px;

		}
	}
</style>