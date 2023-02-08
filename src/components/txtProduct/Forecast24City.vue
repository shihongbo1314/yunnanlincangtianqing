<template>
    <div class="content">
        <el-card class="box_card">
        <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
            class="commonTable"
            >
                <el-table-column prop="name" label="区县"> </el-table-column>
                <el-table-column prop="phe24" label="24小时天气现象">
                    <template slot-scope="scope">
                    <el-select
                        v-model="scope.row.phe24"
                        filterable
                        placeholder="请选择天气现象"
                    >
                        <el-option
                        v-for="item in weatherPheList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                        >
                        </el-option>
                    </el-select>
                    </template>
                </el-table-column>

                <el-table-column prop="min" label="最低温(℃)">
                    <template slot-scope="scope">
                    <el-input
                        v-model.number="scope.row.min"
                        type="number"
                        class="numberInput"
                    ></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="max" label="最高温(℃)">
                    <template slot-scope="scope">
                    <el-input
                        v-model.number="scope.row.max"
                        type="number"
                        class="numberInput"
                    ></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="disaster" class-name="disClass">
                    <template slot="header">
                    <div>地质灾害气象</div>
                    <div>风险等级</div>
                    <el-popover
                        popper-class="disPopover"
                        placement="bottom"
                        trigger="click"
                    >
                        <div class="footer">
                        <p>
                            按照地质灾害发生的风险，地质灾害气象风险预警分为四级，由弱到强分别为：
                        </p>
                        <ul>
                            <template v-for="(item, index) in disasterList">
                            <li v-if="item.level" :key="index">
                                {{ item.name
                                }}{{ item.level }}：表示24小时内地质灾害发生<span
                                :style="{
                                    background: item.color,
                                    color: item.fcolor,
                                }"
                                >{{ item.info }}</span
                                >
                            </li>
                            </template>
                        </ul>
                        </div>
                        <i slot="reference" class="el-icon-warning"></i>
                    </el-popover>
                    </template>
                    <template slot-scope="scope">
                    <el-select v-model="scope.row.disaster" placeholder="请选择">
                        <el-option
                        v-for="(item, index) in disasterList"
                        :key="index"
                        :label="item.name"
                        :value="index"
                        >

                        </el-option>
                    </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="unit" label="发布单位"></el-table-column>
                <el-table-column label="发布时间">
                    <template slot-scope="scope">
                    {{ scope.row.date }}
                    </template>
                </el-table-column>
            </el-table>      
            
            <div class="header">
                <el-row>
                    <el-col :span="12">
                    <el-button type="primary" size="medium" @click="preview"
                        >预览</el-button
                    >
                    </el-col>
                    <el-col :span="12" style="text-align: right">
                    <el-button type="success" size="medium" @click="save"
                        >保存</el-button
                    >
                    </el-col>
                </el-row>
            </div>
            <div class="middle">
                <table>
                    <tbody>
                    <tr v-for="(item, index) in txtTableData" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.phe }}</td>
                        <td>{{ item.tem }}</td>
                        <td>{{ item.disaster }}</td>
                        <td>{{ item.publish }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getForecastCity, amendForecastCity } from "@/api/make.js"
import { mapState } from "vuex"
import service from "@/api/request"
export default {
    name: "Forecast24City",
    data() {
        return {
            tableData: [
                {
                name: "临翔", //县区
                phe24: 0, //24小时天气现象
                max: 0, //最高温
                min: 0, //最低温
                disaster: 0, //地质灾害风险等级
                unit: "临翔区气象台",
                date: "6月16日16时",
                },
                {
                name: "云县",
                phe24: 0,
                max: 0,
                min: 0,
                disaster: 0,
                unit: "云县气象台",
                date: "6月16日16时",
                },
                {
                name: "凤庆",
                phe24: 0,
                max: 0,
                min: 0,
                disaster: 0,
                unit: "凤庆县气象台",
                date: "6月16日16时",
                },
                {
                name: "永德",
                phe24: 0,
                max: 0,
                min: 0,
                disaster: 0,
                unit: "永德县气象台",
                date: "6月16日16时",
                },
                {
                name: "镇康",
                phe24: 0,
                max: 0,
                min: 0,
                disaster: 0,
                unit: "镇康县气象台",
                date: "6月16日16时",
                },
                {
                name: "耿马",
                phe24: 0,
                max: 0,
                min: 0,
                disaster: 0,
                unit: "耿马县气象台",
                date: "6月16日16时",
                },
                {
                name: "沧源",
                phe24: 0,
                max: 0,
                min: 0,
                disaster: 0,
                unit: "沧源县气象台",
                date: "6月16日16时",
                },
                {
                name: "双江",
                phe24: 0,
                max: 0,
                min: 0,
                disaster: 0,
                unit: "双江县气象台",
                date: "6月16日16时",
                },
            ],
            disasterList: [
                { name: "无", level: "", info: "无风险" },
                {
                name: "Ⅳ级",
                level: "（蓝色）",
                info: "有一定风险",
                color: "blue",
                fcolor: "#fff",
                },
                {
                name: "Ⅲ级",
                level: "（黄色）",
                info: "风险较高",
                color: "yellow",
                fcolor: "#000",
                },
                {
                name: "Ⅱ级",
                level: "（橙色）",
                info: "风险高",
                color: "orange",
                fcolor: "#000",
                },
                {
                name: "Ⅰ级",
                level: "（红色）",
                info: "风险很高",
                color: "red",
                fcolor: "#fff",
                },
            ],
            txtTableData: [],
            textData: null
        }
  },
    computed: {
        ...mapState(["weatherPheList"]),
    },
    created() {
        let now = new Date();
        let dateStr = `${now.getMonth() + 1}月${now.getDate()}日16时`;
        this.tableData.forEach((item) => {
            item.date = dateStr;
        });
        //生成文本数据
        this.preview();
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let user = JSON.parse(localStorage.getItem("lcqxfzjz"))
            service.post("/productWeatherCity/getCityWeather",{
                size: 1,
                regionId: user.userRegion.id,
                roleId: user.roleInfo.id,
            }).then((res) => {
                if(res.data.state==200){
                    this.cityText = res.data.records[0].content.replaceAll("/n","\n")
                }else{
                    
                }                
            })
        },
        save() {
            let roleId = JSON.parse(localStorage.getItem("lcqxfzjz")).roleInfo.id;
            let regionId = JSON.parse(localStorage.getItem("lcqxfzjz")).userRegion.id;
            //获取当期时间yyyy-mm-dd
            let now = new Date();
            let dateStr = `${now.getFullYear()}-${
                now.getMonth() + 1
            }-${now.getDate()}`;
            if (roleId == 1) {
                amendForecastCity({
                tiem: dateStr,
                // content: this.textData[0].content,
                // id: this.textData[1].id,
                id: 24,
                roleId: roleId,
                regionId: regionId,
                json: this.tableData,
                }).then((res) => {
                if (res.data.state == 200) {
                    this.$message({
                    message: "保存成功",
                    type: "success",
                    });
                }
                });
            }
        },
        preview() {//预览      
            this.txtTableData = [];
            this.tableData.forEach((item) => {
                let obj = {};
                obj.name = `${item.name}：`;
                if (item.phe24 == item.phe36) {
                obj.phe = `${this.weatherPheList[item.phe24].name}，`;
                } else {
                obj.phe = `${this.weatherPheList[item.phe24].name}，`;
                }
                obj.tem = `${item.min}-${item.max}℃，`;
                obj.disaster = `地质灾害气象风险等级${
                this.disasterList[item.disaster]["name"]
                }（${this.disasterList[item.disaster]["info"]}），`;
                obj.publish = `${item.unit}${item.date}发布。`;

                this.txtTableData.push(obj);
            })
        },
  },
};
</script>

<style lang="less" scoped>
.content { 
    height: 100%;
    padding: 16px;
    & .box_card {
        height: 100%;
        .header {
        margin: 20px 0;
        }
    }
    .numberInput {
      /deep/ .el-input__inner {
        padding-right: 0;
      }
    }
    /deep/ .disClass {
      position: relative;
    }
    /deep/ .el-icon-warning {
      position: absolute;
      right: 10px;
      top: 0;
      font-size: 18px;
      color: #e6a23c;
      cursor: pointer;
    }
    .middle {
        border: 1px solid #ebeef5;
        padding: 20px;
        font-size: 14px;
        table {
            tr td:nth-child(3) {
            padding-left: 20px;
            }
            tr td:nth-child(4) {
            padding: 0 40px;
            }
        }
    }
}
</style>