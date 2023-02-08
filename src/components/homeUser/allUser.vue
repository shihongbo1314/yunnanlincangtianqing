<template>
  <!-- 分组管理 -->
  <div class="right">
    <div class="content">
      <div
        class="content_one"
        style="overflow: auto; height: calc(100% - 80px)"
      >
        <div class="content_top">
          <el-button
            type="success"
            size="medium"
            style="margin-right: 16px"
            @click="add()"
            >添加</el-button
          >
        </div>
        <!-- 表格 -->
        <div class="table">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
              prop="date"
              label="序号"
              width="150"
              align="center"
            >
              <template v-slot="scope"
                ><span
                  >{{
                    scope.$index + (listQuery.current - 1) * listQuery.size + 1
                  }}
                </span></template
              >
            </el-table-column>
            <el-table-column prop="userName" label="用户名" align="center">
            </el-table-column>
            <el-table-column prop="roleInfo.name" label="角色" align="center">
            </el-table-column>
            <el-table-column prop="userRegion.name" label="区划" align="center">
            </el-table-column>
            <el-table-column prop="nikeName" label="昵称" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="电话" align="center">
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="editor(scope.$index, scope.row)"
                  >修改</el-button
                >
                <span class="gun">丨</span>
                <el-button
                  @click="deleteUser(scope.$index, scope.row)"
                  type="text"
                  size="small"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="bottom">
            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="listQuery.current"
              :limit.sync="listQuery.size"
              @pagination="getUserPage"
            />
          </div>
        </div>
        <el-dialog
          :title="dialogStatus"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <el-form :inline="true" ref="form" :rules="rules" :model="form">
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="form.userName"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="tel"
                v-model="form.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="form.roleId" placeholder="请选择角色">
                <el-option
                  v-for="item in roleList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="昵称" prop="nikeName">
              <el-input
                type="mail"
                v-model="form.nikeName"
                placeholder="请输入昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone" style="position: relative">
              <el-input
                type="mail"
                v-model="form.phone"
                οninput="value=value.replace(/[^\d]/g,'');if(value.length > 11)value = value.slice(0, 11)"
                placeholder="请输入电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-input
                type="mail"
                v-model="form.sex"
                placeholder="请输入性别"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="区划"
              prop="regionId"
              style="position: absolute; left: 38px; bottom: 50px"
              ><el-select v-model="form.regionId" placeholder="请选择区划">
                <el-option
                  v-for="item in quhuaList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              v-if="dialogStatus == '添加'"
              @click="addUserMessage()"
              >确 定</el-button
            >
            <el-button
              type="primary"
              v-if="dialogStatus == '修改'"
              @click="userEditor()"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import {
  userPage,
  addUser,
  getRole,
  editorUser,
  deleteUserData,
  getQuhua,
} from "@/api/make.js";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      listQuery: {
        current: 1,
        size: 10,
      },
      total: 0,
      tableData: [],
      roleList: [],
      dialogVisible: false,
      dialogStatus: "添加",
      form: {
        userName: "",
        password: "",
        roleId: null,
        nikeName: null,
        phone: null,
        sex: null,
        id: null,
        regionId: null,
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
        nikeName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          { min: 11, message: "电话格式不正确", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        regionId: [{ required: true, message: "请选择区划", trigger: "blur" }],
      },
      quhuaList: [],
    };
  },
  created() {
    // 初始化界面之前获取数据
  },
  mounted() {
    // 界面显示完成后调用方法
    this.getUserPage();
    this.getQuhuaData();
  },
  methods: {
    // 获取区划列表
    getQuhuaData() {
      getQuhua().then((res) => {
        if (res.data.state == 200) {
          // 循环判断res.data.records的parentId是否为null
          for (let i = 0; i < res.data.records.length; i++) {
            if (res.data.records[i].parentId == null || res.data.records[i].parentId == 1) {
              this.quhuaList.push(res.data.records[i]);
            }
          }
        }
      });
    },
    // 获取用户列表
    getUserPage() {
      userPage({
        params: this.listQuery,
      }).then((res) => {
        if (res.data.state == 200) {
          this.tableData = res.data.records;
          this.total = res.data.total;
          this.getRoleList();
        }
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    getRoleList() {
      getRole().then((res) => {
        if (res.data.state == 200) {
          this.roleList = res.data.records;
        }
      });
    },
    // 添加用户事件
    add() {
      this.dialogVisible = true;
      this.dialogStatus = "添加";
      this.form = {
        userName: "",
        password: "",
        roleId: null,
        nikeName: null,
        phone: null,
        sex: null,
        regionId: null,
      };
    },
    // 添加用户
    addUserMessage() {
      addUser({
        userName: this.form.userName,
        password: this.form.password,
        roleId: this.form.roleId,
        nikeName: this.form.nikeName,
        phone: this.form.phone,
        sex: this.form.sex,
        regionId: this.form.regionId,
      }).then((res) => {
        if (res.data.state == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.dialogVisible = false;
          this.getUserPage();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 修改用户
    editor(index, row) {
      this.dialogVisible = true;
      this.dialogStatus = "修改";
      this.form.userName = row.userName;
      this.form.password = row.password;
      this.form.roleId = row.roleInfo.id;
      this.form.nikeName = row.nikeName;
      this.form.phone = row.phone;
      this.form.sex = row.sex;
      this.form.id = row.id;
      this.form.regionId = row.userRegion.id
    },
    // 修改用户确定按钮
    userEditor() {
      editorUser({
        id: this.form.id,
        userName: this.form.userName,
        password: this.form.password,
        roleId: this.form.roleId,
        nikeName: this.form.nikeName,
        phone: this.form.phone,
        sex: this.form.sex,
        regionId : this.form.regionId
      }).then((res) => {
        if (res.data.state == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.dialogVisible = false;
          this.getUserPage();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 删除用户
    deleteUser(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUserData({
            id: row.id,
          }).then((res) => {
            if (res.data.state == 200) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.dialogVisible = false;
              this.getUserPage();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ body {
  padding: 0 !important;
}
.right {
  width: calc(100% - 280px);
  height: 100%;
  float: left;
  position: relative;
  top: 0;
  left: 282px;

  // 新增书签  标签页样式
  /deep/.el-tabs__nav-scroll {
    margin: 10px 0 0 24px;
    .el-tabs__item {
      width: 100px;
      font-size: 16px;
      color: #adb3bb;
      text-align: center;
      padding: 0;
    }
    .el-tabs__item.is-active {
      color: #409eff;
      font-weight: 600;
    }
  }
  /deep/.el-tabs__header {
    margin-bottom: 24px;
  }
  /deep/.el-tabs__nav-wrap::after {
    left: 24px;
  }
  /deep/.el-form-item__content {
    width: 200px;
  }
  .el-tab-pane {
    display: flex;
    .shuju {
      width: 960px;
      height: 860px;
      margin-left: 24px;
      margin-right: 24px;
      margin-bottom: 27px;
      background-color: #f5f6f7;
      overflow: auto;
      p {
        height: 24px;
        font-size: 16px;
        color: #3e87f4;
        font-weight: 600;
        margin-left: 20px;
        margin-top: 24px;
      }
      /deep/.el-form-item--small .el-form-item__label {
        font-size: 16px;
        margin-left: 24px;
        color: #333333;
        text-align: right;
      }
      /deep/.el-input--small .el-input__inner {
        height: 36px;
        font-size: 16px;
        padding-left: 10px;
      }
      /deep/.el-form-item--small .el-form-item__content {
        display: flex;
      }
      .el-button {
        width: 160px;
        height: 36px;
        background: #3e87f4;
        border-radius: 4px;
      }
      .el-radio-group {
        margin-top: 10px;
        font-size: 16px;
      }
      .table_type {
        width: 912px;
        height: 216px;
        background: #ffffff;
        border-radius: 4px;
        margin-left: 24px;
        .table_type_one {
          height: 216px;
          overflow-x: scroll;
        }
        /deep/ .el-radio--small.is-bordered {
          width: 320px;
          height: 200px;
          background: #d8dfe5;
          margin: 8px 0 8px 8px;
        }
      }
    }
  }

  .content {
    height: 100%;
    background-color: #ffffff;
    border-bottom: 1px #d6d9dd solid;
    margin-top: 16px;
    .Template {
      /deep/ .el-dialog {
        width: 272px;
        height: 416px;
      }
    }

    /deep/ .el-dialog__body {
      padding: 16px 18px 40px 18px;
      .el-form--inline {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .NewBookmarks {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        /deep/ .el-checkbox-button__inner:hover {
          color: none;
        }

        .el-checkbox-group {
          width: 128px;
          height: 80px;
          .el-checkbox-button:last-child .el-checkbox-button__inner {
            width: 128px;
            height: 80px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            color: #adb3bb;
            font-size: 14px;
            font-weight: 600;
            border-radius: 4px;
          }
          .el-checkbox-button.is-checked .el-checkbox-button__inner {
            background-color: #f0f6ff;
            span {
              color: #3e87f4;
            }
          }
        }
      }
    }

    .content_top {
      height: 56px;
      display: flex;
      align-items: center;
      background-color: #ffffff;
      border-bottom: 1px #d6d9dd solid;
      justify-content: flex-end;
      button {
        /deep/span {
          width: 32px;
          height: 24px;
          font-size: 16px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: justify;
          font-weight: 400;
        }
      }
    }
    .table {
      height: calc(100% - 100px);
      margin: 16px 16px 0 16px;
      /deep/th {
        width: 100%;
        height: 48px;
        background: #e8eff8;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #2d5a9d;
        letter-spacing: 0;
        font-weight: 600;
      }
      /deep/ tr {
        height: 48px;
        // ont-family: PingFangSC-Regular;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        text-align: justify;
        font-weight: 500;
      }
      .el-button--text {
        width: 65px;
        height: 24px;
        font-size: 16px;
        font-weight: 600;
        color: #2d5a9d;
      }
      .el-button--text:hover {
        color: #66b1ff;
      }
      .el-button + .el-button {
        margin-left: 0;
      }
      .gun {
        color: #d6d9dd;
      }
    }
    .bottom {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: center;
      /deep/.el-pagination {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #333333;
        font-weight: 600;
      }
    }
  }
}
</style>