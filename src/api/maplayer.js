import request from './request'
/* 右侧菜单数据 */
export function getDataByParam(params) {
    return request({
        url: 'http://172.24.97.251:8082/weather/getDataByParam',
        method: 'post',
        params
    })
}
/* 站点出图 */
export function getImageByParam(params) {
    return request({
        url: 'http://172.24.97.251:8082/weather/getImageByParam',
        method: 'post',
        params
    })
}
/* 获得实况阈值 */
export function getthreshold(params) {
    return request({
        url: 'http://172.24.97.251:8082/threshold/list',
        method: 'post',
        params
    })
}
/* 修改实况阈值 */
export function updateThreshold(params) {
    return request({
        url: 'http://172.24.97.251:8082/threshold/update',
        method: 'post',
        params
    })
}
/* 获得预警信号 */
export function getWarning(params) {
    return request({
        url: 'http://172.24.97.251:8082/weather/getWarning',
        method: 'post',
        params
    })
}
/* 获得预报数据要素 */
export function gridElement(params) {
    return request({
        url: 'http://172.24.97.251:8082/gridElement/list',
        method: 'post',
        params
    })
}
/* 获得最新预报格点预报时间 */
export function getMaxTime(params) {
    return request({
        url: 'http://172.24.97.251:8082/yb/getMaxTime',
        method: 'post',
        params
    })
}
/* 获得格点图片数据 */
export function getGdimg(params) {
    return request({
        url: 'http://172.24.97.251:8082/yb/list',
        method: 'post',
        params
    })
}
/* 获得格点实况最新数据时间 */
export function getMaxTimeSK(params) {
    return request({
        url: 'http://172.24.97.251:8082/sk/getMaxTime',
        method: 'post',
        params
    })
}
/* 获得格点实况图片信息 */
export function getImgListSK(params) {
    return request({
        url: 'http://172.24.97.251:8082/sk/list',
        method: 'post',
        params
    })
}
/* 获得全部作业点 */
export function getOperationInfo(params) {
    return request({
        url: 'http://172.24.97.251:8082/operationInfo/list',
        method: 'post',
        params
    })
}
/* 获得格点预报详细数值 */
export function getGribInfo(params) {
    return request({
        url: 'http://172.24.97.251:8082/yb/getGribInfo',
        method: 'post',
        params
    })
}
/* 获得格点实况详细数值 */
export function getGribInfoSK(params) {
    return request({
        url: 'http://172.24.97.251:8082/sk/getGribInfo',
        method: 'post',
        params
    })
}
/* 实况对比图片接口 */
export function contrast(params) {
    return request({
        url: 'http://172.24.97.251:8082/contrast',
        method: 'post',
        params
    })
}
/* 获得指定要素一天所有发布时次 */
export function getQbTimeGroup(params) {
    return request({
        url: 'http://172.24.97.251:8082/yb/getQbTimeGroup',
        method: 'post',
        params
    })
}
/* 获得数据指定点位信息 */
export function getForecastInfo(params) {
    return request({
        url: 'http://172.24.97.251:8082/sk/getForecastInfo',
        method: 'post',
        params
    })
}
/* 获得指定点位指定数据的格点数据 */
export function getForecastInfoYb(params) {
    return request({
        url: 'http://172.24.97.251:8082/yb/getForecastInfo',
        method: 'post',
        params
    })
}
/* 获得预报对比要素 */
export function getContrastElement(params) {
    return request({
        url: 'http://172.24.97.251:8082/yb/getContrastElement',
        method: 'post',
        params
    })
}
/* 获得预报对比详细数据 */
export function getContrastList(params) {
    return request({
        url: 'http://172.24.97.251:8082/yb/getContrastList',
        method: 'post',
        params
    })
}
/* 172.24.97.251 */
/* 172.24.97.251 */
