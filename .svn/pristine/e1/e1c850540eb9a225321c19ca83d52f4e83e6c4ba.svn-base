<template>
    <div class="menu_wxyt">
        <div class="left">
            <el-menu
                default-active="1-1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >
                <el-submenu index="1">
                    <template slot="title">
                        <img
                            style="width:18px;height:18px;margin-right:7px;margin-left:6px"
                            src="../assets/img/产品管理.png"
                        >
                        <span class="product">产品管理</span>
                    </template>
                    <el-menu-item
                        index="1-1"
                        @click="toshow()"
                    >书签管理</el-menu-item>
                    <el-menu-item
                        index="1-2"
                        @click="toshow2()"
                    >模板管理</el-menu-item>
                    <el-menu-item
                        index="1-3"
                        @click="toshow3()"
                    >分组管理</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <!-- 书签管理 -->
        <div v-if="shuqian" style="height:100%">
            <zBookmarks />
        </div>
        <!-- 模板管理 -->
        <div v-if="muban"  style="height:100%">
            <zTemplate />
        </div>
        <!-- 分组管理 -->
        <div v-if="fenzu"  style="height:100%">
            <zGrouping />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import zBookmarks from "../components/homework/bookmarks.vue";
import zTemplate from "../components/homework/template.vue";
import zGrouping from "../components/homework/grouping.vue";
export default {
    components: {
        zBookmarks,
        zTemplate,
        zGrouping,
    },
    data() {
        return {
            shuqian: false,
            muban: false,
            fenzu: false,
            checkboxGroup1: [],
            checkboxGroup2: [],
            checkboxGroup3: [],
            checkboxGroup4: [],
            input: "",
            region: "",
            textarea2: "",
            radio: 8,
            radio1: "",
            options: [
                {
                    value: "选项1",
                    label: "类型1",
                },
                {
                    value: "选项2",
                    label: "类型2",
                },
                {
                    value: "选项3",
                    label: "类型3",
                },
                {
                    value: "选项4",
                    label: "类型4",
                },
            ],
            value: "",
            tableData: [
                {
                    date: "1",
                    name: "书签名称2",
                    address: "SJ123456789",
                    lx: "数据类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "2",
                    name: "书签名称书签名称3",
                    address: "GM56455554",
                    lx: "图片类",
                    cjr: "李四",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "3",
                    name: "书签名称书签名称书签名称1",
                    address: "BG955599955",
                    lx: "表格类",
                    cjr: "王五",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "4",
                    name: "书签名称4",
                    address: "FP456454566",
                    lx: "GIF图类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "5",
                    name: "书签名称2",
                    address: "SJ123456789",
                    lx: "数据类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "6",
                    name: "书签名称书签名称3",
                    address: "GM56455554",
                    lx: "图片类",
                    cjr: "李四",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "7",
                    name: "书签名称书签名称书签名称1",
                    address: "BG955599955",
                    lx: "表格类",
                    cjr: "王五",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "8",
                    name: "书签名称4",
                    address: "FP456454566",
                    lx: "GIF图类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "9",
                    name: "书签名称2",
                    address: "SJ123456789",
                    lx: "数据类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "10",
                    name: "书签名称书签名称3",
                    address: "GM56455554",
                    lx: "图片类",
                    cjr: "李四",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "11",
                    name: "书签名称书签名称书签名称1",
                    address: "BG955599955",
                    lx: "表格类",
                    cjr: "王五",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "12",
                    name: "书签名称4",
                    address: "FP456454566",
                    lx: "GIF图类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "13",
                    name: "书签名称2",
                    address: "SJ123456789",
                    lx: "数据类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "14",
                    name: "书签名称书签名称3",
                    address: "GM56455554",
                    lx: "图片类",
                    cjr: "李四",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "15",
                    name: "书签名称书签名称书签名称1",
                    address: "BG955599955",
                    lx: "表格类",
                    cjr: "王五",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "16",
                    name: "书签名称4",
                    address: "FP456454566",
                    lx: "GIF图类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
            ],
            dialogVisible: false,
            newTemplate: false,
            activeName: "first",
        };
    },
    created() {
        // 初始化界面之前获取数据
        this.shuqian = true
    },
    mounted() {
        // 界面显示完成后调用方法
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        toshow() {
            this.shuqian = true;
            this.muban = false;
            this.fenzu = false;
        },
        toshow2() {
            this.shuqian = false;
            this.muban = true;
            this.fenzu = false;
        },
        toshow3() {
            this.shuqian = false;
            this.muban = false;
            this.fenzu = true;
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
};
</script>
<style lang="less" scoped>
.menu_wxyt {
    width: 100%;
    height: 100%;
    background-color: #f5f6f7;
}
.left {
    width: 280px;
    height: 100%;
    float: left;
    position: absolute;
    left: 0;
    .el-menu {
        width: 282px;
        height: 100%;
        border: #adb3bb 1px solid;
        /deep/ .el-submenu__title {
            height: 48px;
            line-height: 48px;
            background-color: #dcecff;
            padding-left: 9px !important;
            .product {
                width: 72px;
                height: 24px;
                font-family: PingFangSC-Semibold;
                font-size: 18px;
                color: #2d5a9d;
                letter-spacing: 0;
                text-align: justify;
                line-height: 24px;
                font-weight: 600;
            }
            .el-submenu__icon-arrow {
                font-size: 24px;
                margin-top: -12px;
            }
        }
        .el-submenu .el-menu-item {
            height: 48px;
            line-height: 48px;
            font-size: 16px;
            font-weight: 400;
            padding: 0 44px;
        }
        .el-menu-item.is-active {
            background-color: #3e87f4;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #ffffff;
            letter-spacing: 0;
            text-align: justify;
            font-weight: 400;
        }
    }
}

body .el-table th.gutter {
    display: table-cell !important;
}
</style>