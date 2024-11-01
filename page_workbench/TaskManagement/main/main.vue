<template>
  <view>
    <view class="container">
      <view class="top-bar">
        <!-- 顶部背景内容 -->
        <view class="addTask" @click="addTask">
          <uni-icons type="plusempty" color="#32b8ff"></uni-icons>
          新建工单
        </view>
        <view class="addTask" @click="draftTask">
          <uni-icons type="trash-filled" color="#32b8ff"></uni-icons>
          草稿箱
        </view>
      </view>
      <view class="content">
        <view class="messageBox">
          <view class="category" style="background-color: #38acff;" @click="jumpReceivedTask">
            <view>
              <uni-icons type="chatbubble" color="#ffffff" size="20"/>
              我收到的
            </view>
            <view><span class="item-count">{{ cardNumber.acceptManCount }}</span>项</view>
          </view>
          <view class="category" style="background-color: #fcc860;" @click="jumpLaunchTask">
            <view>
              <uni-icons type="calendar" color="#ffffff" size="20"/>
              我发起的
            </view>
            <view><span class="item-count">{{ cardNumber.initiatorCount }}</span>项</view>
          </view>
          <view class="category" style="background-color: #a0d777;" @click="auditTask">
            <view>
              <uni-icons type="compose" color="#ffffff" size="20"/>
              待我审核
            </view>
            <view><span class="item-count">{{ cardNumber.auditCount }}</span>项</view>
          </view>
        </view>
        <uni-card title="最新事项" is-full>
          <sy-taskCard :cardList="harmonizeCard" :taskType="'最新事项'"></sy-taskCard>
        </uni-card>
      </view>
    </view>
  </view>
</template>
<script lang='ts' setup>
import {onShow} from "@dcloudio/uni-app";
import {storeToRefs} from "pinia"
import {reactive, toRefs,} from 'vue'
import {UserService} from '../../../api/userService';
import {WorkOrderService} from '../../../api/workOrderService';

import {userStore} from '../../../store/user-store'

const userstore = userStore()

const {userInfo} = storeToRefs(userstore);
let {harmonizeCard, cardNumber} = toRefs(reactive({
  harmonizeCard: {},
  cardNumber: {} as any
}))
onShow(async () => {
  let receivedData = await WorkOrderService.GetWorkOrderTasksByAcceptManId({
    AcceptManId: userInfo.value.Id
  })
  //过滤 receivedData，只保留 State 等于 1、2、4 或 6 的项，并将结果存储在 data 变量中
  const data = receivedData.filter(item => item.State == 1 || item.State == 2);

  for (let i = 0; i < data.length; i++) {
    //@ts-ignore
    data[i]['UserName'] = await getUserInfo(data[i].InitiatorId);
  }

  console.log(data)

  harmonizeCard.value = data
  await GetWorkOrderTaskNumberById()
})
const getUserInfo = async (Id: number) => {
  const userInfo = await UserService.SerachAUserbyUserID({
    userID:Id
  });
  return userInfo.UserName;
}
const GetWorkOrderTaskNumberById = async () => {
  // 暂不明确其含义，暂未找到相关接口
  // cardNumber.value = await WorkOrderService.GetWorkOrderTaskNumberById({
  //   Id: userInfo.value.id
  // })
  // console.log(cardNumber.value);
}
const addTask = () => {
  uni.navigateTo({
    url: "../submitParentTask/submitParentTask"
  })
}
const jumpReceivedTask = () => {
  uni.navigateTo({
    url: "../receivedTask/receivedTask"
  })
}
const auditTask = () => {
  uni.navigateTo({
    url: "../auditTask/auditTask"
  })
}
const jumpLaunchTask = () => {
  uni.navigateTo({
    url: "../launchTask/launchTask"
  })
}
const draftTask = () => {
  uni.navigateTo({
    url: "../draftTask/draftTask"
  })
}
</script>

<style lang="scss">
.uni-card {
  margin: 0 0px 15px 0 !important;

}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .top-bar {
    height: 100px;
    background-image: linear-gradient(180deg, #2aaafc, #ffffff);
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;

    .addTask {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      background-color: #ffffff;
      border-radius: 20px;
      width: 40%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      margin-bottom: 5px;
      font-weight: bold;
    }
  }

  .content {
    flex: 1;
    background-color: #fff;
    padding: 12px;

    .messageBox {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .category {
        display: flex;
        flex-direction: column;
        width: 30%;
        align-items: center;

        color: white;
        border-radius: 8px;
        height: 100px;
        justify-content: center;

        .item-count {
          font-size: 20px;
          /* 调整数字的字体大小 */
          font-weight: bold;
          /* 可以添加加粗效果 */
        }
      }
    }

  }
}
</style>
