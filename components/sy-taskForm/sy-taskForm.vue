<template>
  <uni-section :title="showDelete?'草稿箱':'工单创建'" type="line"/>
  <view class="box">
    <!-- 基础表单校验 -->
    <uni-forms ref="valiForm" :rules="addRules" :modelValue="valiFormData">
      <uni-forms-item label="标题" name="Title" required>
        <uni-easyinput v-model="valiFormData.Title" placeholder="请输入标题"/>
      </uni-forms-item>
      <uni-forms-item label="内容" name="Content" required>
        <uni-easyinput v-model="valiFormData.Content" placeholder="请输入内容" type="textarea"/>
      </uni-forms-item>
      <uni-forms-item label="处理部门" name="AcceptDepartmentId" required="">
        <uni-data-picker placeholder="请选择部门" popup-title="请选择部门" :localdata="dataTree"
                         v-model="valiFormData.AcceptDepartmentId" @change="changeDepartmentId">
        </uni-data-picker>
      </uni-forms-item>
      <uni-forms-item label="处理人" name="AcceptManId">
        <uni-data-select v-model="valiFormData.AcceptManId" :localdata="candidates" :clear="false"
                         placeholder="请选择或输入处理人"></uni-data-select>
      </uni-forms-item>
      <uni-forms-item label="预计完成时间" name="RequiredCompletionTime">
        <uni-datetime-picker type="date" v-model="valiFormData.RequiredCompletionTime"/>
      </uni-forms-item>
      <!--			<view class="fujianBox">-->
      <!--				<uni-file-picker file-mediatype="all" @select="select" title="上传附件" @delete='deleteFile' border=false-->
      <!--					value="HarmonizeFile" return-type="array">-->
      <!--				</uni-file-picker>-->
      <!--			</view>-->
    </uni-forms>
  </view>

  <view class="view">
    <view class="button-item" v-if="showDelete" @click="clickDelete">
      <image src="@/static/icon_delete.png" mode="widthFix"></image>
      <text>删除</text>
    </view>
    <view class="button-item" v-else @click="clickDraft ">
      <image src="@/static/icon_draft.png" mode="widthFix"></image>
      <text>存草稿</text>
    </view>
    <button @click="submit" class="btn-submit">提交</button>
  </view>
</template>

<script setup lang="ts">
import {
  onMounted,
  toRefs,
  reactive
} from "vue";
import {
  userStore
} from '@/store/user-store'
import {
  storeToRefs
} from "pinia"
import {WorkOrderHistory, WorkOrderService} from "../../api/workOrderService";
import {UserService} from "../../api/userService";
import {BaseSearchIdDto} from "../../model/Base/BaseDto";
import {ChangeDepartmentKeysUtil} from "../../util/changekeys";
// import { upLoadService } from "../../api/upLoadFile";

// 传入属性的接口
interface ItemProps {
  showDelete: boolean;
  formType: string
  Id: number;
}

//设置传入属性
const props = defineProps<ItemProps>();

// 设置事件
interface EmitEvent {
  (e: "formSubmitted"): void; // 当选项被点击时会触发该事件
}

const emit = defineEmits<EmitEvent>();

const userstore = userStore()
const {
  userInfo
} = storeToRefs(userstore);
const {
  valiForm,
  valiFormData,
  dataTree,
  candidates,
  fileInfo
} = toRefs(reactive({
  valiForm: false as any,
  valiFormData: {},//不能是对象
  dataTree: [] as any,
  candidates: [] as any,
  fileInfo: [] as any
}))
const addRules = reactive({
  Title: {
    rules: [{
      required: true,
      errorMessage: '标题不能为空'
    }]
  },
  Content: {
    rules: [{
      required: true,
      errorMessage: '内容不能为空'
    }]
  }
})
onMounted(async () => {
  await getDepartment()
  console.log(props.Id);
  if (props.Id != undefined && props.formType != 'childWorkOrde') {
    let data: any = await WorkOrderService.GetWorkOrderTaskbyId({Id: props.Id})
    if (!!data.RequiredCompletionTime) {
      data.RequiredCompletionTime = data.RequiredCompletionTime.split("T")[0]
    }
    valiFormData.value = data[0]
  }
})
const getDepartment = async () => {
  // 暂不清楚部门关系
  // const para = new BaseSearchIdDto({ Id: 100000 })
  let data = await UserService.GetSubDepartments()
  dataTree.value = data.map(i=>({value:i.Id,text:i.DepartmentName}))
  // const myArray = [];
  // myArray.push(data[0]);
  // if (data != null) {
  // 	ChangeDepartmentKeysUtil.changeObjectKeys(ChangeDepartmentKeysUtil.newMap, myArray);
  // 	dataTree.value = myArray;
  // }
}

// 附件---删除

// 改变部门ID获取的处理人
const changeDepartmentId = async (e: any) => {
  let departmentValue = e.detail.value[0];
  let data = await UserService.GetAllUsersByDepartmentId({
    DepartmentId: departmentValue.value
  })
  const convertedArray = data.map((item: any) => {
    return {
      value: item.Id,
      text: item.UserName,
    };
  });
  candidates.value = convertedArray;
  // console.log(candidates.value);
}

// 总提交执行的方法
const submit = async () => {
  console.log(fileInfo.value.length !== 0);
  valiForm.value.validate().then(async (res: any) => {
    res.InitiatorId = userInfo.value.Id;
    res.InitiatorDepartmentId = userInfo.value.DepartmentId;
    res.State = 1;
    // 添加草稿
    if (props.showDelete == "true" || props.formType == "processReturn") {
      res.Id = props.Id;
      let data = await WorkOrderService.UpdateWorkOrder(res);
      if (data.code == 200) {
        uni.showToast({
          title: data.msg
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 2000);
      }
      // 添加子工单
    } else if (props.formType == 'childWorkOrde' && props.formType != undefined) {
      res.TaskUpId = props.Id;
      let data = await WorkOrderService.AddWorkOrder(res);
      let historyData: any = await WorkOrderHistory.AddWorkOrderHistory({Action: '子工单创建', UserId: userInfo.value.Id, WorkOrderId: props.Id, ChildrenWorkOrderId: data.Id})
      emit("formSubmitted");
      if (!!data) {
        valiFormData.value = {}
        uni.showToast({
          title: "工单添加成功"
        });

      }
    } else {
      // 工单创建
      let data = await WorkOrderService.AddWorkOrder(res);
      if (!!data) {
        uni.showToast({
          title: "工单添加成功"
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 2000);
      }
    }
  }).catch(err => {
    console.log('err', err);
  });
}


const clickDelete = async () => {
  uni.showModal({
    title: '提示',
    content: '确定删除该草稿',
    success: async function (res) {
      if (res.confirm) {
        let data = await WorkOrderService.DeleteWorkOrderById({Id: props.Id, force: true})
        console.log(data);
        uni.navigateBack()
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
const clickDraft = async () => {
  valiForm.value.validate().then(async (res: any) => {
    res.InitiatorId = userInfo.value.Id;
    res.InitiatorDepartmentId = userInfo.value.DepartmentId;
    res.State = 0
    if (!!props.formType && props.formType == 'processReturn') {
      res.Id = props.Id
      let data = await WorkOrderService.UpdateWorkOrder(res)
      if (!!data) {
        uni.showToast({
          title: "草稿保存成功",
        })
        setTimeout(() => {
          uni.navigateBack();
        }, 2000);
      }

    } else if (props.formType == 'childWorkOrde') {
      res.TaskUpId = props.Id
      let data = await WorkOrderService.AddWorkOrder(res)
      if (!!data) {
        uni.showToast({
          title: "草稿保存成功",
        })
        setTimeout(() => {
          uni.navigateBack();
        }, 2000);
      }
    } else {
      let data = await WorkOrderService.AddWorkOrder(res)
      if (!!data) {
        uni.showToast({
          title: "草稿保存成功",
        })
        setTimeout(() => {
          uni.navigateBack();
        }, 2000);
      }
    }

  }).catch(err => {
    console.log('err', err);
  })
}
</script>

<style lang="scss">
.box {
  padding: 10px;
}

.view {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  background-color: #f5f5f5;
  align-items: center;

  .button-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 5px;

    text {
      font-size: 14px;
    }

    image {
      width: 20px;
      height: 20px;
    }
  }

  .btn-submit {
    flex: 1;
    margin: 10px;
    background-color: #007bff;
    color: white;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
