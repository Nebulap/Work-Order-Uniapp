<template>
	<uni-section title="用户搜索" type="line">
	</uni-section>
	<view class="sift-box">
		<view class="leftbox">
			<uni-data-select v-model="selectType" :localdata="selectMethods" @change="selectMethodChange"
				placeholder="筛选类型" :clear="false">
			</uni-data-select>
		</view>
		<view class="departmentBox" v-if="selectType==3||selectType==2">
			<uni-data-picker placeholder="请选择部门" popup-title="请选择部门"
				:localdata="selectType==3?departmentTree:companyDepartmentTree" @change="selectDepartmentchange">
			</uni-data-picker>
			<uni-data-checkbox v-model="includeSubValue" :localdata="includeSub" :multiple="true"
				@change="includeSubChange"></uni-data-checkbox>
		</view>
		<view class="rightbox" v-else-if="selectType==1">
			<uni-easyinput suffixIcon="search" v-model="inputValue" placeholder="搜索员工" @iconClick="inputValueChange">
			</uni-easyinput>
		</view>
	</view>
</template>

<script setup lang='ts'>
	import {
		onMounted,
		reactive,
		toRefs,
		watch
	} from "vue"

	import {
		UserService
	} from "@/api/UserService"

	import {
		userStore
	} from "@/store/user-store";

	// 使普通数据变响应式的函数
	import {
		storeToRefs
	} from "pinia";

	import {
		ChangeDepartmentKeysUtil
	} from "@/util/changekeys"

	import {
		BaseSearchIdDto
	} from "@/model/Base/BaseDto";
	import {
		UserSearchbyDepartmentDto,
		UserSearchDto
	} from "@/model/MDM/Dto/MDM/UserDto";

	import {
		UserViewModel
	} from "@/model/MDM/ViewModel/UserViewModel";

	interface EmitEvent {
		(e: "userlistChange", userlist: Array < UserViewModel > ): void;
	}

	const userlistChange = (userlist: Array < UserViewModel > ) => {
		emit("userlistChange", JSON.parse(JSON.stringify(userlist)));
	};
	const emit = defineEmits < EmitEvent > ();

	const userstore = userStore();
	const {
		userInfo,
	} = storeToRefs(userstore);
	const {
		includeSubValue,
		selectType,
		isselected,
		departmentTree,
		companyDepartmentTree,
		userList,
		inputValue,
		selectMethods,
		departmentId, //查询的部门ID
		includeSub
	} = toRefs(reactive({
		includeSubValue: 0,
		selectType: 1, //选择的类型
		isselected: false,
		departmentTree: [], //员工部门
		companyDepartmentTree: [], //公司部门
		userList: [],
		inputValue: "",
		includeSub: [{
			"value": 0,
			"text": "含子部门"
		}],
		selectMethods: [{
				value: 0,
				text: "未入职"
			}, {
				value: 1,
				text: "姓名"
			},
			{
				value: 2,
				text: "公司"
			},
			{
				value: 3,
				text: "部门"
			},
		],
		departmentId: 0,
		targetDepartmentId: 0
	}))

	onMounted(() => {
		getDepartments()
		getCompanyDepartmentTree()
		getNoDepartmentUsers()
	})


	//勾选是否包含子部门
	const includeSubChange = (e: any) => {
		if (departmentId.value == 0) return
		//表示选中了，要查询子部门
		getAllUsersbyDepartment(departmentId.value, includeSubValue.value.length > 0)

	}

	// 获取用户部门名称接口
	const getDepartments = async () => {
		// console.log(userInfo.value.UserDepartmentID)
		let data: any = await UserService.GetSubDepartments(new BaseSearchIdDto({
			Id: userInfo.value.UserDepartmentID
		}))
		// console.log('getDepartments:', data);
		ChangeDepartmentKeysUtil.changeObjectKeys(ChangeDepartmentKeysUtil.map, data)
		// console.log('changed:', data);
		departmentTree.value = data
	}

	//获取整个公司部门
	const getCompanyDepartmentTree = async () => {
		// console.log(userInfo.value.UserDepartmentID)
		let data: any = await UserService.GetSubDepartments(new BaseSearchIdDto({
			Id: 100000
		}))
		// console.log('getCompanyDepartmentTree:', data);
		ChangeDepartmentKeysUtil.changeObjectKeys(ChangeDepartmentKeysUtil.map, data)
		// console.log('changed:', data);
		companyDepartmentTree.value = data
	}



	//获取部门所有用户
	const getAllUsersbyDepartment = async (departmentid: number, IncludeSub: boolean = false) => {
		// console.log('IncludeSub', IncludeSub)
		let data: any = await UserService.GetAllUsersByDepartmentId(new UserSearchbyDepartmentDto({
			DepartmentId: departmentid,
			IncludeSub
		}))
		// console.log("getAllPartmentUserbyPartment", data);
		// userList.value = []
		userList.value = data
	}


	const getNoDepartmentUsers = async () => {
		let data: any = await UserService.GetUnemployedUsers()
		// console.log("getNoDepartmentUsers", data);
		// userList.value = []
		userList.value = data
	}


	// 模糊查询用户
	const getUserbyFuzzySearch = async () => {
		if (inputValue.value.length > 0) {
			let data: any = await UserService.SerachUsersbyUserName(new UserSearchDto({
				UserName: inputValue.value
			}))
			console.log("getUserbyFuzzySearch", data);
			// userList.value = []
			userList.value = data
		}
	}

	// 输入框改变
	const inputValueChange = () => {
		getUserbyFuzzySearch()
	}


	const selectDepartmentchange = (e: any) => {
		// console.log('查询的部门ID：', e.detail.value[e.detail.value.length - 1].value);
		if (e.detail.value.length == 0) {
			departmentId.value = 0
			return
		}
		departmentId.value = e.detail.value[e.detail.value.length - 1].value
		// console.log(includeSubValue.value)
		getAllUsersbyDepartment(departmentId.value, includeSubValue.value.length > 0)
	}

	// 检索方式改变
	const selectMethodChange = (e: any) => {
		//检索方式改变，初始化数据
		departmentId.value = 0
		userList.value = []
		selectType.value = e
		if (e == 0) {
			getNoDepartmentUsers()
			isselected.value = false
		} else if (e == 1) {
			// getAllPartmentuser()
			isselected.value = false
		} else if (e == 2) {
			// getAllSubpartmentUsers()
			isselected.value = true
		} else if (e == 3) {
			// getAllSubpartmentUsers()
			isselected.value = true
		}
	}
	//监听userList是否改变，改变了就触发事件
	watch(userList, (newValue: Array < UserViewModel > , oldValue: Array < UserViewModel > ) => {
		// console.log('UserListNew:', newValue)
		// console.log('UserListOld:', oldValue)
		userlistChange(newValue)
	})
</script>


<style lang="scss">
	.sift-box {
		display: flex;
		align-items: center;
		// justify-content: space-between;
		padding: 5px;

		.rightbox {
			flex: 1;
		}

		.departmentBox {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;

			uni-data-picker {
				flex: 1;
			}

			.uni-data-checklist {
				flex: none !important;
			}
		}

	}
</style>