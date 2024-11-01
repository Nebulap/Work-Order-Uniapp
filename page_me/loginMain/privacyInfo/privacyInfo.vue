<template>
	<div>
		<rich-text :nodes="privacyInfo"></rich-text>
	</div>
</template>

<script lang="ts" setup>
	import { workbenchService } from "@/api/workbenchService"
	import {
		Ref, ref
	} from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	const privacyInfo : Ref<any> = ref('')
	onLoad((option : any) => {
		if (option.value == 'registerPrivacy') {
			getPrivacyTerms()
		}
		if (option.value == 'userPrivacy') {
			getUserPrivacyTerms()
		}
	})

	const getPrivacyTerms = async () => {
		let data = await workbenchService.getRegisterPrivacyTerms()
		if (!!data.registerPrivacy) {
			privacyInfo.value = data.registerPrivacy
		}
	}
	const getUserPrivacyTerms = async () => {
		let data = await workbenchService.getUserPrivacyTerms()
		if (!!data.userPrivacyString) {
			privacyInfo.value = data.userPrivacyString
		}

	}
</script>

<style>

</style>