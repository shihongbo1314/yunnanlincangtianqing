<template>
    <div class="header">
        <div class="logo">
            <img src="../assets/img/logo.png" />
            <span>临沧气象业务服务天擎应用平台</span>
        </div>
        <div class="menus">
            <ul class="menusUL">
                <li
                    v-for="(item, index) in menuArray"
                    :key="index"
                    :class="menuIndex == index ? 'active' : ''"
                >
                    <template v-if="item.children">
                        <el-dropdown
                            class="secondDropdown"
                            @command="handleCommand"
                        >
                            <span class="el-dropdown-link">
                                {{ item.name }}
                            </span>
                            <el-dropdown-menu
                                slot="dropdown"
                                class="secondMenu"
                            >
                                <el-dropdown-item
                                    v-for="(child, childIndex) in item.children"
                                    :key="childIndex"
                                    :command="{ pId: index, cId: childIndex }"
                                >{{ child.name }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                    <template v-else>
                        <span @click="handleMenu(index)">{{ item.name }}</span>
                    </template>
                </li>
            </ul>
        </div>
        <div class="userConfig">
            <!-- <div class="userBox">
                <span class="userIcon">
                    <svg t="1643251628712" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34904" width="200" height="200"><path d="M503.466667 128a198.4 198.4 0 0 1 200.106666 196.693333 200.106667 200.106667 0 0 1-399.786666 0A198.4 198.4 0 0 1 503.466667 128z m0 0a198.4 198.4 0 0 1 200.106666 196.693333 200.106667 200.106667 0 0 1-399.786666 0A198.4 198.4 0 0 1 503.466667 128z m-74.666667 458.666667H597.333333a256 256 0 0 1 256 253.866666v16.213334c0 55.466667-115.626667 57.173333-258.133333 57.173333h-166.4c-142.506667 0-258.133333 0-258.133333-57.173333v-16.213334a256 256 0 0 1 258.133333-253.866666z" fill="#FFFFFF" p-id="34905"></path></svg>
                </span>
                <span class="userName">{{user.name}}</span>
            </div> -->
            <el-button
                type="text"
                icon="el-icon-user-solid"
            >
                {{ user.name }}</el-button>
          <!--   <el-button
                type="primary"
                icon="el-icon-s-tools"
            >设置</el-button> -->
            <el-button
                type="primary"
                icon="el-icon-switch-button"
                @click="loginOut"
            >退出</el-button>
        </div>
    </div>
</template>

<script>
import service from "../api/request";
import { DateGrid } from "../api/date";
export default {
    data() {
        return {
            user: {
                // 用户信息
                name: "用户名称",
            },
            date: "",
            themeFlog: true,
            menuIndex: 0,
            menuArray: [
                {
                    name: "综合观测",
                    children: [
                        { name: "气象数据可视化", path: "/" },
                        { name: "精细化对比分析", path: "/analyse" },
                        { name: "人影作业分析", path: "/shadowjob" },
                    ],
                },
                {
                    name: "数据查询统计",
                    children: [
                        { name: "气象站点实况", path: "/yujing" },
                        { name: "历年对比", path: "/compare" },
                        { name: "降雨概率统计", path: "/rainRate" },
                        { name: "站点历史极值", path: "/stationExtremum" },
                        { name: "风向风速玫瑰图", path: "/windRose" },
                       /*  { name: "指导预报产品", path: "/guideProduct" }, */
                        { name: "地质灾害预报图", path: "/geoHazard" },
                        { name: "适宜度模型", path: "/suitabilityModel" },
                        { name: "雷达历史数据", path: "/Radarhistory" },
                    ],
                },
                {
                    name: "产品制作",
                    children: [
                        { name: "专业服务产品", path: "/pdfProduct" },
                        { name: "气象预报产品", path: "/txtProduct" },
                        { name: "产品模板", path: "/workSystem" },
                    ],
                },
                {
                    name: "产品发布",
                    children: [
                        { name: "短信群组管理", path: "/msgGroup" },
                        {name: "短信发送",path: "/txtProductSend"}
                    ],
                },
                {
                    name: "系统管理",
                    children: [
                        { name: "用户管理", path: "/userSystem" },
                        {
                            name: "水电站流域",
                            path: "/HydropowerStation",
                        },
                        {
                            name: "作业点管理",
                            path: "/workPoint",
                        },
                    ],
                },
            ],
            selectType: "skType",
        };
    },
    created() {
        this.date = DateGrid(new Date(), "yyyy-MM-dd");
        let nikeName;
        if (JSON.parse(localStorage.getItem("lcqxfzjz")).nikeName == null) {
            nikeName = JSON.parse(localStorage.getItem("lcqxfzjz")).roleInfo
                .name;
        } else if (
            JSON.parse(localStorage.getItem("lcqxfzjz")).nikeName != null
        ) {
            nikeName = JSON.parse(localStorage.getItem("lcqxfzjz")).nikeName;
        }
        // localStorage.getItem获取lcqxfzjz中的roleInfo.name
        this.user.name =
            nikeName +
            "(" +
            JSON.parse(localStorage.getItem("lcqxfzjz")).roleInfo.name +
            ")";
    },
    mounted() {
        this.handleMenu(0);
    },
    methods: {
        handleMenu(index) {
            this.menuIndex = index;
            this.$router.push(this.menuArray[this.menuIndex].children[this.menuIndex]["path"]);
        },
        loginOut() {
            //退出
            this.$confirm("确认退出吗?", "提示", {
                type: "warning",
            }).then(() => {
                if (process.env.NODE_ENV === "development") {
                    //开发环境
                    localStorage.removeItem("lcqxfzjz");
                    this.$router.push("/login");
                    // 清空本地存储
                    localStorage.clear();
                } else {
                    service
                        .post("/user?logOut")
                        .then(() => {
                            localStorage.removeItem("lcqxfzjz");
                            this.$router.push("/login");
                        })
                        .catch((res) => {
                            this.$message.error(res.o);
                            // 清空本地存储
                            localStorage.clear();
                        });
                }
            });
        },
        handleCommand(obj) {
            if (this.$store.state.theme == "dark") {
                this.typeSwitchFun();
            }
            this.themeFlog = false;
            this.menuIndex = obj.pId;
            this.$router.push(
                this.menuArray[obj.pId].children[obj.cId]["path"]
            );
        },
    },
};
</script>

<style scoped>
.header {
    height: 56px;
    position: relative;
}
.header {
    /*  background-image: url(../assets/img/title_bj.png); */
    background: #000458;
    /*  background-size: contain;
    background-position: 100% 0;
    background-repeat: no-repeat;
    background-color: #3e87f4; */
    color: #fff;
}

.logo {
    height: 56px;
    line-height: 56px;
    position: relative;
    padding-left: 85px;
}
.logo > img {
    height: 56px;
    vertical-align: middle;
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
}
.logo > span {
    font-size: 26px !important;
    font-weight: 400;
}

.userConfig {
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
}
.userConfig >>> button.el-button--text {
    color: #fff;
}
.userConfig >>> button.el-button--text i {
    background: rgb(255, 255, 255, 30%);
    border-radius: 99px;
    padding: 4px;
    border: 1px solid #fff;
    font-size: 22px !important;
}
.userConfig >>> button {
    font-size: 20px !important;
    margin-left: 30px !important;
    padding: 1px 10px;
}

.userConfig >>> button i {
    font-size: 30px !important;
    vertical-align: middle;
}

.userConfig >>> button span {
    vertical-align: middle;
}
/**菜单**/
.menus {
    position: absolute;
    top: 0;
    left: 560px;
    line-height: 56px;
}
.menusUL {
    list-style: none;
    margin: 0;
    padding: 0;
}
.menusUL::after {
    display: block;
    content: "";
    clear: both;
}
.menusUL > li {
    float: left;
    cursor: pointer;
    text-align: center;
}
.menusUL > li > span {
    display: inline-block;
    min-width: 120px;
    font-size: 22px !important;
    padding: 0 16px;
}
.header .menusUL > li.active {
   /*  background-image: linear-gradient(rgb(0, 0, 0, 25%), rgb(0, 0, 0, 5%)); */
   /*  width: 160px; */
    height: 56px;
    background: linear-gradient(180deg, #2127a1 0%, #000458 100%);
}
/**二级菜单 */
.secondDropdown > .el-dropdown-link {
    display: inline-block;
    min-width: 120px;
    height: 56px;
    line-height: 56px;
    font-size: 22px !important;
    padding: 0 8px;
    color: #fff;
}
.secondDropdown > .el-dropdown-link .el-dropdown-menu__item {
    padding: 20px 10px;
}
</style>
