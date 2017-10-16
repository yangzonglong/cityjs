import css from './css.scss'
import city_data from './data'

const create_div = () => document.createElement('div'),
	wrap_dom = create_div(),
	list_dom = create_div(),
	menu_dom = create_div(),
	cache = {};
	
let is_move_range = false, crt_ipt, init_data;

// create menu
const create_menu = function(crt_key) {
	if(cache[crt_key]) return cache[crt_key];
	let str = '';
	for(let key in init_data) {
		str += `<a ${crt_key === key ? 'class="zl_on"':''} 
			href='javascript:;'
			data-key='${key}' 
			data-type='menu'>${key}<span></span></a>`
	}
	return cache[crt_key] = str
}

// 传入一组id, 返回html城市数据
const id_list = function(ids,father_id) {
	return ids.map(id => {
		const city = city_data[id] || {};
		return `<a data-fid='${father_id || ""}' 
			href='javascript:;' 
			data-type='city' 
			data-cityid='${id}'>${city.name}</a>`
	}).join('')
}

// create list
const create_list = function(ids = [], is_key = false, father_id) {
	const cache_key = JSON.stringify(ids);
	if(cache[cache_key]) return cache[cache_key];
	if(is_key) {
		const obj = {};
		let str = '';
		ids.forEach(id => {
			const key = city_data[id].key;
			if(key) {
				if(!obj[key]) obj[key] = [];
				obj[key].push(id)
			}
		})
		for(let key in obj) {
			str += `<div><p>${key}</p><p>${id_list(obj[key],father_id)}</p></div>`
		}
		return cache[cache_key] = str
	}
	return cache[cache_key] = id_list(ids,father_id)
}

// 重置
const reset = () => {
	let first_key, city;
	for(first_key in init_data){
		city = init_data[first_key];
		break
	}
	if(!first_key)  return;
	menu_dom.innerHTML = create_menu(first_key)
	list_dom.innerHTML = create_list(city.childs,city.is_key)
}

// 获取fids
const get_fids = (target,id) => {
	const fids = target.dataset.fid ? JSON.parse(target.dataset.fid) : [];
	fids.push(id)
	return fids
}

// 根据传入的fids，获取一个完整的中文描述
const fids_chinese = function(fids){
	if(Array.isArray(fids)){
		return fids.map(id => city_data[id].name)
	}
	return [city_data[fids]]
}

// 绑定事件
const init_event = function() {
	wrap_dom.addEventListener('mouseenter',() => is_move_range = true)
	wrap_dom.addEventListener('mouseleave',() => is_move_range = false)
	wrap_dom.addEventListener('click', function(e = window.event) {
		const tag = e.srcElement || e.target,
			type = tag.dataset.type;
		if(type === 'menu') { // 导航切换
			const key = tag.dataset.key, city = init_data[key];
			menu_dom.innerHTML = create_menu(key);
			list_dom.innerHTML = create_list(city.childs,city.is_key)
		}else if(type === 'city') {
			const cityid = tag.dataset.cityid,
				  childs = city_data[cityid].childs,
				  fids = get_fids(tag,cityid);
			if(childs){
				list_dom.innerHTML = create_list(childs,false,JSON.stringify(fids))	
			}else{
				const { dom, opitions } = crt_ipt;
				const fids = get_fids(tag,cityid);
				if(opitions.set){ // 指定了回调
					opitions.set.bind(crt_ipt)(false,fids)
				}else{
					dom.value = fids_chinese(fids).join('-');
					dom.dataset.cityid = fids.join('-');	
				}
				hide()
			}
		}
	})
}

// 生成主体框架
const create_wrap = function() {
	reset();
	wrap_dom.className = 'zl_ct';
	wrap_dom.appendChild(menu_dom);
	wrap_dom.appendChild(list_dom);
	menu_dom.className = 'zl_ct_hd';
	list_dom.className = 'zl_ct_mn';
	document.body.appendChild(wrap_dom)
}

// 显示控件
const show = function(x,y){
	reset();
	wrap_dom.style.left = x + 'px';
	wrap_dom.style.top = y + 'px';
	wrap_dom.style.display = 'block';
	crt_ipt = this;
}

// 隐藏控件
const hide = () => {
	is_move_range = false;
	wrap_dom.style.display = 'none';
}

const get_move_range = () => is_move_range;

// 初始化
const init = () => {
	create_wrap()
	init_event()	
}

const bind_init_data = datas => init_data = datas;

export {
	show,
	hide,
	get_move_range,
	init,
	fids_chinese,
	bind_init_data
}
