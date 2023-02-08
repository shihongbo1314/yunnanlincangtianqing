<template>
  <div class="dataQueryDiv">
    <!-- 左侧部分，可收起 -->
    <div class="leftDiv" v-show="leftShow">
        <!-- 站点选择 -->        
        <StationSelect />  
        <!-- 参数设置、要素管理 -->
        <div class="leftDiv_leftBottom">            
            <ParamsSetUp />
            <ElementManage />
        </div>
    </div>
    <!-- 右侧部分 -->
    <div class="rightDiv">
        <!-- 控制按钮 -->
        <div class="controlBtn">
            <ul>                
                <el-tooltip class="item" effect="dark" :content="leftShow?'收起':'展开'" placement="right">
                    <li @click="leftShow = !leftShow">
                        <svg-icon :icon-class="leftShow?'close':'open'" class="icon"></svg-icon>
                    </li>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="查询" placement="right">
                    <li>                   
                        <svg-icon icon-class="seach" class="icon"></svg-icon>                    
                    </li>
                </el-tooltip> 

                <el-tooltip class="item" effect="dark" content="重置" placement="right">
                    <li>                   
                       <svg-icon icon-class="refresh" class="icon"></svg-icon>                    
                    </li>
                </el-tooltip> 

                <el-tooltip class="item" effect="dark" content="数据表格" placement="right">
                    <li class="active">                   
                        <svg-icon icon-class="table" class="icon"></svg-icon>                   
                    </li>
                 </el-tooltip>

                <el-tooltip class="item" effect="dark" content="柱状图" placement="right"> 
                    <li>                   
                        <svg-icon icon-class="bar" class="icon"></svg-icon>                     
                    </li>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="折线图" placement="right">
                    <li>                   
                        <svg-icon icon-class="line" class="icon"></svg-icon>                     
                    </li>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="等值面图" placement="right">
                    <li>                   
                        <svg-icon icon-class="map" class="icon"></svg-icon>                    
                    </li>
                </el-tooltip> 
                
                <el-tooltip class="item" effect="dark" content="设置" placement="right">
                    <li>                   
                        <svg-icon icon-class="settings" class="icon"></svg-icon>                     
                    </li>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="下载" placement="right">
                    <li>                   
                        <svg-icon icon-class="download" class="icon"></svg-icon>                    
                    </li>
                </el-tooltip> 
            </ul>
        </div>
        <!-- 查询内容展示区域 -->
        <div class="mainContent">
            
        </div>
    </div>  
  </div>
</template>

<script>
// import axios from "@/api/request.js"
// import axiosAll from "axios"
import StationSelect from "@/components/stationLive/station.vue"
import ParamsSetUp from "@/components/stationLive/params.vue"
import ElementManage from "@/components/stationLive/element.vue"

export default {
    components:{
        StationSelect,
        ParamsSetUp,
        ElementManage
    },
    data(){
        return{
            leftShow: true
        }
    },
    created(){
    //    this.getStationData()
    },
    methods:{
        // getStationData(){
        //     axiosAll.get("http://61.153.185.211:9080/WeiFang/stationinfo/list.do?adminCode=370000").then((res)=>{
        //         console.log(res)
        //     })
        // }
    }
}
</script>

<style scoped lang="scss">
.dataQueryDiv{
    width: 100%;
    height: 100%;
    display: flex;
}
#dataQueryIframe{
    width: 100%;
    height: 100%;
    border: 0;
}
.dataQueryDiv>div{
    height: 100%;    
}
/**左侧：站点选择、参数设置、要素管理 */
.leftDiv{
    width: 720px;
    display: flex;
    &>div{
        display: flex;
        flex-direction: column;
        flex: 1;
        box-sizing: border-box;
        border-right: 1px solid #ADB3BB;
    }
    /** 参数设置、要素管理 */
    .leftDiv_leftBottom{
        display: flex;
        flex-direction: column;
        div:first-child{
            
        }
        div:last-child{
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
    }
}

/**右侧：控制按钮和内容 */
.rightDiv{
    display: flex;
    flex-grow: 1;
    .controlBtn{
        width: 48px;       
    }
    .mainContent{
        flex-grow: 1;
        border-left: 1px solid #ADB3BB;
    }
}

/**按钮 */
.controlBtn{
    ul li{
        text-align: center;
        padding: 8px 0;
        cursor: pointer;
        .icon{
            width: 32px;
            height: 32px;
            color: #546070;
        }
        &:hover,
        &.active{
            background: #DCECFF;
            .icon{
                color: #3E87F4;
            }
        }
    }
}
</style>>