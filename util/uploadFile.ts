
export class UploadUtil {
	static UploadFile(url: string, filePath: string) {
		return new Promise(function(resolve, reject) {
			uni.uploadFile({
				url: url, //请求接口地址
				filePath: filePath, //文件地址
				name: 'file',
				formData: {
					'user': 'test'
				},
				// header: {
				// 	'token': token
				// },
				success(res) {
					// console.log("请求成功的结果", res.statusCode,res);
					// 去掉两头字符串
					res.data.slice(1)
					res.data.slice(0, res.data.length - 1)
					resolve(JSON.parse(res.data));
				},
				fail(err) {
					console.log("请求失败的结果", err);
					reject(err);
				}
			})
		})
	}

	static watchLoadFile() {
		UploadUtil.UploadFile('https://www.sanchayou.cn:8070/api/task/UpLoad', e.tempFilePaths[0]).onProgressUpdate((res) => {
			console.log('上传进度' + res.progress);
			console.log('已经上传的数据长度' + res.totalBytesSent);
			console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
		});

	}

}