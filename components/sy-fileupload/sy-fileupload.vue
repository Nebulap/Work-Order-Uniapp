<template>
	<view class="container">
		<uni-section title="只选择图片" type="line">
			<view class="example-body">
				<uni-file-picker :limit="limit" :title="'最多选择' + limit + '张图片'" :source-type="sourceType" mode="grid"
					@select="select" @delete="deletea"></uni-file-picker>
			</view>
		</uni-section>
	</view>
</template>

<script>
	export default {
		props: {
			limit: {
				type: Number,
				default: 9
			},
		},
		data() {
			return {
				sourceType: ['album', 'camera'],
				fileLists: [],

			}
		},
		methods: {
			select(e) {
				// 解决file对象取值问题
				// h5上传-需要文件file对象
				// const tempFilePaths = e.tempFiles[0].file;
				//微信小程序上传-需要微信临时提供临时地址
				const tempFilePaths = e.tempFilePaths;
				uni.uploadFile({
					// url: 'http://192.168.0.28:26004/api/FileDownLoad/UploadFile',
					url: 'http://www.scasy.cn:8070/api/FileDownLoad/UploadFile',
					// 要上传文件对象-h5和微信小程序上传参数不一样只能存在一个
					// H5上传
					// file: tempFilePaths,
					// 微信小程序上传
					filePath: tempFilePaths[0],
					//文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
					name: 'file',
					// 请求头设置
					// 我们是需要token和用户id登录时存从uni-app数据存储中取
					header: {
						'AppId': 'ae064c3829d440e78853b787312a051e',
						'AppSecret': 'db6779dd52a960e3ba21c71cc3985845'
					},
					formData: { // 带上传的其他参数

					},
					// 成功函数
					success: (res) => {
						console.log('上传数据转换', JSON.parse(res.data));
						// 取到文档服务器的值
						let uploaddata = JSON.parse(res.data)
						uni.showToast({
							icon: "none",
							title: uploaddata.msg
						})
						this.fileLists.push(uploaddata.data)
						this.$emit('update-file-lists', this.fileLists);
					},
					// 失败提示用户重新上传
					fail: error => {
						console.log('失败', error);
						uni.showToast({
							icon: "none",
							title: error.msg
						})
					}
				})
			},
			deletea(e) {
				// console.log('删除图片', e.tempFile.name);
				let index = this.fileLists.findIndex(item => item.originalFilename === e.tempFile.name);
				if (index !== -1) { // 判断找到了匹配项
					this.fileLists.splice(index, 1); // 删除匹配项
					this.$emit('update-file-lists', this.fileLists);
				}
			}

		}
	}
</script>

<style lang="scss">
	.example-body {
		padding: 10px;
		padding-top: 0;
	}

	.custom-image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.text {
		font-size: 14px;
		color: #333;
	}
</style>