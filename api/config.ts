// config.ts
let workBenchBaseUrl : string = '';
let workHourUrl : string = '';
let mdmBaseUrl : string = '';
let sysBaseUrl : string = '';
let tempUrl : string = '';
if (process.env.NODE_ENV === 'production') {
	workBenchBaseUrl = "http://10.1.2.2:8073/api";
	mdmBaseUrl = "http://10.1.2.2:8070/api";
	sysBaseUrl = "http://10.1.2.2:8070/api";
	workHourUrl = "http://10.1.2.2:8071/Salary"
} else {
	workBenchBaseUrl = "http://10.1.2.2:8073/api";
	mdmBaseUrl = "http://192.168.146.118:8070/api/workorder";
	sysBaseUrl = "http://192.168.146.118:8070/api/sys";
	workHourUrl = "http://10.1.2.2:8071/Salary"
	// 其他开发环境下的 baseUrl 配置
	tempUrl = "http://localhost:8071/Salary"
}
const config = {
	workBenchBaseUrl,
	mdmBaseUrl,
	tempUrl,
	 sysBaseUrl,
	workHourUrl
};

export default config;
