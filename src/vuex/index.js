import Vue from 'vue' // 引入vue
import Vuex from 'vuex' // 引入vuex

//使用Vuex
Vue.use(Vuex)

//创建Vuex实例,，新建一个store仓库
const store = new Vuex.Store({
    state: {
        regionList: [// 各区县乡镇数据
            {code: 530902, name: "临翔区",center: [23.88057205250008, 100.14319188500008], children: ["凤翔街道","忙畔街道","博尚镇","南美乡","蚂蚁堆乡","章驮乡","圈内乡","马台乡","邦东乡","平村乡"]},
            {code: 530921, name: "凤庆县",center: [24.63168504000005, 99.8701686350001], children: ["大寺乡","凤山镇","郭大寨乡","鲁史镇","洛党镇","勐佑镇","三岔河镇","诗礼乡","小湾镇","新华乡","雪山镇","腰街乡","营盘镇"]},
            {code: 530922, name: "云县",center: [24.3569714725001, 100.13200314000011], children: ["爱华镇","茶房乡","大朝山西镇","大寨镇","后箐乡","栗树乡","漫湾镇","忙怀乡","茂兰镇","晓街乡","幸福镇","涌宝镇"]},
            {code: 530923, name: "永德县",center: [24.100577435000105, 99.46449338750006], children: ["班卡乡","崇岗乡","大山乡","大雪山乡","德党镇","勐板乡","乌木龙乡","小勐统镇","亚练乡","永康镇"]},
            {code: 530924, name: "镇康县",center: [23.939605952500074, 99.02511645750005], children: ["凤尾镇","军赛乡","忙丙乡","勐堆乡","勐捧镇","木场乡","南伞镇"]},
            {code: 530925, name: "双江县",center: [23.503043215000083, 99.87243013000007], children: ["邦丙乡","大文乡","忙糯乡","勐库镇","勐勐镇","沙河乡"]},
            {code: 530926, name: "耿马县",center: [23.609570900000113, 99.35370818750005], children: ["大兴乡","耿马镇","贺派乡","芒洪乡","勐简乡","勐撒镇","勐永镇","孟定镇","四排山乡"]},
            {code: 530927, name: "沧源县",center: [23.294409917500104, 99.29589947750009], children: ["班洪乡","班老乡","单甲乡","芒卡镇","勐董镇","勐角乡","勐来乡","勐省镇","糯良乡","岩帅镇"]}
       ],
        weatherPheList: [// 天气现象
            {code: 0.0, name: "晴"},{code: 1.0, name: "多云"},{code: 2.0, name: "阴"},
            {code: 3.0, name: "阵雨"},{code: 4.0, name: "雷阵雨"},{code: 5.0, name: "雷阵雨伴冰雹"},
            {code: 6.0, name: "雨夹雪"},{code: 7.0, name: "小雨"},{code: 8.0, name: "中雨"},
            {code: 9.0, name: "大雨"},{code: 10.0, name: "暴雨"},{code: 11.0, name: "大暴雨"},
            {code: 12.0, name: "特大暴雨"},{code: 13.0, name: "阵雪"},{code: 14.0, name: "小雪"},
            {code: 15.0, name: "中雪"},{code: 16.0, name: "大雪"},{code: 17.0, name: "暴雪"},
            {code: 18.0, name: "雾"},{code: 19.0, name: "冻雨"},{code: 20.0, name: "沙尘暴"},
            {code: 21.0, name: "小到中雨"},{code: 22.0, name: "中到大雨"},{code: 23.0, name: "大到暴雨"},
            {code: 24.0, name: "暴雨到大暴雨"},{code: 25.0, name: "大暴雨到特大暴雨"},{code: 26.0, name: "小到中雪"},
            {code: 27.0, name: "中到大雪"},{code: 28.0, name: "大到暴雪", icon: "28"},{code: 29.0, name: "浮尘"},
            {code: 30.0, name: "扬沙"},{code: 31.0, name: "强沙尘暴"}
       ],
    //   fileUrl: "http://61.153.185.211:8082",
       fileUrl: "http://172.24.97.251:8082",
       productType : null,
       productTypeNum : 0,
    //    productURL : 'http://localhost:8080/LinCangTemp/',
       productURL : 'http://172.24.97.251:18080/WeiFang/',
       productBookURL : 'http://58.59.29.50:15019/'
    },
    getters: {

    }
})
export default store //导出store 文件末尾要换行
