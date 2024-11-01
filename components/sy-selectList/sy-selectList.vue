<template>
	<view>
		<uni-forms>
			<template v-for="(item,i) in selectList" :key="i">
				<template v-if="item.type==0">
					<uni-forms-item v-if="item.show" :label="item.lable" label-width='90'>
						<view class="tiembox">
							<uni-data-checkbox @change="selectionChange" v-model="item.selectedValue"
								:localdata="item.items" />
						</view>
					</uni-forms-item>
				</template>
				<template v-else>
					<uni-forms-item v-if="item.show" :label="item.lable" label-width='90'>
						<view class="tiembox">
							<uni-data-checkbox :disabled="true" @change="selectionChange" v-model="item.selectedValue"
								:localdata="item.items" />
						</view>											
							<slot :name="item.name" :data="item.selectedValue">{{item.name}}</slot>					
					</uni-forms-item>
				</template>
			</template>
		</uni-forms>

	</view>
</template>

<script lang="ts" setup>
	interface ISelectItem {
		name: string
		type: number
		lable: string
		show: boolean
		items: Array < Object >
			selectedValue: number
	}

	interface TableProps {
		selectList: Array < ISelectItem >

	}

	const props = defineProps < TableProps > ();


	interface EmitEvent {
		(e: "selection-change", params: Array < Object > ): void; // 当选择项发生变化时会触发该事件
	}
	const emit = defineEmits < EmitEvent > ();

	const selectionChange = () => {

		let selectReusltList: any= {}
		// console.log(props.selectList)
		for (let i = 0; i < props.selectList.length; i++) {
			// console.log(i)
			// console.log(props.selectList[i].name,props.selectList[i].selectedValue)
			selectReusltList[`${props.selectList[i].name}`] = props.selectList[i].selectedValue
		}

		emit("selection-change", selectReusltList);
	};
</script>

<style>

</style>
