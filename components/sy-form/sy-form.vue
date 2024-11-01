<template>
	<view class="auto-form">
		<view class="example">
			<!-- 动态表单校验 -->
			<uni-forms ref="dynamicForm" :model="dynamicFormData" labelWidth="80px" :readonly="isReadonly">
				<uni-forms-item v-for="(item,index) in dynamicFormData.formdatas" :key="item.id+''+index"
					:label="item.label" :required="item.rules[0].required" :rules="item.rules"
					:name="['formdatas',index,'value']">
					<view class="form-item">
						<uni-easyinput v-if="item.type==='text'" v-model="item.value" :placeholder="item.placeholder" :disabled="item.key=='Id'"/>
						<uni-data-checkbox v-else-if="item.type==='radio'" v-model="item.value"
							:localdata="item.list" />
						<uni-data-checkbox v-else-if="item.type==='checkbox'" v-model="item.value" multiple
							:localdata="item.hobbys" />
						<uni-datetime-picker v-else-if="item.type==='datetime'" type="datetime" return-type="string"
							v-model="item.value" />
						<uni-data-picker v-else-if="item.type==='datapicker'" v-model="item.value"
							:localdata="item.cityData" :popup-title="item.label"></uni-data-picker>
						<uni-data-select v-else-if="item.type==='dataselect'" v-model="item.value"
							:localdata="item.skillsRange"></uni-data-select>
						<uni-easyinput v-else-if="item.type==='textarea'" type="textarea" v-model="item.value"
							:placeholder="item.placeholder" />

						<!-- <button class="button" size="mini" type="default" @click="del(item.id)">删除</button> -->
					</view>
				</uni-forms-item>
			</uni-forms>
			<!-- 		<view class="button-group">
				<button type="primary" size="mini" @click="add">新增域名</button>
				<button type="primary" size="mini" @click="submitClick()">提交</button>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 动态表单数据

				isReadonly: this.readonly,
			}
		},

		props: {
			// 传入一个包含对象的数组，构建表单
			dynamicFormData: {
				default: () => {
					formdatas: []
				}
			},
			readonly: Boolean
		},
		watch: {
			dynamicFormData: {

			},
		},
		computed: {
			// 处理表单排列切换
			alignment() {
				if (this.current === 0) return 'left'
				if (this.current === 1) return 'top'
				return 'left'
			}
		},
		created() {
			// console.log('表单数据',this.dynamicFormData);
		},
		onLoad() {

		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行

		},
		methods: {
			onClickItem(e) {
				// console.log(e);
				this.current = e.currentIndex
			},
			add() {
				this.dynamicFormData.formdatas.push({
					label: '域名',
					value: '',
					type: 'text',
					rules: [{
						'required': true,
						errorMessage: '域名项必填'
					}],
					id: Date.now()
				})
			},
			del(id) {
				let index = this.dynamicLists.findIndex(v => v.id === id)
				this.dynamicLists.splice(index, 1)
			},
			submitClick() {
				let submitData = {}
				// console.log(this.dynamicFormData.formdatas);
				this.$refs.dynamicForm.validate().then(res => {
					// console.log(this.dynamicFormData.formdatas);

					for (let i = 0; i < this.dynamicFormData.formdatas.length; i++) {
						// if (formData[i].type === 'file') {
						//     submitData[formData[i].rules.name] = formData[i].rules.fileList;
						//     break;
						// }
						submitData[this.dynamicFormData.formdatas[i].id] = this.dynamicFormData.formdatas[i].value;

					}
					this.$emit('submitFrom', submitData)

					// console.log('success', submitData);
					// return submitData;
					// uni.showToast({
					// 	title: `校验通过`
					// })

				}).catch(err => {

					console.log('err', err);
				})
			},

		}

	}
</script>

<style lang="scss">
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		line-height: 35px;
		margin-left: 10px;
	}
</style>