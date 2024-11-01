<template>
	<view class="uni-container">
		<uni-table ref="table" stripe border emptyText="暂无更多数据">
			<!-- 表头 -->
			<uni-tr>
				<uni-th v-for="(item,index) in tableConfig" :width="item.width" :align="item.align" :key="index"
					class="tableHeader">{{ item.label }}</uni-th>
			</uni-tr>
			<!-- 表体 -->
			<uni-tr v-for="(item, index) in tableData" :key="index" @row-click="getCurrentRow(item)">
				<uni-td v-for="(value, key) in item" align="center" v-if="key!='Id'">
					{{value}}
				</uni-td>
			</uni-tr>
		</uni-table>
		<view class="addBox" @click="addTable" v-if="showAdd">
			添加
		</view>
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content">
				<sy-form ref="dynamicForm" :dynamicFormData="formArr" @submitFrom="handleFormSubmit"></sy-form>
				<view class="btnBox">
					<button type="primary" @click="submitFrom">确定</button>
					<button type="primary" @click="deleteTable" v-if="showDeleteButton">删除</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup lang="ts">
	import { reactive, toRefs, watch } from "vue";
	const { popup, formArr, dynamicForm, editIndex, table, showDeleteButton } = toRefs(reactive({
		table: null,
		editIndex: -1,
		dynamicForm: null,
		popup: "" as any,
		showDeleteButton: false, // 初始情况下不显示删除按钮
		//表单数据
		formArr: {
			formdatas: [
			]
		},

	}))
	// 传入属性的接口
	interface ItemProps {
		tableConfig : Array<object>;
		loading : boolean;
		tableData : Array<object>;
		showAdd:boolean
	}
	//设置传入属性
	const props = defineProps<ItemProps>();

	// 设置事件
	interface EmitEvent {
		// (e : "submitTable", item : object) : void; // 当选项被点击时会触发该事件
		(e : 'update:modelValue', value : any) : void
		// 'update:modelValue' : (value : string) => void;
	}
	const emit = defineEmits(['update:modelValue'])
	// const emit = defineEmits<EmitEvent>();

	const getCurrentRow = (row : any) => {
		// console.log(row, 'aa', index);
		showDeleteButton.value = true
		popup.value.open("bottom")
		// 查找当前行的索引
		const index = props.tableData.indexOf(row);
		editIndex.value = index;
		// 如果找到了当前行，则根据索引设置其他表单数据
		// console.log(index);
		if (index !== -1) {
			props.tableConfig.map((item : any) => {
				console.log(item,'每一项的数据');
				item.id = item.key;
				item.placeholder = `请输入${item.label}`;
				item.type = "text";
				if (item.label == "发现日期") {
					item.type = "datetime";
				}
				// 设置表单字段的初始值为对应属性值
				item.value = row[item.key];
				item.rules = [{
					required: true,
					errorMessage: `${item.label}不能为空`
				}];
			})
		}
		formArr.value.formdatas = props.tableConfig
		// console.log(props.tableConfig);
	}

	//添加表单
	const addTable = () => {
		showDeleteButton.value = false
		popup.value.open("bottom")
		props.tableConfig.map((item : any) => {
			item.id = item.key;
			item.placeholder = `请输入${item.label}`;
			item.type = "text";
			if (item.label == "发现日期") {
				item.type = "datetime";
			}
			item.rules = [{
				required: true,
				errorMessage: `${item.label}不能为空`
			}];
		})
		// console.log(props.tableConfig);
		const updatedTableConfig = props.tableConfig.map(obj => {
			return { ...obj, value: "" };
		});
		formArr.value.formdatas = updatedTableConfig


	}

	//添加表单确认
	const submitFrom = () => {
		//执行子组件的方法
		dynamicForm.value.submitClick();
	}
	const handleFormSubmit = (val) => {
		// 在父组件中处理子组件传递过来的 数据
		// console.log(val, '夫组件传递的数据')
		if (editIndex.value !== -1) {
			// 执行修改操作
			// 根据 this.editIndex 在 props.tableData 中更新对应的数据项
			props.tableData[editIndex.value] = val;
			// 清空编辑状态
			editIndex.value = -1;
		} else {
			// 执行提交操作
			props.tableData.push(val);
		}
		popup.value.close("bottom")
	}
	const deleteTable = () => {
		if (editIndex.value !== -1) {
			// 在 props.tableData 中删除指定项
			props.tableData.splice(editIndex.value, 1);
			// 清空编辑状态
			editIndex.value = -1;
			popup.value.close("bottom")
		}
	}
</script>

<style lang="scss">
	// .tableHeader {
	// 	font-size: 11px;
	// 	padding: 0px;
	// 	background-color: #eee;
	// 	font-weight: 500;
	// }
	.uni-table-td {
		padding: 6px 8px;
	}

	.addBox {
		display: flex;
		justify-content: center;
		color: blue;
		padding: 5px 0;
	}

	.btnBox {
		display: flex;
		justify-content: center;
		margin-bottom: 5px;
	}
</style>