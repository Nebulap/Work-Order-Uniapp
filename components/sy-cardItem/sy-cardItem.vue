<template>
	<view>
		<uni-card :title="item.MNRReview.OrderNumber" :extra="item.MNRReview.UserName"
			@click="jumpDetail(item.EventId,item.IsReject)" :class="{'rejected-card': item.IsReject === 1}" >
			<view class="topbox">
				<view>{{item.ProductName}}</view>
			</view>
			<view class="middlebox">
				<view>产品名称:{{item.MNRReview.ProductName }}</view>
			</view>
			<view>批次号:{{item.MNRReview.BatchNumber}}</view>
			<view>创建时间:{{item.MNRReview.createdAt}}</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		name: "sy-cardItem",
		props: ['item'],
		methods: {
			jumpDetail(eventId,IsReject) {
					
				if(IsReject==1){
					// 跳转到详情页的逻辑
					uni.navigateTo({
						url: `/page_workbench/Reviewtickets/auditReviewtickets/auditReviewtickets?EventId=${eventId}`
					})
					
				}else{
					// 跳转到详情页的逻辑
					uni.navigateTo({
						url: `/page_workbench/Reviewtickets/disposeReviewtickets/disposeReviewtickets?EventId=${eventId}`
					})
				}
				

			}
		},

	}
</script>

<style>
.rejected-card{
	 border: 2px solid red;
}
</style>