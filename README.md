# 城市选择控件

## 基础引用
下载dist文件夹下 css js文件到项目下，引用即可 

## 基础使用
### 1. 初始化menu数据
```
Zlcity.init_data({
    '热门城市': {
        childs: [1],
        is_key: false
    }
})
```
* childs 数组类型(必传)，配置该导航下的子节点
* is_key 布尔类型，配置是否显示首字母

### 2. 绑定input
```
new Zlcity(document.querySelector('#ipt2'),opitons)
```

## opitons {} 配置参数
| 参数名称 | 类型 | 是否必传 | 说明 |
| - | :-: | -: | -: |
| default_val | string| 否 | 默认城市名称，如 上海-嘉定 |
| xy | function| 否 | 修正控件位置,默认在触发元素的下方 |
| optional_index | number| 否 | 可选层级，默认只要有下级，有一直可选 |
| set | function| 否 | 用于自定义输出格式 |

更多示例请参数index.html文件

## 数据修改，源码修改
```
git clone https://github.com/yangzonglong/cityjs
cd cityjs 
yarn
yarn start
```