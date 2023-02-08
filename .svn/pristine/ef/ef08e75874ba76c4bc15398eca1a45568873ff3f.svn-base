<template>
    <div style="height:100%">
        <!-- 分组管理 -->
        <div
            class="right"
        >
            <div class="top">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>产品制作</el-breadcrumb-item>
                    <el-breadcrumb-item>产品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>分组管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="content">
                <div
                    class="content_one"
                    style="overflow: auto;height:calc(100% - 80px)"
                >
                    <div class="content_top">
                        <span style="margin:0 8px 0 24px">分组名称</span>
                        <el-input
                            v-model="selectData.name"
                            placeholder="请输入"
                        ></el-input>
                        <span style="margin:0 8px 0 40px">创建人</span>
                        <el-input
                            v-model="selectData.creator"
                            placeholder="请输入"
                        ></el-input>

                        <el-button
                            type="primary"
                            @click="initBookMarkData(1)"
                            style="margin-right:80px;margin-left:40px"
                        >搜索</el-button>
                        <el-button
                            type="primary"
                            icon="el-icon-plus"
                            @click="NewBookmarks()"
                        >新增分组</el-button>
                    </div>

                    <!-- 表格 -->
                    <div class="table">
                        <el-table
                            :data="tablePage.showData"
                            stripe
                            style="width: 100%"
                        >
                            <el-table-column
                                label="序号"
                                width="150"
                                type="index"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="分组名称"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="templateCount"
                                label="模板数量"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="creator"
                                label="创建人"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="templateCount"
                                label="最后更新时间"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <span @click="editRow(scope.row)">编辑</span>
                                    <span class="gun">丨</span>
                                    <span @click="deleteRow(scope.row)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="bottom">
                            <el-pagination
                                layout="prev, pager, next"
                                :total="tablePage.total"
                                :page-size="tablePage.pageSize"
                                :current-page.sync="tablePage.currentPage"
                                @current-change="pageChange"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog
            :title="`${addBookData.type == 'add'?'新增' : '修改'}分组`"
            :visible.sync="dialogVisible"
            width="320px"
            style="padding-top:19vh;"
            close-on-click-modal
        >
            <div class="NewBookmarks">
                <el-form label-width="76px" >
                    <el-form-item label="分组名称">
                        <el-input v-model="addBookData.row.name" @input="imgTitleChange"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input v-model="addBookData.row.creator" @input="imgBottomChange"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="saveAddBookData"
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from "../../../src/api/requestProduct";
export default {
    data() {
        return {
            dialogVisible : false,
            selectData: {
                name: "",
                creator: "",
            },
            bookmarkType: [],
            tablePage: {
                allData: [],
                selectData: [],
                showData: [],
                total: 0,
                pageSize: 10,
                currentPage: 1, // 当前页
            },
            addBookData : {
                type : 'add',
                row : {
                    id : null,
                    name : '',
                    creator : '',
                }
            }
        };
    },
    created() {
        // 初始化界面之前获取数据
        this.initBookMarkType();
    },
    mounted() {
        // 界面显示完成后调用方法
    },
    methods: {
        initBookMarkType() {
            let url = this.$store.state.productBookURL + "/lc-product/prod/bookmark/type/list";
            axios.get(url).then((res) => {
                if (res.status == 200 && res.data.state == 200) {
                    this.bookmarkType = res.data.records;
                    this.initBookMarkData(1);
                }
            });
        },
        pageChange(page){
            console.log(page)
            this.initBookMarkData(page)
        },
        initBookMarkData(page) {
            if(page){
                this.tablePage.currentPage = page;
            }
            let url = this.$store.state.productBookURL + "/lc-product/prod/template/group/page";
            axios.get(url, {
                params : { 
                    regionCode : '530900',
                    current : this.tablePage.currentPage,
                    size : this.tablePage.pageSize,
                    name : this.selectData.name,
                    creator : this.selectData.creator
                }
            }).then((res) => {
                if (res.status == 200) {
                    this.tablePage.showData = res.data.records;
                    this.tablePage.total = res.data.total;
                }
            });
        },
        deleteRow(row) {
            // 删除书签
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteRowNext(row);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        deleteRowNext(row){
            console.log(row)
            let url = this.$store.state.productBookURL + "//lc-product/prod/template/group/remove";
            axios.get(url, {
                params : {
                    id : row.id
                }
            }).then((res) => {
                if (res.status == 200 && res.data.state == 200) {
                    this.initBookMarkData();
                }
            });
        },
        editRow(row){
            this.NewBookmarks('edit', row);
        },
        NewBookmarks(type, row) {
            this.addBookData.type = type || 'add';
            if(row){
                this.addBookData.row = JSON.parse(JSON.stringify(row));
            }else{
                this.addBookData.row = {
                    id : null,
                    name : '',
                    creator : '',
                };
            }
            
            this.dialogVisible = true;
        },
        saveAddBookData(){
            let url, params;
            params = {
                name : this.addBookData.row.name,
                creator : this.addBookData.row.creator
            }
            if(this.addBookData.type == 'add'){
                url = this.$store.state.productBookURL + "/lc-product/prod/template/group/save";
            }else{
                params.id = this.addBookData.row.id;
                url = this.$store.state.productBookURL + "/lc-product/prod/template/group/update";
            }
            axios.post(url, params).then((res) => {
                if (res.status == 200 && res.data.state == 200) {
                    this.dialogVisible = false;
                    this.initBookMarkData();
                }
            });
        }
    },
};
</script>

<style lang="less" scoped>
.right {
    width: calc(100% - 280px);
    height: 100%;
    float: left;
    position: relative;
    top: 0;
    left: 282px;
    .top {
        height: 48px;
        background-color: #ffffff;
        .el-breadcrumb {
            width: 240px;
            height: 48px;
            font-size: 16px;
            letter-spacing: 0;
            text-align: justify;
            line-height: 48px;
            font-weight: 400;
            margin: 0 0 12px 16px;
            /deep/.el-breadcrumb__inner {
                color: #2d5a9d;
            }
            /deep/.el-breadcrumb__separator[class*="icon"] {
                margin: 0 3px;
                font-weight: 400;
                color: #2d5a9d;
            }
        }
    }
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
            .xuanze {
                width: 48px;
                height: 24px;
                background-color: #ffffff00;
                text-align: center;
                border: none;
                font-size: 16px;
                color: #333333;
                margin-right: 24px;
            }
            /deep/ .el-radio {
                margin: 0 15px;
                .el-radio__inner {
                    width: 16px;
                    height: 16px;
                }
                .el-radio__label,
                .el-checkbox__label {
                    font-size: 16px;
                }
            }

            .quyu {
                height: 72px;
                border: 1px solid rgba(214, 217, 221, 1);
                border-radius: 4px;
                background-color: #ffffff;
                margin-top: 8px;
                .sanjiao {
                    width: 0;
                    height: 0;
                    border-left: 4px solid transparent;
                    border-right: 4px solid transparent;
                    border-bottom: 4px solid #d6d9dd;
                    position: relative;
                    top: -4px;
                    left: 106px;
                }
                /deep/.el-checkbox-group {
                    .el-checkbox-button__inner {
                        border: none;
                        width: 48px;
                        height: 24px;
                        font-size: 16px;
                        color: #333333;
                        border: none;
                        background-color: #ffffff;
                        margin: 4px 27px 0 0;
                    }
                    .el-checkbox-button.is-checked .el-checkbox-button__inner {
                        color: #2672fd;
                        font-size: 16px;
                        font-weight: 600;
                        background: none;
                        box-shadow: none;
                    }
                }
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
        .yulan {
            width: 608px;
            height: 860px;
            margin-right: 24px;
            background: #ffffff;
            border: 1px solid rgba(214, 217, 221, 1);
            .yulan_top {
                width: 560px;
                height: 48px;
                background: #ff8a47;
                text-align: center;
                line-height: 48px;
                font-size: 16px;
                color: #ffffff;
                font-weight: 500;
                margin: 24px 24px 16px 24px;
            }
            span {
                font-size: 18px;
                color: #ff8a47;
                letter-spacing: 0;
                font-weight: 600;
                margin-left: 24px;
            }
            .yulan_one {
                margin: 24px 24px 0 24px;
                border-top: 1px #d6d9dd solid;
                /deep/ .el-form-item--small .el-form-item__label {
                    font-size: 16px;
                }
                .yulan_p {
                    height: 24px;
                    font-size: 16px;
                    color: #3e87f4;
                    font-weight: 600;
                    margin-left: -7px;
                    margin-top: 24px;
                }
                .yulan_content {
                    width: 100%;
                    height: 480px;
                    .el-table {
                        border: 1px solid rgba(198, 219, 244, 1);
                    }
                    /deep/th {
                        font-size: 16px;
                        color: #333333;
                        font-weight: 400;
                        text-align: center;
                        background: #dcecff;
                        border: 1px solid rgba(214, 217, 221, 1);
                    }
                }
                .el-button {
                    width: 160px;
                    height: 36px;
                    background: #3e87f4;
                    border-radius: 4px;
                    font-weight: 500;
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
        /deep/ .el-dialog {
            height: 320px;
            .el-dialog__header {
                background: #3e87f4;
                height: 32px;
                .el-dialog__title {
                    font-size: 16px;
                    color: #ffffff;
                    position: absolute;
                    top: 4px;
                    left: 24px;
                    font-weight: 500;
                }
                .el-dialog__headerbtn {
                    top: 6px;
                    right: 22px;
                    font-size: 20px;
                }
            }
            .el-dialog__footer {
                padding: 0 24px;
                .el-button--small {
                    width: 120px;
                    height: 32px;
                }
                .el-button--small {
                    font-size: 14px;
                }
                .el-button + .el-button {
                    margin-left: 32px;
                    font-size: 16px;
                }
            }
            .el-dialog__headerbtn .el-dialog__close {
                color: #ffffff;
            }
        }
        /deep/ .el-dialog__body {
            width: 320px;
            padding: 16px 18px 40px 18px;
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
            span {
                font-size: 16px;
                color: #333333;
                letter-spacing: 0;
                text-align: justify;
                font-weight: 400;
            }
            .el-button + .el-button {
                margin-left: 0;
                /deep/.el-icon-plus {
                    width: 16px;
                    height: 16px;
                    font-size: 16px;
                }
            }
            button {
                width: 120px;
                height: 36px;
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
            .el-input--small {
                width: 200px;
                height: 36px;
                font-size: 16px;
                color: #adb3bb;
                letter-spacing: 0;
                text-align: justify;
                line-height: 36px;
                font-weight: 400;
            }
            /deep/.el-input .el-input__inner {
                width: 200px;
                height: 36px;
                padding-left: 10px;
                font-size: 16px;
                line-height: 36px;
            }
        }
        .table {
            height: calc(100% - 76px);
            margin: 16px 16px 0 16px;
            position: relative;
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
                ont-family: PingFangSC-Regular;
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
            position:absolute;
            bottom: 0px;
            width: 100%;
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