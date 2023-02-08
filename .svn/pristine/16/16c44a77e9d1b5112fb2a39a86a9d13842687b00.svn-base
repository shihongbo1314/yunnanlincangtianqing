<template>
    <div
        class="menu_index"
        style="width:100%; height:100%"
    >
        <!-- 左侧 -->
        <div id="left">
            <!-- 左侧顶部 -->
            <div id="leftTop">
                <!-- 显示范围 -->
                <addr :addrListShow.sync="addrListShow" />

                <!-- 雷达、自动站 -->
                <radarMarker
                    :map="map"
                    @radarShowChange="radarShowChange"
                    @radarDateChange="radarDateChange"
                />
            </div>

            <!-- 左侧中间 -->
            <div
                id="leftMain"
                :class="leftMainLeftShow?'':'leftMainLeftShow'"
            >

                <!-- 左侧中间左侧窗口 -->
                <div
                    id="leftMainLeft"
                    v-if="leftMainLeftShow"
                >
                    <messageAlert />
                </div>
                <el-button
                    class="leftMainLeftShowBtn"
                    @click="leftMainLeftShow = !leftMainLeftShow"
                    :icon="leftMainLeftShow ? 'el-icon-caret-left' : 'el-icon-caret-right'"
                ></el-button>

                <!-- 左侧中间右侧主要内容 -->
                <div
                    id="leftMainRight"
                    v-loading="loading"
                >
                    <div
                        id="map"
                        ref="map"
                        style="width: 100%; height: 100%; background:#fff; z-index:1;"
                    ></div>
                    <mapLegend v-if="radarShow" />
                    <myLegend
                        :list="myLegend.list"
                        :unit="myLegend.unit"
                    />
                    <mapInfo
                        v-show="riskInfoShow"
                        :riskNum="riskNum"
                    />

                    <!--说明：雷达图数据时间左上角-->
                    <div
                        id="infoDiv"
                        v-if="radarShow"
                    >
                        雷达组合反射率 {{radarDate}}
                    </div>
                </div>

                <!-- 弹框 -->
                <div
                    id="addrListBox"
                    v-show="addrListShow"
                >
                    <p><i
                            class="el-icon-close"
                            @click="addrListShow = false"
                        ></i></p>
                    <addrList
                        :map="map"
                        v-if="map"
                    />
                </div>

            </div>
        </div>

        <!-- 右侧 -->
        <div id="right">
            <mapLayer
                :map="map"
                v-if="map"
            />
            <mapDataOne
                style="height: calc(100% - 10.5rem); overflow: auto;"
                ref="stationData"
                @NewTime='NewTime'
                @stationLiveTimeChange="stationLiveTimeChange"
                @stationShowStyleChange="stationShowStyleChange"
                @stationShowStyleChange_time='stationShowStyleChange_time'
                @stationShowStyleChange_my='stationShowStyleChange_my'
                @timeBtnClick='timeBtnClick'
                @stationShowStyleChange_Sk='stationShowStyleChange_Sk'
                @stationLiveTimeChangeSK='stationLiveTimeChangeSK'
                @stationLiveTimeChangeYB='stationLiveTimeChangeYB'
                @showTypeCheckedSK='showTypeCheckedSK'
                @showTypeCheckedYB='showTypeCheckedYB'
                @tabSeletChange='tabSeletChange'
                @switchWind='switchWind'
                @reveiseFs='reveiseFs'
                @SeletLonlng='SeletLonlng'
                @SeletLonlngYB='SeletLonlngYB'
                @NewTimewgsk='NewTimewgsk'
                @thresholdClick='thresholdClick'
            />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import addr from "../components/index/addr.vue";
import addrList from "../components/index/addrList.vue";
import radarMarker from "../components/index/radarMarker.vue";
import mapLayer from "../components/index/mapLayer.vue";
import mapDataOne from "../components/index/mapDataOne.vue";
import messageAlert from "../components/index/messageAlert1.vue";
import mapLegend from "../components/index/mapLegend.vue";
import myLegend from "../components/index/myLegend.vue";
import mapInfo from "../components/index/mapInfo.vue";
import {
    getDataByParam,
    getImageByParam,
    getGdimg,
    getImgListSK,
    getGribInfo,
    getGribInfoSK,
    getForecastInfo,
    getForecastInfoYb,
} from "../api/maplayer";
import { parseTime } from "@/api/date.js";
import axios from "axios";
export default {
    components: {
        addr,
        radarMarker,
        mapLayer,
        mapDataOne,
        messageAlert,
        mapLegend,
        mapInfo,
        addrList,
        myLegend,
    },
    data() {
        return {
            leftMainLeftShow: false,
            mapMarkerBox: ["闪电", "火点监控"],
            map: null,
            stationLiveTime: new Date(), // 站点实况最新数据时间
            stationShowTime: new Date(), // 站点实况默认显示时间
            stationShowStyle: null, // 站点的显示方式
            stationShow: false,

            radarShow: false,
            radarDate: "",

            riskInfoShow: false, //右上角摄像头信息的显隐
            riskNum: [0, 0, 0, 0, 0, 0],

            addrListShow: false,
            imgSrc: null,
            image: null,
            zhandianlayer: null,
            loading: false,
            itemP: null,
            myLegend: {
                list: null,
                unit: null,
            },
            zhandianInfo: null,
            mytime: "",
            wgyb: {
                inter: 1,
                name: null,
                time: "",
                type: "",
                image: "",
                pageIndex: 0,
                pngList: [],
                color: true,
                number: false,
                id: null,
                wgGridLayer: null, // 格点值显示图层
            },
            wgsk: {
                time: "",
                type: "",
                image: "",
                pageIndex: 0,
                pngList: [],
                color: true,
                number: false,
                id: null,
                wgGridLayer: null, // 格点值显示图层
                UVurl: null,
                velocityLayer: null,
                paramsObj: {
                    width: { selectValue: 1, initValue: 1 },
                    speed: { selectValue: 200, initValue: 200 },
                    length: { selectValue: 0.009, initValue: 0.009 },
                    color: { selectValue: "black", initValue: "black" },
                },
            },
            thresholdList: [],
            threshold:null,
            userData: null,
            tabElement: null, // 站点实况网格实况网格预报预警信号Tab
        };
    },
    watch: {
        leftMainLeftShow() {
            setTimeout(() => {
                this.map.invalidateSize(true);
            }, 100);
        },
    },
    created() {
        // 初始化界面之前获取数据
        /*  this.initMap(); */
    },
    mounted() {
        this.initMap();
        let user = localStorage.getItem("lcqxfzjz");
        if (user) {
            this.userData = JSON.parse(user);
        }
        console.log(L.velocityLayer());
    },
    methods: {
        initMap() {
            // 初始化网格预报 预报间隔的数据时间
            this.map = L.map(this.$refs["map"], {
                center: [25.03284, 100.546904], // 地图中心
                zoom: 8, //缩放比列
                zoomControl: false, //禁用 + - 按钮
                doubleClickZoom: false, // 禁用双击放大
                attributionControl: false, // 移除右下角leaflet标识
                zoomSnap: 0.01,
            });
            this.map.fitBounds([
                [25.03284, 100.546904],
                [23.073182, 98.668863],
            ]);
            this.imageBounds = [
                [25.035, 100.545],
                [23.015, 98.67],
            ];
            var that = this;
            this.map.on("click", function (e) {
                console.log(e);
                if (that.tabElement == "网格预报") {
                    let latlng = e.latlng;
                    getForecastInfoYb({
                        id: that.wgyb.pngList[that.wgyb.pageIndex].id,
                        lat: latlng.lat,
                        lon: latlng.lng,
                        type: "check",
                    }).then((res) => {
                        L.popup()
                            .setLatLng(e.latlng)
                            .setContent("" + res.data.records.value)
                            .openOn(that.map);
                    });
                } else if (that.tabElement == "网格实况") {
                    let latlng = e.latlng;
                    getForecastInfo({
                        lat: latlng.lat,
                        lon: latlng.lng,
                        id: that.wgsk.id,
                    }).then((res) => {
                        L.popup()
                            .setLatLng(e.latlng)
                            .setContent("" + res.data.records[0])
                            .openOn(that.map);
                    });
                }
            });
        },
        stationShowTimeChange(val) {
            this.stationShowTime = val;
        },
        /* 站点实况传值-时间 */
        stationLiveTimeChange(val) {
            this.mytime = val;
            this.stationLiveTime = val;
        },
        /* 站点实况最新按钮 */
        NewTime(val) {
            if (val) {
                this.mytime = new Date();
                this.stationLiveTime = new Date();
                if (this.stationShowStyle.val_yl != null) {
                    this.initMaplayer(this.stationShowStyle.val_yl, "降水");
                } else if (this.stationShowStyle.val_wd != null) {
                    this.initMaplayer(this.stationShowStyle.val_wd, "温度");
                } else if (this.stationShowStyle.val_wind != null) {
                    this.initMaplayer(this.stationShowStyle.val_wind, "风");
                } else if (this.stationShowStyle.val_njd != null) {
                    this.initMaplayer(this.stationShowStyle.val_njd, "能见度");
                } else if (this.stationShowStyle.val_RHU != null) {
                    this.initMaplayer(this.stationShowStyle.val_RHU, "湿度");
                }
            }
        },
        /* 网格实况最新更新按钮 */
        NewTimewgsk(val) {
            if (val) {
                this.getImgListSK(this.wgsk.time, this.wgsk.type);
            }
        },
        raderShowTimeChange(val) {
            this.raderShowTime = val;
        },
        /* 站点实况传值-要素 */
        stationShowStyleChange(val) {
            console.log(val, "要素");
            this.stationShowStyle = JSON.parse(JSON.stringify(val));
            this.mytime = new Date();
            this.stationLiveTime = new Date();
            if (this.stationShowStyle.val_yl != null) {
                this.initMaplayer(this.stationShowStyle.val_yl, "降水");
            } else if (this.stationShowStyle.val_wd != null) {
                this.initMaplayer(this.stationShowStyle.val_wd, "温度");
            } else if (this.stationShowStyle.val_wind != null) {
                this.initMaplayer(this.stationShowStyle.val_wind, "风");
            } else if (this.stationShowStyle.val_njd != null) {
                this.initMaplayer(this.stationShowStyle.val_njd, "能见度");
            } else if (this.stationShowStyle.val_RHU != null) {
                this.initMaplayer(this.stationShowStyle.val_RHU, "湿度");
            }
        },
        /* 网格预报-时间 */
        stationShowStyleChange_time(val) {
            this.wgyb.time = parseTime(val, "yyyy-MM-dd hh:mm:ss");
            this.getGdimg();
        },
        /* 网格预报-手动change时间 */
        stationLiveTimeChangeYB(val) {
            this.wgyb.time = val;
            this.getGdimg();
        },
        /* 网格预报-要素 */
        stationShowStyleChange_my(val) {
            this.wgyb.type = val.element;
            this.wgyb.inter = val.inter;
            this.wgyb.name = val.name;
        },
        /* 网格预报填色填值 */
        showTypeCheckedYB(params, params1) {
            this.wgyb.color = params;
            this.wgyb.number = params1;
            if (!this.wgyb.color) {
                this.wgyb.image ? this.map.removeLayer(this.wgyb.image) : "";
            } else {
                this.autoimgMap();
            }
            if (this.wgyb.number) {
                this.wgGridValue();
            } else {
                this.wgyb.wgGridLayer.remove();
                this.wgyb.wgGridLayer = null;
            }
        },
        /* 网格实况-要素&&时间 */
        stationShowStyleChange_Sk(time, name) {
            console.log(time, name, "网格实况-要素&&时间");
            this.wgsk.time = time;
            this.wgsk.type = name;
            if (!this.wgyb.color) {
                this.wgsk.image ? this.map.removeLayer(this.wgsk.image) : "";
            } else {
                this.getImgListSK(this.wgsk.time, this.wgsk.type);
            }
        },
        /* 网格实况-手动选择时间 */
        stationLiveTimeChangeSK(time) {
            console.log(time, "网格实况-手动选择时间");
            this.wgsk.time = time;
            if (!this.wgyb.color) {
                this.wgsk.image ? this.map.removeLayer(this.wgsk.image) : "";
            } else {
                this.getImgListSK(this.wgsk.time, this.wgsk.type);
            }
        },
        /* 网格实况填色填值 */
        showTypeCheckedSK(params, params1) {
            this.wgsk.color = params;
            this.wgsk.number = params1;
            if (!this.wgsk.color) {
                this.wgsk.image ? this.map.removeLayer(this.wgsk.image) : "";
            } else {
                this.getImgListSK(this.wgsk.time, this.wgsk.type);
            }
            if (this.wgsk.number) {
                this.wgGridValue1();
            } else {
                this.wgsk.wgGridLayer.remove();
                this.wgsk.wgGridLayer = null;
            }
        },
        radarShowChange(val) {
            this.radarShow = val;
        },
        radarDateChange(val) {
            //雷达时间改变
            let str =
                val.substring(0, 4) +
                "-" +
                val.substring(4, 6) +
                "-" +
                val.substring(6, 8) +
                " " +
                val.substring(8, 10) +
                ":" +
                val.substring(10, 12) +
                ":" +
                val.substring(12, 14);
            this.radarDate = str;
        },
        riskControl(val) {
            this.riskInfoShow = val;
        },
        riskNumber(val) {
            this.riskNum = val;
        },
        initMaplayer(newVal, ele) {
            if (this.zhandianlayer != null) {
                this.zhandianlayer.clearLayers();
                this.zhandianlayer.remove();
                this.zhandianlayer = null;
            }
            this.image ? this.map.removeLayer(this.image) : "";

            let count,
                statEles,
                danwei,
                element,
                timeHour,
                statEleValueRanges;
            let content = [];
            let timeArr = [parseTime(this.mytime, "yyyyMMddhhmmss")];
            if (this.stationShowStyle.gjz && !this.stationShowStyle.qyz) {
                count = 1;
            } else if (
                this.stationShowStyle.qyz &&
                !this.stationShowStyle.gjz
            ) {
                count = 2;
            } else if (this.stationShowStyle.gjz && this.stationShowStyle.qyz) {
                count = 3;
            }
            switch (ele) {
                case "降水":
                    statEles = "sum_pre_1h";
                    switch (newVal) {
                        case "近1H":
                            timeArr.unshift(
                                parseTime(
                                    new Date(
                                        this.mytime.setHours(
                                            this.mytime.getHours() - 1
                                        )
                                    ),
                                    "yyyyMMddhhmmss"
                                )
                            );
                            timeHour = "01";
                            break;
                        case "近3H":
                            timeArr.unshift(
                                parseTime(
                                    new Date(
                                        this.mytime.setHours(
                                            this.mytime.getHours() - 3
                                        )
                                    ),
                                    "yyyyMMddhhmmss"
                                )
                            );
                            timeHour = "03";
                            break;
                        case "近6H":
                            timeArr.unshift(
                                parseTime(
                                    new Date(
                                        this.mytime.setHours(
                                            this.mytime.getHours() - 6
                                        )
                                    ),
                                    "yyyyMMddhhmmss"
                                )
                            );

                            timeHour = "06";
                            break;
                        case "近12H":
                            timeArr.unshift(
                                parseTime(
                                    new Date(
                                        this.mytime.setHours(
                                            this.mytime.getHours() - 12
                                        )
                                    ),
                                    "yyyyMMddhhmmss"
                                )
                            );

                            timeHour = "12";
                            break;
                        case "近24H":
                            timeArr.unshift(
                                parseTime(
                                    new Date(
                                        this.mytime.setHours(
                                            this.mytime.getHours() - 24
                                        )
                                    ),
                                    "yyyyMMddhhmmss"
                                )
                            );

                            timeHour = "24";
                            break;
                        default:
                            break;
                    }
                    danwei = "mm";
                    this.myLegend.unit = ele + danwei;
                    element = "HOR";
                    statEleValueRanges = "sum_pre_1h";
                    this.thresholdList.map((item) => {
                        if (item.type == "rain") {
                            this.threshold = item.value;
                        }
                    });
                    break;
                case "温度":
                    if (newVal == "实时") {
                        statEles = "avg_TEM";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 1
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        timeHour = "01";
                        statEleValueRanges = "avg_TEM";
                    } else if (newVal == "最高24H") {
                        statEles = "max_tem_max";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 24
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        statEleValueRanges = "max_tem_max";
                        timeHour = "24";
                    } else if (newVal == "最低24H") {
                        statEles = "min_TEM_Min";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 24
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        timeHour = "24";
                        statEleValueRanges = "min_TEM_Min";
                    }
                    danwei = "°C";
                    this.myLegend.unit = ele + danwei;
                    element = "TMP";
                    this.thresholdList.map((item) => {
                        if (item.type == "tem") {
                            this.threshold = item.value;
                        }
                    });
                    break;
                case "风":
                    if (newVal == "实时") {
                        statEles = "max_win_s_avg_2mi";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 1
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        timeHour = "01";
                        statEleValueRanges = "max_win_s_avg_2mi";
                    } else if (newVal == "极大1H") {
                        statEles = "max_win_s_inst_max";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 1
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        timeHour = "01";
                        statEleValueRanges = "max_win_s_inst_max";
                    } else if (newVal == "极大24H") {
                        statEles = "max_win_s_inst_max";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 24
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        timeHour = "24";
                        statEleValueRanges = "max_win_s_inst_max";
                    }
                    danwei = "m/s";
                    this.myLegend.unit = ele + danwei;
                    element = "WIN";
                    this.thresholdList.map((item) => {
                        if (item.type == "wind") {
                            this.threshold = item.value;
                        }
                    });
                    break;
                case "能见度":
                    if (newVal == "实时") {
                        statEles = "max_VIS";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 1
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        timeHour = "01";
                        statEleValueRanges = "max_VIS";
                    } else if (newVal == "最低1H") {
                        statEles = "min_vis_min";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 1
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        timeHour = "01";
                        statEleValueRanges = "min_vis_min";
                    } else if (newVal == "最低24H") {
                        statEles = "min_vis_min";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 24
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        timeHour = "24";
                        statEleValueRanges = "min_vis_min";
                    }
                    danwei = "m";
                    this.myLegend.unit = ele + danwei;
                    element = "VIS";
                    this.thresholdList.map((item) => {
                        if (item.type == "vis") {
                            this.threshold = item.value;
                        }
                    });
                    break;
                case "湿度":
                    if (newVal == "实时") {
                        statEles = "avg_RHU";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 1
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        timeHour = "01";
                        statEleValueRanges = "avg_RHU";
                    } else if (newVal == "最高24H") {
                        statEles = "max_RHU";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 24
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        timeHour = "01";
                        statEleValueRanges = "max_RHU";
                    } else if (newVal == "最低24H") {
                        statEles = "min_RHU";
                        timeArr.unshift(
                            parseTime(
                                new Date(
                                    this.stationLiveTime.setHours(
                                        this.stationLiveTime.getHours() - 24
                                    )
                                ),
                                "yyyyMMddhhmmss"
                            )
                        );
                        timeHour = "24";
                        statEleValueRanges = "min_RHU";
                    }
                    danwei = "%";
                    this.myLegend.unit = ele + danwei;
                    element = "RHU";
                    break;
                default:
                    break;
            }
            getDataByParam({
                siteGroup: count,
                interfaceId: "statSurfEleByStaID",
                dataCode: "SURF_CHN_MUL_HOR",
                timeRange: JSON.stringify(timeArr.map((item) => item - 0)),
                elements:
                    "City,Country,NetCode,Station_Name,Lat,Lon,Station_Id_C",
                statEles: statEles,
                statEleValueRanges: `${statEleValueRanges}:(,999998)`,
            }).then((res) => {
                if (res.data.d != null) {
                    this.zhandianlayer = L.layerGroup();
                    this.zhandianInfo = res.data.d.data;
                    this.zhandianInfo.map((item) => {
                        content.push(item[4] + "-" + item[5] + "-" + item[7]);
                        if (Number(item[7]) > Number(this.threshold)) {
                            if (
                                this.stationShowStyle.name &&
                                this.stationShowStyle.site
                            ) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;width:60px;text-align: center;'>${item[3].substring(
                                                0,
                                                2
                                            )}</span>` +
                                            `<span style='display: inline-block;'>${item[6]}</span>` +
                                            `<span style='display: inline-block;color:red'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            } else if (
                                this.stationShowStyle.name &&
                                !this.stationShowStyle.site
                            ) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;width:60px;text-align: center;'>${item[3].substring(
                                                0,
                                                2
                                            )}</span>` +
                                            `<span style='display: inline-block;color:red'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            } else if (
                                this.stationShowStyle.site &&
                                !this.stationShowStyle.name
                            ) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;'>${item[6]}</span>` +
                                            `<span style='display: inline-block;color:red'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            } else if (
                                !this.stationShowStyle.site &&
                                !this.stationShowStyle.name
                            ) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;'></span>` +
                                            `<span style='display: inline-block;color:red'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            } else if (!this.stationShowStyle.name) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;'>${item[6]}</span>` +
                                            `<span style='display: inline-block;color:red'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            } else if (!this.stationShowStyle.site) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;width:60px;text-align: center;'>${item[3].substring(
                                                0,
                                                2
                                            )}</span>` +
                                            `<span style='display: inline-block;color:red'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            }
                        } else {
                            if (
                                this.stationShowStyle.name &&
                                this.stationShowStyle.site
                            ) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;width:60px;text-align: center;'>${item[3].substring(
                                                0,
                                                2
                                            )}</span>` +
                                            `<span style='display: inline-block;'>${item[6]}</span>` +
                                            `<span style='display: inline-block;'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            } else if (
                                this.stationShowStyle.name &&
                                !this.stationShowStyle.site
                            ) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;width:60px;text-align: center;'>${item[3].substring(
                                                0,
                                                2
                                            )}</span>` +
                                            `<span style='display: inline-block;'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            } else if (
                                this.stationShowStyle.site &&
                                !this.stationShowStyle.name
                            ) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;'>${item[6]}</span>` +
                                            `<span style='display: inline-block;'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            } else if (
                                !this.stationShowStyle.site &&
                                !this.stationShowStyle.name
                            ) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;'></span>` +
                                            `<span style='display: inline-block;'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            } else if (!this.stationShowStyle.name) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;'>${item[6]}</span>` +
                                            `<span style='display: inline-block;'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            } else if (!this.stationShowStyle.site) {
                                L.marker([item[4], item[5]], {
                                    icon: L.divIcon({
                                        html:
                                            "<div style='display: flex;flex-direction: column;align-items: center;'>" +
                                            `<span style='display: inline-block;width:60px;text-align: center;'>${item[3].substring(
                                                0,
                                                2
                                            )}</span>` +
                                            `<span style='display: inline-block;'>${item[7]}${danwei}</span>` +
                                            "</div>",
                                        className: "mapShowCityName",
                                        iconSize: [8, 8],
                                        iconAnchor: [8, 8],
                                    }),
                                }).addTo(this.zhandianlayer);
                            }
                        }
                    });
                    this.zhandianlayer.addTo(this.map);
                    if (
                        this.zhandianInfo.every(
                            (item) =>
                                item[7] == 0 ||
                                this.stationShowStyle.image == false
                        )
                    ) {
                        axios.get("./legend/PRE1.json").then((res) => {
                            this.myLegend.list = res.data.colorScale;
                        });
                        danwei = "mm";
                        this.myLegend.unit = "降水" + danwei;
                        this.wgsk.image
                            ? this.map.removeLayer(this.wgsk.image)
                            : "";
                        this.wgyb.image
                            ? this.map.removeLayer(this.wgyb.image)
                            : "";
                    } else {
                        this.initMaplayer2(
                            element,
                            timeHour,
                            content.toString()
                        );
                    }
                } else {
                    this.$message.error("暂无数据");
                }
            });
        },
        initMaplayer2(element, hour, content) {
            this.wgsk.image ? this.map.removeLayer(this.wgsk.image) : "";
            this.wgyb.image ? this.map.removeLayer(this.wgyb.image) : "";
            this.image ? this.map.removeLayer(this.image) : null;
            this.loading = true;
            getImageByParam({
                element: element,
                hour: hour,
                content: content,
                regionId: 1,
            }).then((res) => {
                var imageUrl =
                    "http://172.24.97.251:8082/siteImg/" + res.data.d;

                this.image = L.imageOverlay(imageUrl, this.imageBounds).addTo(
                    this.map
                );
                this.myLegend.list = JSON.parse(
                    res.data.o.slice(14, -10)
                ).filter((el, index) => {
                    return index % 3 == 0;
                });
                this.loading = false;
            });
        },
        timeBtnClick(val) {
            if (val) {
                this.wgyb.pageIndex = val;
                if (!this.wgyb.color) {
                    this.wgyb.image
                        ? this.map.removeLayer(this.wgyb.image)
                        : "";
                } else {
                    this.autoimgMap();
                }
            }
        },
        /* 阈值 */
        thresholdClick(val) {
            this.thresholdList = val;
        },
        /* 获得格点图片数据 */
        getGdimg() {
            this.map.closePopup();
            this.loading = true;
            this.wgyb.image ? this.map.removeLayer(this.wgyb.image) : "";
            var danwei;
            if (this.wgyb.name) {
                if (this.wgyb.name.indexOf("降水") > 0) {
                    axios.get("./legend/PRE1.json").then((res) => {
                        this.myLegend.list = res.data.colorScale;
                    });
                    danwei = "mm";
                    this.myLegend.unit = "降水" + danwei;
                } else if (this.wgyb.name.indexOf("气温") > 0) {
                    axios.get("./legend/TMP.json").then((res) => {
                        res.data.colorScale.map((item) => {
                            item.value = Number(item.value - 273.15).toFixed();
                        });
                        this.myLegend.list = res.data.colorScale;
                    });
                    danwei = "°C";
                    this.myLegend.unit = "气温" + danwei;
                } else if (this.wgyb.name.indexOf("风") > 0) {
                    axios.get("./legend/WIN.json").then((res) => {
                        this.myLegend.list = res.data.colorScale;
                    });
                    danwei = "m/s";
                    this.myLegend.unit = "风" + danwei;
                } else if (this.wgyb.name.indexOf("见度") > 0) {
                    axios.get("./legend/VIS.json").then((res) => {
                        this.myLegend.list = res.data.colorScale;
                    });
                    danwei = "m";
                    this.myLegend.unit = "能见度" + danwei;
                } else if (this.wgyb.name.indexOf("湿度") > 0) {
                    axios.get("./legend/ERH.json").then((res) => {
                        this.myLegend.list = res.data.colorScale;
                    });
                    danwei = "%";
                    this.myLegend.unit = "湿度" + danwei;
                }
            }

            getGdimg({
                qbTime: this.wgyb.time,
                inter: this.wgyb.inter,
                element: this.wgyb.type,
            }).then((res) => {
                if (res.data.state == 204) {
                    this.wgsk.image
                        ? this.map.removeLayer(this.wgsk.image)
                        : "";
                    this.wgyb.image
                        ? this.map.removeLayer(this.wgyb.image)
                        : "";
                    this.image ? this.map.removeLayer(this.image) : "";
                    this.loading = false;
                    this.wgyb.pngList = [];
                    /* this.$message.error(res.data.stateStr); */
                } else {
                    this.wgyb.pngList = res.data.records;
                    this.loading = false;
                    if (!this.wgyb.color) {
                        this.wgyb.image
                            ? this.map.removeLayer(this.wgyb.image)
                            : "";
                    } else {
                        this.autoimgMap();
                    }
                }
            });
        },
        autoimgMap() {
            this.wgsk.image ? this.map.removeLayer(this.wgsk.image) : "";
            this.wgyb.image ? this.map.removeLayer(this.wgyb.image) : "";
            this.image ? this.map.removeLayer(this.image) : "";
            this.wgyb.id = this.wgyb.pngList[this.wgyb.pageIndex].id;
            if (this.wgyb.number) {
                this.wgGridValue();
            }
            var imageUrl =
                    "http://172.24.97.251:8082/" +
                    "grid_yb/" +
                    this.wgyb.pngList[this.wgyb.pageIndex].year +
                    "/" +
                    this.wgyb.pngList[this.wgyb.pageIndex].month +
                    "/" +
                    this.wgyb.pngList[this.wgyb.pageIndex].day +
                    "/" +
                    this.wgyb.pngList[this.wgyb.pageIndex].pngName,
                zIndex = -99;
            this.wgyb.image = L.imageOverlay(
                imageUrl,
                this.imageBounds,
                zIndex
            ).addTo(this.map);
        },
        /* 获得格点实况图片信息 */
        getImgListSK(time, name) {
            this.map.closePopup();
            this.loading = true;
            if (name != "uv") {
                this.wgsk.image ? this.map.removeLayer(this.wgsk.image) : "";
            }
            this.wgyb.image ? this.map.removeLayer(this.wgyb.image) : "";
            this.image ? this.map.removeLayer(this.image) : "";
            var danwei;
            if (name == "ER01") {
                axios.get("./legend/PRE1.json").then((res) => {
                    this.myLegend.list = res.data.colorScale;
                });
                danwei = "mm";
                this.myLegend.unit = "降水" + danwei;
            } else if (name == "TAIR") {
                axios.get("./legend/TMP.json").then((res) => {
                    res.data.colorScale.map((item) => {
                        item.value = Number(item.value - 273.15).toFixed();
                    });
                    this.myLegend.list = res.data.colorScale;
                });
                danwei = "°C";
                this.myLegend.unit = "温度" + danwei;
            } else if (name == "WIND") {
                axios.get("./legend/WIN.json").then((res) => {
                    this.myLegend.list = res.data.colorScale;
                });
                danwei = "m/s";
                this.myLegend.unit = "风" + danwei;
            } else if (name == "能见度") {
                axios.get("./legend/VIS.json").then((res) => {
                    this.myLegend.list = res.data.colorScale;
                });
                danwei = "m";
                this.myLegend.unit = "能见度" + danwei;
            } else if (name == "QAIR") {
                axios.get("./legend/ERH.json").then((res) => {
                    this.myLegend.list = res.data.colorScale;
                });
                danwei = "%";
                this.myLegend.unit = "湿度" + danwei;
            }
            getImgListSK({
                qbTime: time,
            }).then((res) => {
                if (res.data.state == 200) {
                    res.data.records.map((item) => {
                        if (item.element == name && item.element != "uv") {
                            this.wgsk.id = item.id;
                            if (this.wgsk.number) {
                                this.wgGridValue1();
                            }
                            if (this.wgsk.color) {
                                var imageUrl =
                                    "http://172.24.97.251:8082/" +
                                    "grid_sk/" +
                                    item.year +
                                    "/" +
                                    item.month +
                                    "/" +
                                    item.day +
                                    "/" +
                                    item.pngName;
                                var zIndex = -99;
                                this.wgsk.image = L.imageOverlay(
                                    imageUrl,
                                    this.imageBounds,
                                    zIndex
                                ).addTo(this.map);
                            } else {
                                this.wgsk.image
                                    ? this.map.removeLayer(this.wgsk.image)
                                    : "";
                            }
                        }
                        if (item.element == "uv") {
                            this.wgsk.UVurl =
                                "http://172.24.97.251:8082/grid_sk/" +
                                item.year +
                                "/" +
                                item.month +
                                "/" +
                                item.day +
                                "/" +
                                item.pngName;
                        }
                    });
                    this.loading = false;
                }
            });
        },
        wgGridValue() {
            //格点值
            if (this.wgyb.wgGridLayer) {
                this.wgyb.wgGridLayer.remove();
                this.wgyb.wgGridLayer = null;
            }
            if (!this.wgyb.wgGridLayer) {
                this.wgyb.wgGridLayer = L.canvas({
                    padding: 0,
                    pane: "markerPane",
                }).addTo(this.map);
                this.autoNumMap();
                this.wgyb.wgGridLayer.on("update", this.wgGridLayerUpdate); // 画布更新调用的方法
            }
        },
        wgGridValue1() {
            //格点值
            if (this.wgsk.wgGridLayer) {
                this.wgsk.wgGridLayer.remove();
                this.wgsk.wgGridLayer = null;
            }
            if (!this.wgsk.wgGridLayer) {
                this.wgsk.wgGridLayer = L.canvas({
                    padding: 0,
                    pane: "markerPane",
                }).addTo(this.map);
                this.autoNumMap1();
                this.wgsk.wgGridLayer.on("update", this.wgGridLayerUpdate1); // 画布更新调用的方法
            }
        },
        wgGridLayerUpdate() {
            // 格点值显示更新
            var size = this.map.getSize();
            let canvas = this.wgyb.wgGridLayer._container;
            let ctx = this.wgyb.wgGridLayer._ctx;
            canvas.width = size.x;
            canvas.height = size.y;

            ctx.font = "12px Arial";
            ctx.fillStyle = "#2c5a9d";
            ctx.lineWidth = 0.3;
            ctx.strokeStyle = "#000";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            this.autoNumMap(ctx, size); // 格点值
        },
        wgGridLayerUpdate1() {
            // 格点值显示更新
            var size = this.map.getSize();
            let canvas = this.wgsk.wgGridLayer._container;
            let ctx = this.wgsk.wgGridLayer._ctx;
            canvas.width = size.x;
            canvas.height = size.y;

            ctx.font = "12px Arial";
            ctx.fillStyle = "#2c5a9d";
            ctx.lineWidth = 0.3;
            ctx.strokeStyle = "#000";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            this.autoNumMap1(ctx, size); // 格点值
        },
        /* 网格预报格点值 */
        autoNumMap() {
            getGribInfo({
                id: this.wgyb.id,
            }).then((res) => {
                if (res.data.state == 204) {
                    this.$message.error(res.data.stateStr);
                } else {
                    var size = this.map.getSize();
                    let canvas = this.wgyb.wgGridLayer._container;
                    let ctx = this.wgyb.wgGridLayer._ctx;
                    canvas.width = size.x;
                    canvas.height = size.y;
                    ctx.font = "12px Arial";
                    ctx.fillStyle = "#2c5a9d";
                    ctx.lineWidth = 0.3;
                    ctx.strokeStyle = "#000";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";

                    var latInterval = res.data.records.lonStep;
                    var lngInterval = res.data.records.latStep;
                    var startLat = res.data.records.startLat;
                    var startLng = res.data.records.startLon;
                    let latCount = res.data.records.latCount;
                    var num = 1;
                    var zoom = parseInt(this.map.getZoom());
                    let row = latCount;
                    if (zoom <= 6) {
                        row = 10;
                    } else if (zoom == 7) {
                        row = 15;
                    } else if (zoom == 8) {
                        row = 20;
                    } else if (zoom == 9) {
                        row = 30;
                    } else if (zoom == 10) {
                        row = 40;
                    } else if (zoom == 11) {
                        row = 50;
                    }
                    num = parseInt(latCount / row);
                    var dataArray = res.data.records.arrayFloat;
                    for (let i = 0; i < dataArray.length; i += num) {
                        for (let j = 0; j < dataArray[i].length; j += num) {
                            // 格点值
                            let latlng = [
                                i * latInterval + startLat,
                                j * lngInterval + startLng,
                            ];
                            let point = this.map.latLngToContainerPoint(latlng);
                            if (
                                point.x < 0 ||
                                point.y < 0 ||
                                point.x > size.x ||
                                point.y > size.y
                            ) {
                                // 超出画布
                                continue;
                            }

                            let val = Number(dataArray[i][j].toFixed(1));
                            // ctx.strokeText(val, point.x, point.y);
                            ctx.fillText(val, point.x, point.y);
                        }
                    }
                }
            });
        },
        /* 网格实况格点值 */
        autoNumMap1() {
            getGribInfoSK({
                id: this.wgsk.id,
            }).then((res) => {
                if (res.data.state == 204) {
                    this.$message.error(res.data.stateStr);
                } else {
                    var size = this.map.getSize();
                    let canvas = this.wgsk.wgGridLayer._container;
                    let ctx = this.wgsk.wgGridLayer._ctx;
                    canvas.width = size.x;
                    canvas.height = size.y;
                    ctx.font = "12px Arial";
                    ctx.fillStyle = "#2c5a9d";
                    ctx.lineWidth = 0.3;
                    ctx.strokeStyle = "#000";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";

                    var latInterval = res.data.records.lonStep;
                    var lngInterval = res.data.records.latStep;
                    var startLat = res.data.records.startLat;
                    var startLng = res.data.records.startLon;
                    let latCount = res.data.records.latCount;
                    var num = 1;
                    var zoom = parseInt(this.map.getZoom());
                    let row = latCount;
                    if (zoom <= 6) {
                        row = 10;
                    } else if (zoom == 7) {
                        row = 15;
                    } else if (zoom == 8) {
                        row = 20;
                    } else if (zoom == 9) {
                        row = 30;
                    } else if (zoom == 10) {
                        row = 40;
                    } else if (zoom == 11) {
                        row = 50;
                    }
                    num = parseInt(latCount / row);
                    var dataArray = res.data.records.arrayFloat;
                    for (let i = 0; i < dataArray.length; i += num) {
                        for (let j = 0; j < dataArray[i].length; j += num) {
                            // 格点值
                            let latlng = [
                                i * latInterval + startLat,
                                j * lngInterval + startLng,
                            ];
                            let point = this.map.latLngToContainerPoint(latlng);
                            if (
                                point.x < 0 ||
                                point.y < 0 ||
                                point.x > size.x ||
                                point.y > size.y
                            ) {
                                // 超出画布
                                continue;
                            }

                            let val = Number(dataArray[i][j].toFixed(1));
                            // ctx.strokeText(val, point.x, point.y);
                            ctx.fillText(val, point.x, point.y);
                        }
                    }
                }
            });
        },
        /* tab 切换 */
        tabSeletChange(val) {
            this.tabElement = val;
            if (val == "网格实况") {
                if (this.wgyb.wgGridLayer != null) {
                    this.wgyb.wgGridLayer.remove();
                    this.wgyb.wgGridLayer = null;
                }
                this.wgyb.number = false;
            } else if (val == "网格预报") {
                if (this.wgsk.wgGridLayer != null) {
                    this.wgsk.wgGridLayer.remove();
                    this.wgsk.wgGridLayer = null;
                }
                this.wgsk.number = false;
            } else if (val == "站点实况") {
                if (this.wgyb.wgGridLayer != null) {
                    this.wgyb.wgGridLayer.remove();
                    this.wgyb.wgGridLayer = null;
                }
                this.wgyb.number = false;
                if (this.wgsk.wgGridLayer != null) {
                    this.wgsk.wgGridLayer.remove();
                    this.wgsk.wgGridLayer = null;
                }
                this.wgsk.number = false;
                if (this.stationShowStyle.val_yl != null) {
                    this.initMaplayer(this.stationShowStyle.val_yl, "降水");
                } else if (this.stationShowStyle.val_wd != null) {
                    this.initMaplayer(this.stationShowStyle.val_wd, "温度");
                } else if (this.stationShowStyle.val_wind != null) {
                    this.initMaplayer(this.stationShowStyle.val_wind, "风");
                } else if (this.stationShowStyle.val_njd != null) {
                    this.initMaplayer(this.stationShowStyle.val_njd, "能见度");
                } else if (this.stationShowStyle.val_RHU != null) {
                    this.initMaplayer(this.stationShowStyle.val_RHU, "湿度");
                }
            } else if (val == "预警信号") {
                if (this.wgyb.wgGridLayer != null) {
                    this.wgyb.wgGridLayer.remove();
                    this.wgyb.wgGridLayer = null;
                }
                this.wgyb.number = false;
                if (this.wgsk.wgGridLayer != null) {
                    this.wgsk.wgGridLayer.remove();
                    this.wgsk.wgGridLayer = null;
                }
                this.wgsk.number = false;
            }
        },
        // 风场开关
        switchWind(val) {
            if (val) {
                if (this.wgsk.UVurl != null) {
                    this.getseue();
                } else {
                    this.$message.error("暂无风场数据");
                }
            } else {
                this.map.removeLayer(this.wgsk.velocityLayer);
                this.wgsk.velocityLayer = null;
            }
        },
        // 风场修改
        reveiseFs(obj) {
            this.wgsk.paramsObj = obj;
        },
        async getseue() {
            // 生成风场实例,await只能出现在async函数中
            if (this.wgsk.velocityLayer != null) {
                this.map.removeLayer(this.wgsk.velocityLayer);
                this.wgsk.velocityLayer = null;
            }
            var dateJson = [];
            const { data: res } = await axios.get(this.wgsk.UVurl); //await 用于等待一个异步方法执行完成。
            let windU = res[0];
            let windV = res[1];
            console.log(res, "风场");
            let U = windU.data;
            let V = windV.data;
            dateJson.push(
                {
                    header: {
                        gribLength: 53934,
                        parameterCategory: 2,
                        parameterNumber: 2,
                        dx: windU.header.dx,
                        dy: windU.header.dy,
                        parameterCategoryName: "Momentum",
                        parameterNumberName: "U-component_of_wind",
                        la1: windV.header.la1,
                        la2: windV.header.la2,
                        lo1: windV.header.lo1,
                        lo2: windV.header.lo2,
                        nx: windU.header.nx,
                        ny: windU.header.ny,
                    },
                    data: U,
                },
                {
                    header: {
                        gribLength: 53934,
                        parameterCategory: 2,
                        parameterNumber: 3,
                        dx: windU.header.dx,
                        dy: windU.header.dy,
                        parameterCategoryName: "Momentum",
                        parameterNumberName: "U-component_of_wind",
                        la1: windV.header.la1,
                        la2: windV.header.la2,
                        lo1: windV.header.lo1,
                        lo2: windV.header.lo2,
                        nx: windU.header.nx,
                        ny: windU.header.ny,
                    },
                    data: V,
                }
            );
            this.wgsk.velocityLayer = L.velocityLayer({
                displayValues: true,
                displayOptions: {
                    velocityType: "GBR Wind",
                    displayPosition: "bottomleft",
                    displayEmptyString: "No wind data",
                },
                data: dateJson, // 风场数据
                minVelocity: 0, // 粒子最小速度（ m/s ）
                maxVelocity: 10, // 粒子最大速度（ m/s ）
                velocityScale: this.wgsk.paramsObj["length"].selectValue, // 风速的比例 ( 粒子的小尾巴长度 )
                particleAge: 90, // 粒子在再生之前绘制的最大帧数
                particleMultiplier: 2 / 2000, // 粒子计数标量（ 粒子密度 ）
                lineWidth: this.wgsk.paramsObj["width"].selectValue, // 粒子的粗细
                frameRate: this.wgsk.paramsObj["speed"].selectValue, // 定义每秒执行的次数 每秒所需的帧数
                colorScale: [this.wgsk.paramsObj["color"].selectValue],
            });
            this.wgsk.velocityLayer.addTo(this.map);
        },
        SeletLonlng(position) {
            this.map.setView(position, 10);
            getForecastInfo({
                lat: position[0],
                lon: position[1],
                id: this.wgsk.id,
            }).then((res) => {
                L.popup()
                    .setLatLng(position)
                    .setContent("" + res.data.records[0])
                    .openOn(this.map);
            });
        },
        SeletLonlngYB(position) {
            this.map.setView(position, 10);
            getForecastInfoYb({
                lat: position[0],
                lon: position[1],
                id: this.wgyb.id,
                type: "check",
            }).then((res) => {
                L.popup()
                    .setLatLng(position)
                    .setContent("" + res.data.records.value)
                    .openOn(this.map);
            });
        },
    },
};
</script>
<style scoped>
#left {
    width: calc(100% - 26.875rem);
    height: 100%;
    overflow: hidden;
    display: inline-block;
}
#right {
    width: 26.875rem;
    height: 100%;
    overflow: auto;
    display: inline-block;
    background: #f5f6f7;
}
#leftTop {
    width: 100%;
    height: 40px;
    overflow: hidden;
    border-bottom: 0.0625rem solid #adb3bb;
}
#leftMain {
    width: 100%;
    height: calc(100% - 40px);
    overflow: hidden;
    display: inline-block;
    position: relative;
}
#leftMainLeft {
    width: 21.875rem;
    height: 100%;
    overflow: auto;
    display: inline-block;
}
#leftMainRight {
    width: calc(100% - 21.875rem);
    height: 100%;
    overflow: hidden;
    display: inline-block;
    border-right: 0.0625rem solid #adb3bb;
    border-left: 0.0625rem solid #adb3bb;
    position: relative;
}
.leftMainLeftShowBtn {
    position: absolute;
    top: 20%;
    left: 21.9375rem;
    border-left: none;
    border-radius: 0 0.25rem 0.25rem 0;
    width: 1.25rem;
    padding: 0.625rem 0;
    border-color: #adb3bb;
    z-index: 999;
}
#leftMain.leftMainLeftShow .leftMainLeftShowBtn {
    left: 0;
}
#leftMain.leftMainLeftShow #leftMainRight {
    border-left: none;
    width: 100%;
}

#leftTop > div {
    height: 100%;
    display: inline-block;
    vertical-align: top;
}
#leftTop .mapMarkerBox {
    width: 13.4375rem;
}
#leftTop .mapMarkerBox >>> label {
    width: 50%;
    display: inline-block;
    margin: 0;
    padding: 0.25rem 0 0.25rem 0.625rem;
}
#leftTop >>> .radarMarker {
    width: calc(100% - 350px);
    border-right: 1px solid #adb3bb;
    border-left: 1px solid #adb3bb;
}
#map >>> .mapProvinceName {
    color: #aaa;
    font-size: 1.125rem;
}
#map >>> .mapCountyName {
    color: #ccc;
    font-size: 0.75rem;
}
#map >>> .mapCityName {
    color: #3e87f4;
}
#map >>> .mapShowCityName img {
    width: 24px;
    height: 24px;
}
#map >>> .mapCityName span {
    font-size: 0.875rem !important;
    position: absolute;
    top: 50%;
    white-space: nowrap;
    left: 50%;
    transform: translate(-50%, -1.125rem);
}

#map >>> .mapCityName:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    background: #3e87f4;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 6.1875rem;
}
#leftMainRight >>> .legend {
    position: absolute;
    bottom: 0;
    right: 100px;
    z-index: 2;
}
#leftMainRight >>> .info {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 2;
}

/**切换城市弹框 */
#addrListBox {
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    width: 21.875rem;
    z-index: 9999;
    box-shadow: 0 0.625rem 0.625rem -0.625rem #aaa;
}
#addrListBox > p {
    margin: 0;
    background: #dcecff;
    text-align: right;
    padding: 0.1875rem 0.625rem;
    font-size: 1.25rem;
}
#addrListBox > p > i {
    cursor: pointer;
}
#addrListBox > p > i:hover {
    color: #3e87f4;
}
/**雷达图文字说明 */
#infoDiv {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(255, 255, 255, 0.8);
    padding: 5px 8px;
}
</style>
