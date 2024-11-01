export class ChangeDepartmentKeysUtil {
	// 改变返回参数名字
	static map = {
		Id: 'value',
		DepartmentInfo: 'text',
		SubDepartments: 'children'
	}
	static newMap = {
		Id: 'value',
		DepartmentInfo: 'text',
		SubDepartments: 'children'
	}
	static changeObjectKeys = (keyMap : any, array : Array<any>) => {
		// console.log('arrary', array)
		for (var i = 0; i < array.length; i++) {
			var obj = array[i];
			for (var key in obj) {
				var newKey = keyMap[key];
				if (newKey) {
					obj[newKey] = obj[key];
					delete obj[key];
					if (newKey == 'children') {
						obj[newKey].push({
							value: `${obj['value']}`,
							text: `${obj['text']}-本级`
						})
						ChangeDepartmentKeysUtil.changeObjectKeys(keyMap, obj[newKey])
					}
				}
			}
		}
	}

}