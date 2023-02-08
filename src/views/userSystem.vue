<template>
    <div class="menu_wxyt">
        <div class="left">
            <el-menu
                default-active="1-1"
                class="el-menu-vertical-demo"
            >
                <el-submenu index="1">
                    <template slot="title">
                        <img
                            style="width:18px;height:18px;margin-right:7px;margin-left:6px"
                            src="../assets/img/产品管理.png"
                        >
                        <span class="product">用户管理</span>
                    </template>
                    <el-menu-item
                        index="1-1"
                        @click="toshow3()"
                    >所有用户</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <!-- 用户 -->
        <div v-if="fenzu"  style="height:100%">
            <allUser />
        </div>
    </div>
</template>

<script>
import allUser from "../components/homeUser/allUser.vue";
export default {
    components: {
        allUser,
    },
    data() {
        return {
            fenzu: false,
        };
    },
    created() {
        // 初始化界面之前获取数据
        this.fenzu = true
    },
    mounted() {
        // 界面显示完成后调用方法
    },
    methods: {
        toshow3() {
            this.fenzu = true;
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