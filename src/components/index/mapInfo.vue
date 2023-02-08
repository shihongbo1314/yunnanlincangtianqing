<template>
    <!-- 地图左上角：摄像头信息 -->
    <div class="info">
        <div class="info-title">
            摄像头
        </div>
        <div class="info-illustrate">能见度风险等级监测</div>
        <el-row class="info-row" v-for="(item,index) in dataList" :key="index">
            <el-col :span="12" class="info-col"><i :style="{background:item.color}"></i>{{item.name}}风险</el-col>
            <el-col :span="12" style="text-align:right;color:#3E87F4">{{riskNum[item.level]}}路</el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ["riskNum"],
    data(){
        return{
            dataList: [
                {
                  color: "#00CD00",
                  name: "无",
                  level: 5
                },
                {
                  color: "#465AFF",
                  name: "一般",
                  level: 4
                },{
                  color: "#E1D600",
                  name: "较高",
                  level: 3
                },{
                  color: "#E89900",
                  name: "很高",
                  level: 2
                },{
                  color: "#CD2B2B",
                  name: "严重",
                  level: 1
                }
            ]
        }
    }
}
</script>

<style scoped>
.info{
    width: 216px;
    background: #fff;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
}
.info-title{
    height: 32px;
    line-height: 32px;
    background: #DCECFF;
    border-radius: 4px;
}
.info-title .icon{
    vertical-align: middle;
    margin: 0 6px 0 8px;
}
.info-illustrate{
    padding: 8px 0;
    color: #2D5A9D;
}
.info-row{
    height: 32px;
    line-height: 32px;
    color: #333;
}
.info-col>i{
    display: inline-block;
    width: 8px;
    height: 8px;
    border: 1px solid rgba(255,255,255,1);
    border-radius: 4px;
    margin-right: 8px;
}
</style>