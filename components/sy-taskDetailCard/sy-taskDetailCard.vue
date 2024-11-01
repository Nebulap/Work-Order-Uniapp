<template>
  <uni-section title="工单详情" type="line">
    <uni-list v-for="item in dataList">
      <uni-list-item title="标题"/>
      <view class="textItem">
        {{ item.Title }}
      </view>
      <uni-list-item title="内容"/>
      <view class="textItem">
        {{ item.Content }}
      </view>
      <uni-list-item title="发起人" :rightText="item.UserName"/>
      <uni-list-item title="发起时间" :rightText="item.createdAt"/>
      <uni-list-item title="截止时间" :rightText="item.RequiredCompletionTime"/>

      <!--				<uni-list-item  title="附件" >-->
      <!--					<div>-->
      <!--						<web-view src="http://localhost:8090/public/upload/Temp/a394e397990512de991fbda00.txt"></web-view>-->
      <!--					</div>-->
      <!--				</uni-list-item>-->

    </uni-list>
  </uni-section>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from 'vue';
import {WorkOrderService} from '../../api/workOrderService';
import {TimeUtil} from '../../util/date';
import {GetUserInfoUtil} from '../../util/getUserInfo';

interface ItemProps {
  Id: number;
  executeData: Array;
}

//设置传入属性
const props = defineProps<ItemProps>();

// 设置事件
interface EmitEvent {
  (e: "itemClick", item: object): void; // 当选项被点击时会触发该事件
}

const emit = defineEmits<EmitEvent>();
const {dataList} = toRefs(reactive({
  dataList: [] as Array<any>
}))
onMounted(async () => {
  const list = await WorkOrderService.GetWorkOrderTaskbyId({Id: props.Id}) as  Array<any>

  for (let i = 0; i < list.length; i++){
    const item =list[i]
    item.createdAt = TimeUtil.getFomatTime(item.createdAt)
    if (!!item.RequiredCompletionTime) {
      item.RequiredCompletionTime = item.RequiredCompletionTime.split('T')[0]
    }
    item.UserName = await GetUserInfoUtil.getUserInfo(item.InitiatorId)
    dataList.value.push(item)
  }

  console.log(dataList.value)
})
</script>

<style lang="scss" scoped>


.textItem {
  color: #999;
  padding: 0px 15px;
}


</style>
