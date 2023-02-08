<template>
  <div class="content">
    <el-card class="box_card">
      <div class="header">
        <el-row>
          <el-col :span="12">
            <el-upload
              action="/"
              accept=".txt"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :file-list="fileList"
            >
              <el-button type="primary" size="medium">上传TXT文件</el-button>
            </el-upload>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <el-button type="warning" size="medium" @click="downloadTxt"
              >下载</el-button
            >
            <el-button type="success" size="medium" @click="save"
              >保存</el-button
            >
          </el-col>
        </el-row>
        <!-- <el-table
            :data="textData"
            stripe
            border
            :header-cell-style="{ fontSize: '14px' }"
            :cell-style="{ fontSize: '14px' }"
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="content" label="内容"> </el-table-column>
            <el-table-column prop="addr" label="站点地址" width="180">
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  class="warning"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  class="red"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table> -->
      </div>
      <el-input
        class="textareaClass"
        type="textarea"
        v-model="value"
        :autosize="{ minRows: 20 }"
        placeholder="请输入内容"
      ></el-input>
    </el-card>
  </div>
</template>
<script>
import { hebdomadEditor, saveEditor, uploadingTxt } from "@/api/make.js";
import { saveAs } from "file-saver";
import { txtFileSetting } from "../../minx";
export default {
  name: "TxtEditor",
  props: {
    name: {
      type: String,
      default: "下载",
    },
  },
  data() {
    return {
      value: "",
      fileList: [],
      textData: [],
    };
  },
  mixins: [txtFileSetting],
  mounted() {
    this.getTxtFile();
  },
  methods: {
    getTxtFile() {
      //获取txt文件
      hebdomadEditor({
        type: "shikuang",
      }).then((res) => {
        if (res.data.state == 200) {
          this.textData = res.data.records;
        }
        console.log(res);
      });
    },
    save() {
      //保存
      if (!this.value) {
        this.$message.error("内容不能为空");
        return;
      }
      saveEditor({
        type: "shikuang",
        content: this.value,
      }).then((res) => {
        if (res.data.state == 200) {
          this.$message.success("保存成功");
        }
        this.getTxtFile();
      });
    },
    downloadTxt() {
      //下载txt文件
      let str = this.value;
      let strData = new Blob([str], { type: "text/plain;charset=utf-8" });
      saveAs(strData, `${this.name}.txt`);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  font-size: 14px;
  padding: 16px;
  & .box_card {
    height: 100%;
  }
  .header {
    padding-bottom: 20px;
  }
  .textareaClass {
    /deep/ textarea {
      resize: none;
      font-size: 18px;
    }
  }
}
</style>
