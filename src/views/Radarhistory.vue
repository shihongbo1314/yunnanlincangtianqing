<template>
    <div class="radarHistoryMain">
        <div class="contentLeft">
            <el-card class="box_card">
                <div class="top">
                    数据时间
                    <el-date-picker
                        v-model="startTime"
                        style="margin-left: 10px"
                        type="datetime"
                        size="small"
                        :picker-options="pickerOptions"
                        placeholder="开始时间"
                    >
                    </el-date-picker>
                    -
                    <el-date-picker
                        style="margin-right: 20px"
                        v-model="endTime"
                        type="datetime"
                        size="small"
                        :picker-options="pickerOptions"
                        placeholder="结束时间"
                    >
                    </el-date-picker>

                    <div style="padding: 15px 0;">
                        阈值设置
                        <el-select
                            v-model="value"
                            placeholder="请选择"
                            style="margin-left: 10px;width: 180px;"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-input
                            v-model="inputValue"
                            style="margin-left: 10px;width: 180px;"
                        ></el-input>
                        <span style="color: #8092B9;font-size:12px;">*显示雷达DBZ超过阈值时次的产品</span>

                    </div>
                    <el-radio-group
                        v-model="radarType"
                        size="small"
                        @change="handleChange"
                    >
                        <el-radio-button
                            v-for="item in radarTypeList"
                            :label="item.value"
                            :key="item.value"
                        >{{item.name}}</el-radio-button>
                    </el-radio-group>
                    <el-button
                        class="btn"
                        style="margin-left: 25px;"
                        type="primary"
                        @click="getData()"
                        size="small"
                    >查询</el-button>
                </div>
                <div
                    class="bottom"
                    v-if="imageArray.length"
                >
                    <div class="bottom_btn">
                        <el-button
                            type="success"
                            v-if="!playState"
                            @click="play"
                        >播放</el-button>
                        <el-button
                            type="danger"
                            v-if="playState"
                            @click="pause"
                        >暂停</el-button>
                    </div>
                    <div class="bottom_content">
                        <ul>
                            <li
                                v-for="(i,index) in imageArray"
                                :key="index"
                                :class="selectIndex==index?'active':''"
                            >
                                <span @click="selectIndex = index;handleChange()">{{i.datatimeStr}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="contentRight">
            <el-card class="box_card">
                <div
                    id="radarMap"
                    ref="radarMap"
                >
                    <mapLegend />
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import mapLegend from "../components/index/mapLegend.vue";
import * as L from "leaflet";
import service from "@/api/request";
import { DateGrid } from "@/utils";
export default {
    name: "RadarHistory",
    data() {
        return {
            startTime: "",
            endTime: "",
            size: 10,
            current: 1,
            radarTypeList: [
                { name: "组合反射率", value: "CR_0.0" },
                { name: "0.5仰角反射率", value: "REF_0.5" },
                { name: "1.5仰角反射率", value: "REF_1.5" },
                { name: "0.5速度图", value: "VEL_0.5" },
                { name: "1.5速度图", value: "VEL_1.5" },
            ],
            radarType: "CR_0.0",
            selectIndex: 0,
            imageArray: [],
            playState: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6; //只能选择今天及今天之前的日期
                },
            },
            options: [
                {
                    value: "1",
                    label: ">=大于等于",
                },
                {
                    value: "2",
                    label: "<=小于等于",
                },
            ],
            value: ">=大于等于",
            inputValue: "",
        };
    },
    components: {
        mapLegend,
    },
    created() {
        this.startTime = new Date(
            new Date().getTime() - 1000 * 60 * 60 * 24 * 1
        );
        this.endTime = new Date();
    },
    mounted() {
        this.initMap();
        this.getData();
    },
    methods: {
        initMap() {
            // 初始化网格预报 预报间隔的数据时间
            this.map = L.map(this.$refs["radarMap"], {
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

            //区县边界
            let cityJSON = require("@/assets/map/530900_full.json");
            let mapLayer = L.geoJSON(cityJSON, {
                style: () => {
                    return {
                        zIndex: 2,
                        color: "rgb(64,158,255)",
                        fill: false,
                        weight: 2,
                    };
                },
                pane: "tilePane",
            });
            mapLayer.addTo(this.map);

            //区县名
            let countyLayer = L.layerGroup();
            this.$store.state.regionList.forEach((item) => {
                let countyMarker = L.marker(item.center, {
                    icon: L.divIcon({
                        className: "mapCityName",
                        html: "<span>" + item.name + "</span>",
                        iconSize: [60, 40],
                        iconAnchor: [30, 20],
                    }),
                    pane: "tilePane",
                });
                countyMarker.addTo(countyLayer);
            });
            countyLayer.addTo(this.map);
        },
        getData() {
            let params = {
                startTime: DateGrid(this.startTime, "yyyy-MM-dd HH:mm:00"),
                endTime: DateGrid(this.endTime, "yyyy-MM-dd HH:mm:00"),
            };
            if (this.inputValue != "") {
                params.max = this.inputValue;
                if (this.value == ">=大于等于") {
                    params.type = ">=";
                } else {
                    params.type = "<=";
                }
            }

            service.post("/radar/list", params).then((res) => {
                this.imageArray = [];
                if (res.data.state == 200) {
                    let arr = res.data.records;
                    for (let i = arr.length - 1; i >= 0; i--) {
                        let obj = {
                            datatime: arr[i].datatime,
                            datatimeStr: this.getDateStr(arr[i].datatime),
                        };
                        this.imageArray.push(obj);
                    }
                    this.selectIndex = 0;
                    this.handleChange();
                } else {
                    if (this.imageLayer) {
                        this.imageLayer.remove();
                        this.imageLayer = null;
                    }
                    this.$message.error("暂无数据");
                }
            });
        },
        handleChange() {
            //时次切换
            if (this.imageArray.length == 0) {
                return;
            }
            let radar = this.radarType.split("_");
            let imageUrl = `${this.$store.state.fileUrl}/RadarImg/Z9883_${
                this.imageArray[this.selectIndex]["datatime"]
            }_${radar[1]}_230_${radar[0]}.png`;
            if (this.imageLayer) {
                this.imageLayer.setUrl(imageUrl);
            } else {
                let imageBounds = [
                    [25.7, 102.15],
                    [22.11, 98.22],
                ];
                //CR
                if (radar[0] == "CR") {
                    imageBounds = L.latLngBounds(
                        L.latLng(21.94290007384079, 98, 21771660432698),
                        L.latLng(25.849085884148788, 102.49101883646262)
                    );
                } else if (radar[0] == "REF" || radar[0] == "VEL") {
                    imageBounds = L.latLngBounds(
                        L.latLng(21.844000487912907, 97.90353894213156),
                        L.latLng(25.976960180663, 102.43312427251975)
                    );
                }

                this.imageLayer = L.imageOverlay(imageUrl, imageBounds).addTo(
                    this.map
                );
            }
        },
        getDateStr(dateStr) {
            //时间格式切换
            let str =
                dateStr.substring(4, 6) +
                "-" +
                dateStr.substring(6, 8) +
                " " +
                dateStr.substring(8, 10) +
                ":" +
                dateStr.substring(10, 12);
            return str;
        },
        play() {
            //播放
            this.playState = true;
            this.timer = setInterval(() => {
                this.selectIndex++;
                if (this.selectIndex == this.imageArray.length) {
                    this.selectIndex = 0;
                }
                this.handleChange();
            }, 1000);
        },
        pause() {
            //暂停
            clearInterval(this.timer);
            this.timer = null;
            this.playState = false;
        },
    },
};
</script>
<style lang="less" scoped>
.radarHistoryMain {
    height: 100%;
    padding: 16px;
    background: #f5f6f7;
    display: flex;
    & .box_card {
        height: 100%;
    }
    .contentLeft {
        height: 100%;
        width: 700px;
        /deep/ .el-card__body {
            height: 100%;
        }
        .top {
            margin-bottom: 20px;
        }
        .bottom {
            .bottom_btn {
                margin-bottom: 10px;
            }
            .bottom_content {
                height: calc(100% - 42px);
                overflow: auto;
                ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    &::after {
                        content: "";
                        display: block;
                        clear: both;
                    }
                    li {
                        float: left;
                        width: 20%;
                        margin-bottom: 15px;
                        span {
                            display: inline-block;
                            width: 110px;
                            height: 36px;
                            line-height: 36px;
                            border-radius: 4px;
                            border: 1px solid #dcdfe6;
                            text-align: center;
                            cursor: pointer;
                        }
                        &.active {
                            span {
                                background: #dcecff;
                                color: #2d5a9d;
                            }
                        }
                    }
                }
            }
            height: calc(100% - 120px);
        }
    }
    .contentRight {
        height: 100%;
        flex: 1;
        padding-left: 16px;
        /deep/ .el-card__body {
            height: 100%;
        }
        #radarMap {
            width: 100%;
            height: 100%;
            background: #fff;
        }
        /deep/.legendBox {
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 2;
        }
    }
}
</style>