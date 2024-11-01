<template>
  <view class="dashboard">
    <view class="search-container">
      <uni-search-bar placeholder="搜索" @confirm="search" @input="search" cancel-text="取消" />
    </view>
    <view class="filter-container">
      <view class="filter-group">
        <view class="filter-label">时间筛选</view>
        <view class="button-group">
          <button
              style="margin-left: 0;margin-right: 0"
              v-for="(v,k) in timeFilterLabel"
              :key="k"
              @click="()=>timeFilterHandler(k)"
              :class="['filter-button', { active: rangeFilter === k }]"
          >
            {{ v }}
          </button>
        </view>
      </view>
      <view class="filter-group">
        <view class="filter-label">状态筛选</view>
        <view class="button-group" style="display: flex;flex-wrap: wrap">
          <button
              style="margin-left: 0;margin-right: 0"
              v-for="(v,k) in statusFilterLabel"
              :key="k"
              @click="()=>statusFilterHandler(k)"
              :class="['filter-button', { active: stateFilter === k }]"
          >
            {{ v }}
          </button>
        </view>
      </view>
    </view>

    <view class="order-list">
      <view
          v-if="workOrders.length ===0"
          class="order-card"
          style="color: #373737"
      >
        暂无工单
      </view>
      <view
          v-for="order in workOrders"
          :key="order.id"
          class="order-card"
          @click="()=>jumpaTask(order.State,order.Id,order)"
      >
        <view class="order-header">
          <h2 class="order-title">{{ order.Title }}</h2>
          <view class="order-id">工单 #{{ order.Id }}</view>
        </view>
        <view class="order-content">
          <view class="order-info">
            <uni-icons size="20" type="calendar" color="#32b8ff"/>
            <span class="info-text">创建时间: {{ order.createdAt }}</span>
          </view>
          <view class="order-info">
            <uni-icons size="20" type="calendar" color="#32b8ff"/>
            <span class="info-text">截止时间: {{ order.RequiredCompletionTime }}</span>
          </view>
          <view class="order-info">
            <uni-icons size="20" type="person" color="#32b8ff"/>
            <span class="info-text">发起人: {{ order.InitiatorName }}</span>
          </view>
        </view>
        <view class="order-footer">
          <span
              class="status-badge"
              :style="{backgroundColor:order.StateOption.bgColor}"
          >
            <uni-icons size="18" :type="order.StateOption.icon" :color="order.StateOption.color"/>
            <span style="font-weight: bold;font-size: 0.7rem" :style="{color:order.StateOption.color}">{{ order.StateOption.text }}</span>
          </span>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {onShow} from "@dcloudio/uni-app";
import {UserService} from "@/api/userService";
import {WorkOrderService} from "@/api/workOrderService";
import {WorkOrderTaskViewmodel} from "@/model/workbench/WorkOrder/ViewModel/workordertask.viewmodel";
import {ref, computed} from 'vue'
import {storeToRefs} from "pinia"
import {userStore} from '../../../store/user-store'


// 模拟工单数据
const workOrders = ref<WorkOrderTaskViewmodel>([])


const userstore = userStore()
const {userInfo} = storeToRefs(userstore);

const rangeFilter = ref('today')
const stateFilter = ref('0')

const timeFilterLabel = {
  'today': '今天',
  'thisWeek': '本周',
  'thisMonth': '本月',
  'all': '全部',
}

const timeFilterHandler = async (k: string) => {
  rangeFilter.value = k
  await search()
}

const statusFilterLabel = {
  '0': '全部',
  '1': '待接收',
  '2': '处理中',
  '3': '待审核',
  '4': '已完成',
  '6': '已驳回'
}

const statusFilterHandler = async (k: string) => {
  stateFilter.value = k
  await search()
}

//1:待处理，2：处理中，3:待审核  4:已完成 6:处理驳回
const statusMap = new Map([
  [1, {icon: "search", color: "#FFAA00", bgColor: "#FFE1A6", text: "待接收"}],   // 浅橙色背景
  [2, {icon: "loop", color: "#0080FF", bgColor: "#C6E2FF", text: "处理中"}], // 浅蓝色背景
  [3, {icon: "eye", color: "#9467BD", bgColor: "#E4D3F0", text: "待审核"}],    // 浅紫色背景
  [4, {icon: "checkmarkempty", color: "#28A745", bgColor: "#C3E6CB", text: "已完成"}], // 浅绿色背景
  [6, {icon: "closeempty", color: "#DC3545", bgColor: "#F8D7DA", text: "已驳回"}]  // 浅红色背景
]);

function jumpaTask(state: string, Id: number, item: WorkOrderTaskViewmodel) {
  console.log(item)
  const statePathMap: { [key: string]: string } = {
    '1': `/page_workbench/TaskManagement/acceptanceTask/acceptanceTask?item=${encodeURIComponent(JSON.stringify(item))}`,
    '2': `/page_workbench/TaskManagement/disposeHarmonizeTask/disposeHarmonizeTask?item=${encodeURIComponent(JSON.stringify(item))}`,
    '3': `/page_workbench/TaskManagement/disposeAuditTask/disposeAuditTask?item=${encodeURIComponent(JSON.stringify(item))}`,
    '4': `/page_workbench/TaskManagement/completedTask/completedTask?item=${encodeURIComponent(JSON.stringify(item))}`,
    '5': `/page_workbench/TaskManagement/rejectedPage/rejectedPage?item=${encodeURIComponent(JSON.stringify(item))}`,
    '6': `/page_workbench/TaskManagement/disposeHarmonizeTask/disposeHarmonizeTask?item=${encodeURIComponent(JSON.stringify(item))}`
  }

  const path = statePathMap[state]

  if (!path) return

  uni.navigateTo({
    url: path
  })
}


const getUserInfo = async (Id: number) => {
  const userInfo = await UserService.SerachAUserbyUserID({
    userID: Id
  });
  return userInfo.UserName;
}

const search = async (query: { value: string } = { value: ''}) => {

  const {value} = query
  let data = await WorkOrderService.GetWorkOrderScheduleList({
    Range: rangeFilter.value,
    State: stateFilter.value
  })

  for (let i = 0; i < data.length; i++) {
    //@ts-ignore
    data[i]['InitiatorName'] = await getUserInfo(data[i].InitiatorId);
    data[i].StateOption = statusMap.get(data[i].State)
  }


  if (value && value !== "") {
    const matchMethod = (item: WorkOrderTaskViewmodel) => item.Title.includes(value) || item.Id.toString() === value
    data = data.filter(matchMethod)
  }

  workOrders.value = data

}

onShow(async () => {
  search()
})


</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #EBF8FF;
}

.header {
  background-color: #3B82F6;
  padding: 1rem;
  color: white;
}

.header-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.filter-container {
  background-color: white;
  border-radius: 0.5rem;
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-group {
  margin-bottom: 1rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1E40AF;
  margin-bottom: 0.5rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

.filter-button {
  font-size: 0.7rem;
  border-radius: 0.25rem;
  border: 1px solid #3B82F6;
  color: #3B82F6;
  background-color: white;
  cursor: pointer;
}

.filter-button.active {
  background-color: #3B82F6;
  color: white;
}

.order-list {
  flex: 1;
  padding: 0 1rem 1rem;
  overflow: auto;
}

.order-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.order-header {
  margin-bottom: 0.5rem;
}

.order-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1E40AF;
}

.order-id {
  font-size: 0.875rem;
  color: #4B5563;
}

.order-content {
  margin-bottom: 0.5rem;
}

.order-info {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.info-icon {
  width: 1rem;
  height: 1rem;
  color: #3B82F6;
  margin-right: 0.5rem;
}

.info-text {
  margin-left: 0.3rem;
  font-size: 0.775rem;
  color: #4B5563;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.status-badge {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
}

.search-container {
  background-color: white;
  border-radius: 0.5rem;
  margin: 1rem 1rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.25rem;
  outline: none;
}

.search-input:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
