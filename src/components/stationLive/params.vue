<template>
    <div>
        <div class="top">要素管理</div>
        <div class="middle">
            <table>
                <tbody>
                    <tr>
                        <td>数据类型</td>
                        <td>
                            <el-radio-group v-model="type">
                                <el-radio :label="item.val" v-for="(item,index) in typeArray" :key="index">{{item.name}}</el-radio>
                            </el-radio-group> 
                        </td>
                    </tr>
                    <tr>
                        <td>开始时间</td>
                        <td>
                            <el-row>                               
                                <el-col :span="12"><el-radio v-model="level" :label="1">市</el-radio></el-col>
                                <el-col :span="12"> <el-radio v-model="level" :label="2">县</el-radio></el-col>                                                     
                            </el-row> 
                        </td>
                    </tr>
                    <tr>
                        <td>结束时间</td>
                        <td>
                            <el-row>                               
                                <el-col :span="12"><el-radio v-model="level" :label="1">市</el-radio></el-col>
                                <el-col :span="12"> <el-radio v-model="level" :label="2">县</el-radio></el-col>                                                     
                            </el-row> 
                        </td>
                    </tr>
                    <tr>
                        <td>查询类型</td>
                        <td>
                            <el-row>
                                <el-col :span="12"><el-radio v-model="choose" :label="1">逐日查询</el-radio></el-col>
                                <el-col :span="12"><el-radio v-model="choose" :label="2">时段查询</el-radio></el-col>
                            </el-row>
                        </td>
                    </tr>
                    <tr>
                        <td>查询</td>
                        <td>
                            <el-input placeholder="请输入站点名称或站号" v-model="name" class="input-with-select">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>距平</td>
                        <td>
                            <el-input placeholder="请输入站点名称或站号" v-model="name" class="input-with-select">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>出图</td>
                        <td>
                            <el-input placeholder="请输入站点名称或站号" v-model="name" class="input-with-select">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type: "day",
            level: 1,
            choose: 1,
            name: "",
            typeArray: [
                {name: "年",val: "year"},
                {name: "季",val: "season"},
                {name: "月",val: "month"},
                {name: "旬",val: "ten"},
                {name: "周",val: "week"},
                {name: "日",val: "day"},
                {name: "时",val: "hour"}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/dataQuery.scss";
</style>