// import { URL } from '@/api/url';
export enum RequestMethod {
	POST = 1,
	GET, PUT, DEL
}

export class Request {
	private BASE_URL : string = ""
	private token : string = "1"
	constructor(url : string = 'www.sanchayou.cn') {
		// const getUrl = new URL(url);
		this.BASE_URL = url;
	};
	async request(url : string, method : RequestMethod, data : object) {
		let token = uni.getStorageSync('token');
		this.token = token
		return new Promise((resolve, reject) => {
			// 发起网络请求
			uni.showLoading({
				title: '加载中'
			});
			const headers = method === RequestMethod.GET || method === RequestMethod.DEL ?
				{ 'Authorization': `Bearer ${this.token}`, 'X-Requested-With': 'XMLHttpRequest', "Accept": "application/json", "Content-Type": "application/json; charset=UTF-8", appid: 0 } :
				{ 'Authorization': `Bearer ${this.token}`, 'X-Requested-With': 'XMLHttpRequest', "Accept": "application/json", 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', appid: 0 };
			uni.request({
				url: this.BASE_URL + url,
				data: data,
				method: method == RequestMethod.GET ? 'GET' : method == RequestMethod.POST ? 'POST' : method == RequestMethod.PUT ? 'PUT' : 'DELETE',
				header: headers,
				success: (result : any) => {
					// console.log(result)
					// 响应成功，获取数据，解析数据
					// console.log(result.data.success)
					//1、先验证服务器是否正常响应！正常响应就会返回success=='ok'，
					if (result.data.success == 'ok') {
						//2、服务器正常响应了！则去判断服务器响应的数据结果是否为正确的结果！根据code判断，200为正确
						if (result.data.code == 200) {
							//服务器正常响应，且数据正确，则返回数据！
							resolve(result.data.data);
						} else if (result.data.code == 401) {
							//说明身份异常
							//清除用户信息
							// uni.removeStorage({
							// 	key: 'user_info',
							// 	success: function(res: any) {
							// 		console.log('请求数据用户身份失效:', '清除用户信息缓存成功success');
							// 	}
							// });
							// uni.removeStorage({
							// 	key: 'token',
							// 	success: function(res: any) {
							// 		console.log('请求数据用户身份失效:', '清除token缓存成功success');
							// 	}
							// });
							//提醒用户需要重新登录
							uni.hideLoading();
							uni.showModal({
								title: '提示',
								content: '用户信息失效，请重新登录!',
								showCancel: false,
								success: function (res : any) {
									//身份失效直接跳转到loginPage,跳转最多4级路径
									uni.reLaunch({
										url: '../page_me/loginMain/loginMain?msg=logout',
										success: () => { console.log('身份失效,跳转loginMain,1级路径') },
										fail: () => {
											uni.reLaunch({
												url: '../../page_me/loginMain/loginMain?msg=logout',
												success: () => { console.log('身份失效,跳转loginMain,2级路径') },
												fail: () => {
													uni.reLaunch({
														url: '../../../page_me/loginMain/loginMain?msg=logout',
														success: () => { console.log('身份失效,跳转loginMain,3级路径') },
														fail: () => {
															uni.reLaunch({
																url: '../../../../page_me/loginMain/loginMain?msg=logout',
																success: () => { console.log('身份失效,跳转loginMain,4级路径') },
															})
														}
													})
												}
											})
										}
									})
								}
							})
							reject(result.data)
						} else {//服务器正常响应，数据不正确！
							// console.log('服务器正常响应，code不正确：', result)
							reject(result.data)
						}
					} else {

						uni.showToast({
							title: "服务器响应失败!",
							icon: 'error'
						});
						console.log('请求数据fail', result)
						reject(result.data.msg);
					}
				},
				fail: (error : any) => {
					uni.showToast({
						title: "数据请求错误!",
						icon: 'error'
					});
					console.log('请求数据失败', error)
					reject(error);
				},
				complete: () => {
					// 关闭加载
					uni.hideLoading();
				},
			});
		});
	}
}
