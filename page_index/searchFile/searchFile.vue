<template>
	<view>
<!-- 		<uni-search-bar placeholder="请搜索你想要的文件" @confirm="search" />
		<uni-list v-for="item in searchData">
			<uni-list-item :title="item.Title" ellipsis="2" link @click="jumpPage(item.HTML)"></uni-list-item>
		</uni-list> -->
	</view>
</template>

<script setup lang="ts">
	// // import { HomePageService } from '../../api/homePageService';
	// import { ref } from "vue";
	// const searchData = ref([])
	// const search = async (res : any) => {
	// 	const data = await HomePageService.GetHpmePageShowByTitle({ Title: res.value })
	// 	console.log(data, 'data');
	// 	searchData.value = data
	// }
	// const jumpPage = (Id : number) => {
	// 	console.log(Id);
	// 	uni.navigateTo({
	// 		url: `/page_index/jumpPage/jumpPage?Id=` + encodeURIComponent(Id)
	// 	})
	// }
</script>

<style>

</style>