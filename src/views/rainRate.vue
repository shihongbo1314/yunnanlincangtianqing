<template>
  <div class="main">
    <el-card class="box_card">
      <div class="top">
        <el-row>
          <el-col :span="24">
            <span class="top_title">降雨概率查询结果展示</span>
            <div class="top_time">
              <span class="top_timeSpan">数据时间</span>
              <el-date-picker
                style="margin-left: 20px"
                v-model="dateRange"
                type="monthrange"
                value-format="yyyyMMddHHmmss"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
              <el-select
                v-model="postList.siteGroup"
                style="width: 130px; margin-left: 20px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button
                class="btn"
                type="primary"
                @click="getMonData()"
                style="
                  background: #3168ec;
                  font-size: 14px;
                  width: 80px;
                  height: 32px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-left: 20px;
                "
                >查询</el-button
              >
              <el-button
                class="btn"
                @click="importClick()"
                style="
                  background: #21a97a;
                  font-size: 14px;
                  width: 80px;
                  height: 32px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-left: 40px;
                "
                type="success"
              >
                <img
                  src="../assets/img/download.png"
                  style="width: 16px; height: 16px; vertical-align: middle"
                />
                下载</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bottom">
        <el-table
          v-loading="loading"
          :data="tableData"
          id="daochu"
          stripe
          style="width: 100%"
          class="commonTable"
        >
          <el-table-column prop="sid" label="站点编号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="站点名称" align="center">
          </el-table-column>
          <el-table-column prop="DayCount" label="天数总数" align="center">
          </el-table-column>
          <el-table-column prop="rain1" sortable align="center">
            <template slot="header">
              <div>小雨</div>
              <div>次数/概率</div>
            </template>
            <template slot-scope="scope"> {{ scope.row.rain1 }}% </template>
          </el-table-column>
          <el-table-column prop="rain2" sortable align="center">
            <template slot="header">
              <div>中雨</div>
              <div>次数/概率</div>
            </template>
            <template slot-scope="scope"> {{ scope.row.rain2 }}% </template>
          </el-table-column>
          <el-table-column prop="rain3" sortable align="center">
            <template slot="header">
              <div>大雨</div>
              <div>次数/概率</div>
            </template>
            <template slot-scope="scope"> {{ scope.row.rain3 }}% </template>
          </el-table-column>
          <el-table-column prop="rain4" sortable align="center">
            <template slot="header">
              <div>暴雨</div>
              <div>次数/概率</div>
            </template>
            <template slot-scope="scope"> {{ scope.row.rain4 }}% </template>
          </el-table-column>
          <el-table-column prop="rain5" sortable align="center">
            <template slot="header">
              <div>大暴雨</div>
              <div>次数/概率</div>
            </template>
            <template slot-scope="scope"> {{ scope.row.rain5 }}% </template>
          </el-table-column>
          <el-table-column prop="rain6" sortable align="center">
            <template slot="header">
              <div>特大暴雨</div>
              <div>次数/概率</div>
            </template>
            <template slot-scope="scope"> {{ scope.row.rain6 }}% </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { rainfallDay, rainfallMon } from "@/api/make.js";
import XlSX from "xlsx";
import FileSaver from "file-saver";
import rainfallDayData from "../assets/api/rainfallDay.json";
import MonData from "../assets/api/rainfallMon.json";
export default {
  data() {
    return {
      dateRange: ["20220129000000", "20220829000000"],
      tableData: [],
      postList: {
        startTime: "20120129000000",
        endTime: "20220829000000",
        siteGroup: "1",
      },
      options: [
        {
          value: "1",
          label: "大监测站",
        },
        {
          value: "2",
          label: "区域站",
        },
        {
          value: "3",
          label: "全部区域站",
        },
      ],
      pickerOptions: {
        // 限制不能选择今天之后的日期
        disabledDate: (time) => {
          return time.getTime() > Date.now();
        },
      },
      dayStatisticsData: null,
      loading: true,
    };
  },
  created() {},
  mounted() {
    this.getMonData();
  },
  methods: {
    //获取月数据
    getMonData() {
      rainfallMon({
        startTime: this.dateRange[0],
        endTime: this.dateRange[1],
        siteGroup: this.postList.siteGroup,
      })
        .then((res) => {
          if (res.data.s == 1) {
            this.dayStatisticsData = null;
            this.tableData = [];
            this.dayStatisticsData = res.data.d;
            let arr = Object.keys(this.dayStatisticsData);
            //   // 遍历this.dayStatisticsData中的所有对象
            for (let i = 0; i < arr.length; i++) {
              var obj = {};
              obj.sid = arr[i];
              obj.name = this.dayStatisticsData[arr[i]].name;
              obj.DayCount = this.dayStatisticsData[arr[i]].DayCount;
              obj.rain1 =
                this.dayStatisticsData[arr[i]][1] +
                "/" +
                (
                  (this.dayStatisticsData[arr[i]][1] /
                    this.dayStatisticsData[arr[i]].DayCount) *
                  100
                ).toFixed(1);
              obj.rain2 =
                this.dayStatisticsData[arr[i]][2] +
                "/" +
                (
                  (this.dayStatisticsData[arr[i]][2] /
                    this.dayStatisticsData[arr[i]].DayCount) *
                  100
                ).toFixed(1);
              obj.rain3 =
                this.dayStatisticsData[arr[i]][3] +
                "/" +
                (
                  (this.dayStatisticsData[arr[i]][3] /
                    this.dayStatisticsData[arr[i]].DayCount) *
                  100
                ).toFixed(1);
              obj.rain4 =
                this.dayStatisticsData[arr[i]][4] +
                "/" +
                (
                  (this.dayStatisticsData[arr[i]][4] /
                    this.dayStatisticsData[arr[i]].DayCount) *
                  100
                ).toFixed(1);
              obj.rain5 =
                this.dayStatisticsData[arr[i]][5] +
                "/" +
                (
                  (this.dayStatisticsData[arr[i]][5] /
                    this.dayStatisticsData[arr[i]].DayCount) *
                  100
                ).toFixed(1);
              obj.rain6 =
                this.dayStatisticsData[arr[i]][6] +
                "/" +
                (
                  (this.dayStatisticsData[arr[i]][6] /
                    this.dayStatisticsData[arr[i]].DayCount) *
                  100
                ).toFixed(1);
              this.tableData.push(obj);
            }
          }
          this.loading = false;
        })
        .catch((err) => {
          this.dayStatisticsData = null;
          this.tableData = [];
          this.dayStatisticsData = MonData.d;
          let arr = Object.keys(this.dayStatisticsData);
          //   // 遍历this.dayStatisticsData中的所有对象
          for (let i = 0; i < arr.length; i++) {
            var obj = {};
            obj.sid = arr[i];
            obj.name = this.dayStatisticsData[arr[i]].name;
            obj.DayCount = this.dayStatisticsData[arr[i]].DayCount;
            obj.rain1 =
              this.dayStatisticsData[arr[i]][1] +
              "/" +
              (
                (this.dayStatisticsData[arr[i]][1] /
                  this.dayStatisticsData[arr[i]].DayCount) *
                100
              ).toFixed(1);
            obj.rain2 =
              this.dayStatisticsData[arr[i]][2] +
              "/" +
              (
                (this.dayStatisticsData[arr[i]][2] /
                  this.dayStatisticsData[arr[i]].DayCount) *
                100
              ).toFixed(1);
            obj.rain3 =
              this.dayStatisticsData[arr[i]][3] +
              "/" +
              (
                (this.dayStatisticsData[arr[i]][3] /
                  this.dayStatisticsData[arr[i]].DayCount) *
                100
              ).toFixed(1);
            obj.rain4 =
              this.dayStatisticsData[arr[i]][4] +
              "/" +
              (
                (this.dayStatisticsData[arr[i]][4] /
                  this.dayStatisticsData[arr[i]].DayCount) *
                100
              ).toFixed(1);
            obj.rain5 =
              this.dayStatisticsData[arr[i]][5] +
              "/" +
              (
                (this.dayStatisticsData[arr[i]][5] /
                  this.dayStatisticsData[arr[i]].DayCount) *
                100
              ).toFixed(1);
            obj.rain6 =
              this.dayStatisticsData[arr[i]][6] +
              "/" +
              (
                (this.dayStatisticsData[arr[i]][6] /
                  this.dayStatisticsData[arr[i]].DayCount) *
                100
              ).toFixed(1);
            this.tableData.push(obj);
          }
          this.loading = false;
        });
    },
    // 导出表格
    importClick() {
      let vv = XlSX.utils.table_to_book(document.getElementById("daochu"));
      let vbouts = XlSX.write(vv, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([vbouts], { type: "application/octet-stream" }),
          "降雨概率.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, vbouts);
      }
      return vbouts;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  font-size: 14px;
  height: 100%;
  padding: 16px;
  background: #f5f6f7;
  & .box_card {
    height: 100%;
  }
  .top {
    padding-bottom: 20px;
    .btn {
      margin-left: 10px;
    }
    .top_title {
      display: inline-block;
      width: 180px;
      height: 16px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #000458;
      line-height: 16px;
      border-left: 2px #025df4 solid;
    }
    .top_time {
      display: flex;
      height: 32px;
      align-items: center;
      font-size: 14px;
      .top_timeSpan {
        display: inline-block;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #333333;
        margin-right: -10px;
      }
      /deep/ .el-icon-date:before {
        content: "\e78e";
        font-size: 20px;
        margin-right: 11px;
        display: flex;
      }
    }
    .el-col-24 {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-date-editor.el-input {
        width: 136px;
      }
      /deep/ .el-input--small .el-input__inner {
        width: 136px;
      }
      .el-select > .el-input {
        display: block;
        margin-left: -8px;
      }
    }
  }
  /deep/ .el-card__body {
    padding: 22px 16px 22px 16px !important;
  }
}
</style>