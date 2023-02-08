<template>
  <div class="main">
    <el-card class="box_card">
      <div class="top">
        <el-row>
          <el-col :span="24">
            <span class="top_title">站点历史极值查询结果展示</span>
            <div class="top_time">
              <span class="top_timeSpan">数据时间</span>
              <el-date-picker
                v-model="postList.startTime"
                style="margin: 0 4px"
                type="year"
                value-format="yyyyMMddHHmmss"
                :picker-options="pickerOptions"
                placeholder="开始时间"
              >
              </el-date-picker>
              -
              <el-date-picker
                v-model="postList.endTime"
                type="year"
                style="margin-left: 4px"
                @change="changeDate()"
                value-format="yyyyMMddHHmmss"
                :picker-options="pickerOptions"
                placeholder="结束时间"
              >
              </el-date-picker>
              <el-select v-model="postList.siteGroup" placeholder="请选择">
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
                @click="getData()"
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
          <el-col :span="4" style="text-align: right">
            <!-- <el-button class="btn" type="success" size="medium">下载</el-button> -->
          </el-col>
        </el-row>
      </div>
      <div class="bottom">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          id="daochu"
          style="width: 100%"
          class="commonTable"
        >
          <el-table-column prop="site" label="站点编号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="站点名称" align="center">
          </el-table-column>
          <el-table-column
            prop="TemMax"
            sortable
            label="最高温度(℃)"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="TemMaxTime"
            label="最高温度出现时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="TemMin"
            sortable
            label="最低温度(℃)"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="TemMinTime"
            label="最低温度时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="RainMax"
            sortable
            label="降水最大值(mm)"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="RainMaxTime"
            label="最大降水出现时间"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getExtremum } from "@/api/make.js";
import XlSX from "xlsx";
import FileSaver from "file-saver";
import jsonData from "../assets/api/veryValue.json";
import { DateGrid } from "../api/date";
export default {
  data() {
    return {
      dateRange: [],
      pickerOptions: {
        // 十年内的日期可选
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 130 * 30 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
        },
      },
      tableData: [],
      pickerOptionsTwo: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //只能选择今天及今天之前的日期
        },
      },

      postList: {
        startTime: "20120101000000",
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
      loading: true,
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getExtremum({
        startTime: this.postList.startTime,
        endTime: this.postList.endTime,
        siteGroup: this.postList.siteGroup,
      })
        .then((res) => {
          if (res.data.s == 1) {
            this.tableData = res.data.d;
          }
          this.loading = false;
        })
        .catch((err) => {
          this.tableData = jsonData.d;
          this.loading = false;
        });
    },
    changeDate() {
      // 判断选中的this.postList.endTime是否为今年
      if (this.postList.endTime == null || this.postList.endTime == "") {
        return null;
      }
      // 获取当前日期并更改为当前时间
      let curDate = new Date().getFullYear();
      let endDate = this.postList.endTime.slice(0, 4);
      if (curDate == endDate) {
        this.postList.endTime = DateGrid(new Date(), "yyyyMMdd000000");
      } else {
        // 如果不是今年，就将时间改为当年的12月31日
        this.postList.endTime = endDate + "1231000000";
      }
    },
    probabilityCalculation(row, param) {
      let all =
        row.rain1 + row.rain2 + row.rain3 + row.rain4 + row.rain5 + row.rain6;
      return ((row[param] / all) * 100).toFixed(1);
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
          "站点历史极值.xlsx"
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
    ::v-deep .el-select {
      width: 130px;
      margin-left: 20px;
    }
    .btn {
      margin-left: 10px;
    }
    .top_title {
      display: inline-block;
      width: 210px;
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