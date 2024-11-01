<template>
	<sy-taskForm :showDelete="showDelete" :Id="Id" :formType="'draft'"></sy-taskForm>
</template>

<script setup lang="ts">
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import { toRefs, reactive } from "vue";

	onLoad((res : any) => {
		showDelete.value = res.showDelete
		Id.value = res.Id
    console.log("---------------"+Id.value)
	})
	const {
		Id,
		showDelete
	} = toRefs(reactive({
		Id: 0,
		showDelete: false
	}))
</script>

<style lang="scss">

</style>
