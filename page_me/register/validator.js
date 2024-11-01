export default {
	"userName": {
		"rules": [{
				required: true,
				errorMessage: '请输入姓名',
			},
			{
				minLength: 2,
				maxLength: 6,
				errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符',
			},
			{
				validateFunction: function(rule, value, data, callback) {

					if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
						callback('姓名不能是：手机号或邮箱')
					};
					return true
				}
			}
		],
		"label": "用户名"
	},
	"userAccount": {
		"rules": [{
				required: true,
				errorMessage: '请输入账号',
			},
			{
				minLength: 6,
				maxLength: 20,
				errorMessage: '账户长度在 {minLength} 到 {maxLength} 个字符',
			},
			{
				validateFunction: function(rule, value, data, callback) {

					if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {

						callback('账户不能是：手机号或邮箱')

					}

					return true
				}
			}
		],
		"label": "用户名"
	},
	"userTel": {
		"rules": [{
				required: true,
				errorMessage: '请输入手机号',
			},
			{
				minLength: 11,
				maxLength: 11,
				errorMessage: '手机号长度在 {minLength} 到 {maxLength} 个字符',
			},
			{
				validateFunction: function(rule, value, data, callback) {

					if (/^1\d{10}$/.test(value)) {
						return true
					};
					callback('请输入正确的手机号')
				}
			}
		],
		"label": "用户名"
	},
	"userPwd": {
		"rules": [{
				required: true,
				errorMessage: '请输入密码',
			},
			{
				minLength: 8,
				maxLength: 20,
				errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
			}, {
				validateFunction: function(rule, value, data, callback) {
				  console.log(value);
				  const pattern = /(?=(.*\d){1})(?=.*[a-zA-Z])(?=.*[@#$%^&+=!*_?-]){1}.+/;
				  if (pattern.test(value)) {
				  return true
				  } else {
				    callback('密码中需包含三种及以上的字符类型');
				  }
				}
			},
		],
		"label": "密码"
	},
	"pwd2": {
		"rules": [{
				required: true,
				errorMessage: '再次输入密码',
			},
			{
				minLength: 6,
				maxLength: 20,
				errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
			},
			{
				validateFunction: function(rule, value, data, callback) {
					if (value != data.userPwd) {
						callback('两次输入密码不一致')
					};
					return true
				}
			}
		],
		"label": "确认密码"
	}
}