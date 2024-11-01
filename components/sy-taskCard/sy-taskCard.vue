<template>
  <uni-card v-for="(item,i) in cardList" :key="i">
    <view @click="jumpaTask(item.State,item.Id,item)">
      <view class="itemCard">
        <text style="font-weight: bold;font-size: 17px;">{{ taskType }}</text>
        <uni-tag
            :text="item.State == 0 ? '已保存' :item.State == 1? '待接收':item.State == 2? '处理中':item.State == 3?'审核中':item.State == 4?'已完成':item.State == 5?'接受驳回':'处理驳回'"
            :type="item.State == 0 ? 'default' :item.State == 1? 'primary':item.State == 2? 'primary':item.State == 3?'royal':item.State == 4?'success':item.State == 5?'warning':'error'"></uni-tag>
      </view>
      <view>
        <text>标题:</text>
        <text>{{ item.Title }}</text>
      </view>
      <view>
        <text>内容:</text>
        <text>{{ item.Content }}</text>
      </view>
      <view v-if="!!item.RequiredCompletionTime">
        <text>截止时间:</text>
        <text>{{ item.RequiredCompletionTime.split("T")[0] }}</text>
      </view>
      <view>
        <text>发起人:</text>
        <text>{{ item.UserName }}</text>
      </view>
    </view>
  </uni-card>
</template>

<script lang="ts" setup>
// 传入属性的接口
interface ItemProps {
  cardList: Array<object>;
  taskType: string;
}

//设置传入属性
const props = defineProps<ItemProps>();

// 设置事件
interface EmitEvent {
  (e: "itemClick", item: object): void; // 当选项被点击时会触发该事件
}

const emit = defineEmits<EmitEvent>();

function jumpaTask(state, Id, item) {
  if (props.taskType == '草稿箱') {
    uni.navigateTo({
      url: `../submitParentTask/submitParentTask?showDelete=true&&Id=${Id}`
    })
  }
  if (state == 1) {
    uni.navigateTo({
      url: `../acceptanceTask/acceptanceTask?item=${encodeURIComponent(JSON.stringify(item))}`
    })
  } else if (state == 2) {
    uni.navigateTo({
      url: `../disposeHarmonizeTask/disposeHarmonizeTask?item=${encodeURIComponent(JSON.stringify(item))}&&taskType=${(props.taskType)}`
    })
  } else if (state == 3) {
    uni.navigateTo({
      url: `../disposeAuditTask/disposeAuditTask?item=${encodeURIComponent(JSON.stringify(item))}`
    })
  } else if (state == 4) {
    uni.navigateTo({
      url: `../completedTask/completedTask?item=${encodeURIComponent(JSON.stringify(item))}`
    })
  } else if (state == 5) {
    uni.navigateTo({
      url: `../rejectedPage/rejectedPage?item=${encodeURIComponent(JSON.stringify(item))}`
    })
  } else if (state == 6) {
    uni.navigateTo({
      url: `../disposeHarmonizeTask/disposeHarmonizeTask?item=${encodeURIComponent(JSON.stringify(item))}`
    })
  }
}
</script>

<style lang="scss">
.itemCard {
  display: flex;
  justify-content: space-between;
}
</style>
