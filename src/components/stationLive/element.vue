<template>
    <div>
        <div class="top">参数设置</div>
        <div class="middle">
            <table>
                <tbody>
                    <tr>
                        <td :colspan="2">
                            <el-row>                               
                                <el-col :span="12"><el-radio v-model="type" :label="1">多要素</el-radio></el-col>
                                <el-col :span="12"> <el-radio v-model="type" :label="2">单要素</el-radio></el-col>                                                     
                            </el-row> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type: 1
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/dataQuery.scss";
table tbody tr:last-child td:first-child{
    border-right: 0;
    text-align: center;
}
</style>