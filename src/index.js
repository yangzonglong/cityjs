import {
	show,
	hide,
	get_move_range,
	init,
	fids_chinese,
	bind_init_data
} from './city'
import city_data from './data'

let is_init = false;

const get_offset = function(dom) {
	let x = dom.offsetLeft,
		y = dom.offsetTop;
	while(dom = dom.offsetParent) {
		x += dom.offsetLeft;
		y += dom.offsetTop;
	}
	return {
		x,
		y
	}
}

const get_dom = id => typeof id === 'string' ? document.querySelector(id) : id;

const handle_xy = (x, y) => {
	return {
		x,
		y
	}
}

// 根据描述 获取城市id
const get_city_id = (father_id, name) => {
	let citys = city_data;
	// 如果父id存在，推入对应的子城市
	if(father_id) {
		citys = {};
		city_data[father_id].childs.forEach(item => {
			citys[item] = city_data[item]
		})
	}
	for(let k in citys) {
		const city = citys[k];
		if(city.name === name) {
			return k
		}
	}
}

const bind_event = function() {
	const that = this;
	this.dom.addEventListener('focus', function() {
		if(!is_init) {
			is_init = true;
			init()
		}
		if(!get_move_range()) {
			show.bind(that)(that.x, that.y)
		}
	})
	// this.dom.addEventListener('blur', function() {
	// 	if(!get_move_range()) {
	// 		hide()
	// 	} else {
	// 		setTimeout(function() {
	// 			if(get_move_range()) this.focus();
	// 		}.bind(this), 200)
	// 	}
	// })
}

class Zlcity {
	constructor(id, opitions = {
		xy: handle_xy
	}) {
		const dom = get_dom(id),
			offset = get_offset(dom),
			value = dom.value,
			result = opitions.xy(offset.x, offset.y + dom.offsetHeight);
		this.x = result.x;
		this.y = result.y;
		this.dom = dom;
		this.opitions = opitions;
		bind_event.bind(this)();
		// chrome opera 浏览器后退会刷新页面并保留表单数据，但不会保留自定义数据
		if(value) {
			const ids = this.ids(dom.value.split('-'));
			// 自定义输出的情况，自动调用set一次
			// 这种情况下，需要在set里手动设置城市id
			if(opitions.set) {
				opitions.set.bind(this)(true, ids)
			} else {
				// 默认输出，自动设置cityid
				dom.dataset.cityid = ids[ids.length-1]
			}
		}
	}
	// 传入城市id id为array 返回中文描述
	fids_chinese(fids) {
		return fids_chinese(fids)
	}
	// 传入城市描述 返回id
	ids(names) {
		const ids = [];
		names.forEach((item, index) => {
			if(!index) {
				ids.push(get_city_id(false, item))
			} else {
				ids.push(get_city_id(ids[ids.length - 1], item))
			}
		})
		return ids
	}
	// 用于生成menu以及初始化首屏数据
	static init_data(datas) {
		bind_init_data(datas)
	}
}

window.Zlcity = Zlcity
export default Zlcity