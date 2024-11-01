import { defineStore } from 'pinia'

export const envStore = defineStore('envStore', {
	state: () => {
		return {
			// 所有这些属性都将自动推断其类型				  
			isProduction: false,
			isStaging: false,
			isDevelopment: false,
			isApp: false,
			isWechat: false,
		}
	},
	getters: {
		currentEnv(state) {
			if (state.isProduction) return "production";
			if (state.isStaging) return "staging";
			if (state.isDevelopment) return "development";
			return "unknown";
		},
		currentuniPlatform(state) {
			if (state.isApp) return "app";
			if (state.isWechat) return "wechat";
			return "unknown";
		}
		,
		isUnknownuniPlatform(state) {
			return !state.isApp && !state.isWechat
		},

		isUnknownuPlatform(state) {
			return !state.isProduction && !state.isStaging && !state.isDevelopment;
		},
	},
	actions: {
		setApp() {
			this.isApp = true;
			this.isWechat = false;
		},
		setWechat() {
			this.isApp = false;
			this.isWechat = true;
		},
		setProduction() {
			this.isProduction = true;
			this.isStaging = false;
			this.isDevelopment = false;
		},
		setStaging() {
			this.isProduction = false;
			this.isStaging = true;
			this.isDevelopment = false;
		},
		setDevelopment() {
			this.isProduction = false;
			this.isStaging = false;
			this.isDevelopment = true;
		},
	}
},
)