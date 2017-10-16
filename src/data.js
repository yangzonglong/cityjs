// 扁平化城市数据
const city_data = {
	221: {
		name: '上海',
		key: 'S',
		childs: [363]
	},
	363: {
		name: '市辖区',
		key: 'S'
	},
	198: {
		name: "北京",
		childs: [3523],
		key:'B'
	},
	3523: {
		name: "市辖区",
		key:'S'
	}
}
export default city_data