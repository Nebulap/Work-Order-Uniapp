<template>
	<view>
		<sy-form ref="dynamicForm" :dynamicFormData="formArr" @submitFrom="handleFormSubmit"></sy-form>
		<sy-fileupload @update-file-lists="handleUpdateFileLists"></sy-fileupload>
		<button class="btn" type="primary" @click="submitClick">提交</button>
	</view>
</template>

<script setup lang="ts">
	import { reactive, toRefs, watch, ref, } from "vue";
	interface ItemProps {
		api : {
			type : Object,
			required : true
		}
	}
	//设置传入属性
	const props = defineProps<ItemProps>();
	// 设置事件
	const { formArr, submitData, dynamicForm } = toRefs(reactive({
		formArr: {
			formdatas: [
				{
					id: "comments",
					placeholder: "请输入你的评论",
					label: "评论",
					type: "textarea",
					value: "",
					rules: [{
						required: true,

					}],
				},

			]
		},
		submitData: {},
		dynamicForm: null
	}))
	const handleUpdateFileLists = (fileList) => {
		console.log(fileList, '父组件接的参数');
		const idArray = fileList.map(obj => obj.Id);
		const idString = idArray.join(',');
		// console.log(idArray);
		submitData.value.ids = idString
		console.log(submitData.value.ids, "组件图片Id");
	}
	const handleFormSubmit = (val) => {
		// 在父组件中处理子组件传递过来的 数据
		submitData.value.comments = val.comments
	
		// 调用父组件的api
		props.api.getData(submitData.value);
	}
	const submitClick = () => {
		dynamicForm.value.submitClick();
	}
</script>

<style>
	.btn {
		width: 80%;
		border-radius: 10px;
	}
</style>