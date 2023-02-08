<template>
    <!-- 结果指标 -->
    <div class="content">
            <div class="content_one" style="overflow: auto; height: calc(100% - 80px)">

                <div class="content_top">
                    <el-button
                        type="success"
                        size="medium"
                        @click="fanhui()"
                        >返回指标</el-button
                    >
                </div>
                <!-- 表格 -->
                <div class="table">
                    <el-table :data="tableData" border stripe style="width: 100%" class="commonTable">
                        <el-table-column label="序号" width="80" align="center" type="index">
                        </el-table-column>
                        <el-table-column prop="title" label="等级" align="center">
                        </el-table-column>
                        <el-table-column prop="content" label="描述" align="center">
                        </el-table-column>
                        <el-table-column label="指标" align="center">
                            <template slot-scope="scope">
                                <span>{{ getSuitabilityString(scope.row) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="large" @click="editor(scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-dialog title="修改" :visible.sync="dialogVisible" width="30%">
                    <el-form  ref="form" :rules="rules" :model="form" label-width="80px">
                        <el-form-item label="等级" prop="name">
                            <el-input
                                v-model="form.title"
                                placeholder="请输入等级"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="描述" prop="definition">
                            <el-input
                                type="textarea"
                                :rows="3"
                                v-model="form.content"
                                placeholder="请输入描述"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="指标">
                            <div style="display: inline-block; width: 100%;">
                                <span v-for="(item, index) in updateInput" :key="index">
                                    <span v-if="item.type == 1">{{ item.str }}</span>
                                    <el-input v-else class="updateSuitabilityInput" v-model="item.val"
                                        placeholder="请输入"></el-input>
                                </span>
                            </div>
                        </el-form-item>
                    </el-form>
                    
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="userEditor()">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
    </div>
</template>
<script>
import request from '@/api/request'
import Pagination from "@/components/Pagination";
export default {
    components: { Pagination },
    props: {
        jieguozhibiao: {
            type: Object,
            default: null,
        },
    },
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
            updateInput: null,
            form: {
               id : null,
               title : null,
               content : null,
            },
            rules: {
                title: [
                    { required: true, message: "请输入等级", trigger: "blur" },
                ],
                content: [
                    { required: true, message: "请输入描述", trigger: "blur" },
                ],
            },
        };
    },
    created() {
        // 初始化界面之前获取数据
    },
    mounted() {
        // 界面显示完成后调用方法
        this.getPage();
    },
    methods: {
        fanhui(){
            this.$parent.jieguozhibiao = null;
        },
        // 获取列表
        getPage() {
            request({
                url: 'indexRange/list',
                methods: "get",
                params:{
                    indexId : this.jieguozhibiao.id
                }
            }).then((res) => {
                console.log(res)
                if (res.data.s == 1) {
                    this.tableData = res.data.d;
                    this.total = res.data.d.length;
                }
            });
        },
        // 时间范围文本化
        getTableDayString(val) {
            return val.substr(0, 2) + "月" + val.substr(2) + "日";
        },
        // 指标信息还原
        getSuitabilityString(row) {
            try {
                let str = row.rangeinfo;
                let titles = JSON.parse(row.explaininfo);
                let vals = JSON.parse(row.rangevalue);

                Object.keys(titles).forEach(t => {
                    while (str.indexOf(t) > -1) {
                        str = str.replace(t, titles[t]);
                    }
                })
                Object.keys(vals).forEach(t => {
                    while (str.indexOf(t) > -1) {
                        str = str.replace(t, vals[t]);
                    }
                })
                return str;
            } catch (error) {
                return '-'
            }
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        // 修改
        editor(row) {
            if (this.getSuitabilityString(row) == '-') {
                this.$message.error('指标异常！');
                return;
            }

            this.form = JSON.parse(JSON.stringify(row));
            let str = row.rangeinfo;
            let titles = JSON.parse(row.explaininfo);
            let vals = JSON.parse(row.rangevalue);

            Object.keys(titles).forEach(t => {
                while (str.indexOf(t) > -1) {
                    str = str.replace(t, titles[t]);
                }
            })
            let inputs = [];
            this.updateInput = [];
            Object.keys(vals).forEach(t => {
                while (str.indexOf(t) > -1) {
                    inputs.push({
                        type: 2,
                        name: t,
                        val: vals[t]
                    })
                    str = str.replace(t, '-input-');
                }
            })
            str.split("-input-").forEach((item, index) => {
                this.updateInput.push({
                    type: 1,
                    str: item
                })
                if (inputs[index]) {
                    this.updateInput.push(inputs[index]);
                }
            })
            this.dialogVisible = true;
        },
        // 修改确定按钮
        userEditor() {
            if(this.form.name == '' || this.form.definition == ''){
                return;
            }
            let haveError = false;
            let formulaValue = {};
            this.updateInput.forEach(item=>{
                if(item.type == 2){
                    formulaValue[item.name] = item.val;
                    if(item.val == ''){
                        haveError = true;
                    }
                }
            })
            if(haveError){
                this.$message.error('指标异常！');
                return;
            }

            request.post('indexRange/update', {
                id : this.form.id,
                title : this.form.title,
                content : this.form.content,
                rangevalue : JSON.stringify(formulaValue)
            }).then((res) => {
                if (res.data.s == 1) {
                    this.$message({
                        message: "修改成功",
                        type: "success",
                    });
                    this.dialogVisible = false;
                    this.getPage();
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
                            this.getPage();
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
    height: 100%;
    position: relative;

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
        border: 1px solid #EBEEF5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);  

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
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 10px;
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


.updateSuitabilityInput {
    width: 80px;

    input {
        text-align: center;
    }
}
</style>