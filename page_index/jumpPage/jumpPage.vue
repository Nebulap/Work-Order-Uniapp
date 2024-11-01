<template>
	<view>
		<!-- <web-view :src="url"></web-view> -->
		<rich-text :nodes="url"></rich-text>
	</view>
	<!-- <rich-text :nodes=""></rich-text> -->
</template>

<script setup lang="ts">
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import { ref } from "vue";
	const url = ref('')
	onLoad((parmUrl : any) => {
		// console.log(url);
		url.value = decodeURIComponent(parmUrl.Id)
	})
</script>

<style>

</style>