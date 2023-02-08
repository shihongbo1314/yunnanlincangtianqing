<template>
    <!-- 信息提示 -->
    <div class="messageAlert">
        <div class="rightConfigTitle">
            <p>强对流天气自动报警</p>
        </div>
        <div class="rightConfigInfo">
            <ul class="messageList">
                <li class="messageBox" v-for="(item, index) in message" :key="index">
                    <div class="messageTitle">
                        <span>{{item.title}}</span>
                        <el-button type="primary">复制</el-button>
                    </div>
                    <div class="messageInfo">
                        {{item.info}}
                    </div>
                </li>
            </ul>
        </div>

        <!-- 生活指数 -->
        <div class="rightConfigTitle">
            <p>生活指数</p>
        </div>
        <div class="lifeIndex" @click="handleOpen" v-loading="loading" style="cursor: pointer">
            <ul>
                <li v-for="(i,index) in lifeList" :key="index">                    
                    <div class="liLeft">
                        <span>{{i.icon}}</span>
                    </div>
                    <div class="liRight">
                        <h5>{{i.name}} {{i.data[0].info.title}}</h5>
                        <p>{{i.data[0].info.content}}</p>
                    </div>
                </li>
            </ul>
        </div>  
        <el-dialog
            title="生活指数"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            custom-class="messageDialog"
		    center
            width="50%">
            <div class="dialogDiv">
                <div class="dialogTop">
                    <ul :key="ulKey">
                        <li :class="selectIndex==index?'active':''" v-for="(e,index) in lifeList" :key="index" @click="handleChange(index)">                            
                            <div class="title"><span>{{e.name}}</span></div>                                                         
                            <div class="content">
                                {{e.data[0].info.level}}级
                            </div>                          
                        </li>
                    </ul>
                </div>
                <p style="text-align: center;margin: 0">{{lifeList.length?lifeList[selectIndex].data[0].info.content:''}}</p>
                <div class="dialogMiddle">
                    <div class="title">
                        <img src="@/assets/img/box/indexIcon.png">指标未来10天变化趋势                      
                    </div>
                    <div class="content">
                        <div id="forecastLine"></div>
                    </div>
                </div>
                <div class="dialogMiddle">
                    <div class="title">
                        <img src="@/assets/img/box/indexIcon.png">
                        指标解释说明
                    </div>
                    <div class="content">                        
                        <table class="dialogTable" cellpadding="0" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>等级</th>
                                    <th>描述</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(t,index) in dialogTableData" :key="index">
                                    <td>{{t.level}}级</td>
                                    <td>{{t.content}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </el-dialog>     
    </div>
</template>

<script>
import service from "@/api/request"
export default {
    name: "MessageAlert",
    data(){
        return{
            message: [
                {
                    title : "强降雨",
                    info : "发生强降雨区域包含：",
                }
            ],
            loading: false,
            lifeList: [],
            dialogVisible: false,
            selectIndex: 0,
            ulKey: 0
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){//获取数据
            this.lifeList = []
            this.loading = true
            service.post("/indexSuitability/getSuitability",{
                lat: 23.920328,
                lon: 100.12224
            }).then((res) => {
                this.loading = false
                if(res.data.state==200){
                    this.rangeInfoData = res.data.records.rangeInfo
                    let dataObj = res.data.records.suitability
                    for(let i in dataObj){
                        let obj = {
                            name: i,
                            icon: i.charAt(0),
                            data: dataObj[i]
                        }
                        this.lifeList.push(obj)
                    }
                }               
            })
        },
        handleOpen(){//打开生活指数详情
            this.dialogVisible = true
            this.$nextTick(() => {
                this.handleChange(0)
            }) 
        },
        handleChange(index){//生活指数改变
            this.selectIndex = index
            let name = this.lifeList[index].name
            this.dialogTableData = this.rangeInfoData[name]

            let noIndex = null
            this.dialogTableData.forEach((item,index)=>{
                if(item.content=="无法计算"){
                    noIndex = index
                }
            })
            if(noIndex!=null){
                this.dialogTableData.splice(noIndex,1)
            }

            this.ulKey++
            this.initLine()
        },
        initLine(){
            if(!this.chartLine){
                this.chartLine = this.$echarts.init(document.getElementById('forecastLine'));
            }
            let dateArr = []
            let valueArr = []
            let barArr = []
            let data = this.lifeList[this.selectIndex].data
            let currentIndex = 0

            data.forEach(element => {
                let date = element.time.substr(5,5)
                dateArr.push(date)
                valueArr.push(element.info.level)
            })
            barArr.push(valueArr[0])       
            
            let options = {
                xAxis: {
                    type: 'category',
                    data: dateArr,
                    axisLabel: {
                        color: function(value, index) {
                            return index==currentIndex?'#1A8FFF':'#333'
                        },
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'axis',                    
                    formatter: function(params){
                        let obj = params[0]
                        return obj.name+"<br>"+obj.marker+" "+obj.value
                    }
                },
                grid: {
                    left:'4%',
                    right: '4%',
                    bottom: '12%',
                    top: '20%'
                },
                yAxis: {
                    name: "等级",
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true
                    },
                    axisTick:{
                        show: true
                    }
                },
                color: ["#1A8FFF"],
                series: [
                    {
                        data: valueArr,
                        type: 'line',
                        smooth: true,
                        symbolSize: 6,   //设定实心点的大小
                        symbol:'circle',
                        areaStyle:{color:{type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(26,143,255,0.5)' // 0% 处的颜色
                            },{
                                offset: 1, color: 'rgba(26,143,255,0)' // 100% 处的颜色
                            }],
                            global: false}
	        	        },
                        itemStyle:{
                            color: '#1A8FFF',
                            borderColor:'#1A8FFF',
                            borderWidth:'1',
                            shadowColor:'#1A8FFF',
                            shadowBlur:'5'
                        }
                    },
                    {
                        type: 'bar',
                        data: barArr,
                        itemStyle: {
                            color:{type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(30,251,255,0)' // 0% 处的颜色
                            },{
                                offset: 1, color: '#1A8FFF' // 100% 处的颜色
                            }],
                            global: false}
                        }
                    }
                ]
            };
            this.chartLine.setOption(options)
        },
    }
}
</script>
<style lang="less" scoped>
.messageAlert{
    height: 100%;
}
.mapLayerConfig{
    margin-bottom: 10px;
}
.rightConfigTitle{
    font-size: 16px;
    background: #DCECFF;
    color: #2D5A9D;
    letter-spacing: 0;
    text-align: center;
    line-height: 24px;
    font-weight: 600;
    padding: 4px;
}
.rightConfigTitle p{
    margin: 0;
}
.rightConfigInfo{
    background: #F5F6F7;
    padding: 10px;
    line-height: 1;
    overflow: auto;
}
.rightConfigInfo > .title {
    color: #3E87F4;
    letter-spacing: 0;
    text-align: justify;
    font-weight: 600;
    padding-left: 5px;
    border-left: 2px solid #3E87F4;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    margin: 0 0 10px;
}

ul.messageList {
    margin: 0;
    padding: 0;
    list-style: none;
    background: #fff;
    overflow: auto;
}

.messageBox {
    margin: 10px;
}

.messageTitle {
    background: #F2F8FF;
    border-radius: 4px 4px 0px 0px;
    padding: 5px;
    overflow: auto;
}

.messageTitle > span {
    font-size: 14px !important;
    margin-left: 5px;
    line-height: 24px;
}

.messageTitle {
    /deep/ button{
        color: #2D5A9D;
        background: #DCECFF;
        padding: 4px 8px;
        float: right;
        margin-right: 5px;
        border: none;
    }    
}

.messageInfo {
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    text-align: justify;
    line-height: 24px;
    font-weight: 400;
    border: 1px solid #DFE2E4;
    padding: 10px;
    min-height: 144px;
}
.lifeIndex{
    background: #F5F6F7;
    padding: 10px;
    ul{
        margin: 0;
        padding: 10px;
        list-style: none;
        background: #fff;
        li{
            display: flex;
            padding: 10px;
            border-bottom: 1px dashed rgba(0,0,0,0.1);
            .liLeft{
                background: linear-gradient(180deg, #2127a1 0%, #000458 100%);
                width: 32px;
                height: 32px;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                line-height: 32px;
                vertical-align: middle;
            }
            .liRight{
                padding-left: 10px;
                h5{
                    margin: 0;
                }
                p{
                    font-size: 12px;
                    margin: 0;
                    margin-top: 5px;
                }
            }
        }
    }
}
.dialogTop{
    height: 140px;
    overflow: auto;
} 
.dialogTop>ul{
    list-style: none;
    margin: 0;
    padding: 0;
} 
.dialogTop>ul>li{
    display: inline-block;
    width: calc(100% / 6);
    text-align: center;
    padding: 5px 0;
    cursor: pointer;
}
.dialogTop>ul>li .title::after{
    content: "";
    display: inline-block;
    width: 4px;
    height: 28px;
    background: rgba(0,0,0,0.2);
    border-radius: 0px 100px 100px 0;
    transform: translateY(-2px);
}
.dialogTop>ul>li .title::before{
    content: "";
    display: inline-block;
    width: 4px;
    height: 28px;
    background: rgba(0,0,0,0.2);
    border-radius: 100px 0px 0px 100px;
    transform: translateY(-2px);
}
.dialogTop>ul>li .title>span{
    display: inline-block;
    height: 24px;
    line-height: 24px;
    vertical-align: top;
    width: 90px;
    overflow: hidden;
    background: rgba(0,0,0,0.1);
}
.dialogTop>ul>li.active .title::after{
    background: #1EFBFF;
}
.dialogTop>ul>li.active .title::before{
    background: #1EFBFF;
}
.dialogTop>ul>li.active .title>span{
    background: rgba(26,143,255,0.6);
}
.dialogTop>ul>li .content{
    width: 88px;
    height: 92px;
    line-height: 92px;
    margin: 0 auto;
    background-image: url("../../assets/img/box/indexSelect.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.dialogTop>ul>li.active .content{
    color: #1EFBFF;
}
.dialogMiddle{
    margin-top: 16px;
}
.dialogMiddle>.content{
    border: 1px solid rgba(255,255,255,0.1);
    padding: 12px;
}
.dialogMiddle>.content .title>span{
    color: #1EFBFF;
    background: rgba(30,251,255,0.1);
    padding: 2px 8px;
}
.dialogMiddle>.title{
    font-size: 16px;
    margin-bottom: 12px;
    position: relative;
}
.dialogMiddle>.title>img{
    vertical-align: middle;
    margin-right: 5px;
}
.dialogMiddle>.title>img.line{
    width: 600px;
}
#forecastLine{
    height: 160px;
}
.dialogTable{
    width: 100%;
}
.dialogTable thead th{
    background: rgba(30,251,255,0.5);
    padding: 5px;
}
.dialogTable tbody tr td{
    text-align: center;
    padding: 5px;
}
.dialogTable tbody tr:nth-child(even) td{
    background: rgba(0,0,0,0.1);
}
</style>
