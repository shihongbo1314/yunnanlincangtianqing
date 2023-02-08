<template>
    <div class="radarMarker">
        <!-- 雷达控制 -->
        <div class="radar">
            <el-checkbox label="雷达" v-model="radar.show" @change="radarShowChange_self"></el-checkbox>
            <ul class="times">
                <li 
                :style="'width: ' + (100/timeLiMax) + '%;'"
                :class="timeLiIsHourRadar(index)"
                v-for="index in timeLiMax" :key="index"
                @mouseover="radarShowDataChange(index)" 
                ></li>
            </ul>
        </div>
        <!-- 刷新控制 -->
        <div class="refreshConfig">
            <el-checkbox :checked="autoRefresh" label="自动刷新" @change="autoRefreshChange"></el-checkbox>
        </div>
    </div>
</template>

<script>
import * as L from 'leaflet'
import service from "@/api/request"
export default {
    data(){
        return{
            timeLiMax: 40,
            autoRefresh: true,
            radar: {// 雷达图
                show : false, // 显示
                showIndex : 0,
                layer : null,
                data: [],
                timer: null
            }           
        }
    },
    props: {
        map: {
            type: Object,
            default: null,
        }
    },
    created(){// 初始化界面之前获取数据      
        this.radar.showIndex = this.timeLiMax
        this.getRadarData()
    },
    mounted(){// 界面显示完成后调用方法      
        this.radar.timer = setInterval(()=>{
            this.getRadarData()
        },1000*60*6)//雷达数据6分钟更新一次
    },
    methods: {
        getRadarData(){//获取雷达数据
            service.post("/radar/list",{
                size: 40
            }).then((res) => {
                this.radar.data = []
                if(res.data.state==200){
                    let arr = res.data.records
                    for(let i=arr.length-1;i>=0;i--){
                        this.radar.data.push(arr[i].datatime)
                    }
                    this.radarShow_self()
                }               
            })
        },
        autoRefreshChange(){//自动刷新改变
            if(this.autoRefresh){
                this.radar.timer = setInterval(()=>{
                    this.getRadarData()
                },1000*60*6)//雷达数据6分钟更新一次
            }else{
                if(this.radar.timer){
                    clearInterval(this.radar.time)
                    this.radar.timer = null
                }
            }
        },
        timeLiIsHourRadar(index){//雷达时间样式
            if(this.radar.data.length==0){
                return []
            }
            let names = []
            if(this.radar.showIndex == index){
                names.push("active")
            }
            let dateStr = this.radar.data[index-1]
            if(dateStr.substring(10,12)=="00"){
                names.push("hour")
            }
            return names.join(" ")
        },
        radarShowChange_self(){// 雷达图显示开关
            if(this.radar.show){
                this.radarShow_self()
            }else{
                if(this.radar.layer != null){
                    this.radar.layer.remove()
                    this.radar.layer = null
                }
            }
            this.$emit('radarShowChange',this.radar.show)
        },
        radarShowDataChange (index){// 雷达图切换   
            this.radar.showIndex = index
            this.radarShow_self()
        },
        radarShow_self(){
            if(!this.radar.show || this.map == null){
                return
            }
            let timeStr = this.radar.data[this.radar.showIndex-1]
            let url = `${this.$store.state.fileUrl}/RadarImg/Z9883_${timeStr}_0.0_230_CR.png`
            if(this.radar.layer == null){
                let bounds = [[ 25.849085884148788, 102.49101883646262], [21.94290007384079, 98,21771660432698]]
                this.radar.layer = L.imageOverlay(url, bounds, {
                    opacity: 1,
                    pane: "overlayPane",
                })
                this.radar.layer.addTo(this.map)
            }else{
                this.radar.layer.setUrl(url)
            }
            this.$emit('radarDateChange',timeStr)
        }
    }
}
</script>
<style scoped>
.radar{
    margin-top: 5px;
}
.radarMarker{
    position: relative;
    padding: 1px 10px 0;
    user-select: none;
}
ul.times {
    padding: 0;
    margin: 4px 0;
    list-style: none;
    height: 20px;
    width: calc(100% - 490px);
    display: inline-block;
    margin-left: 20px;
    vertical-align: middle;
}

ul.times li {
    float: left;
    max-width: 14px;
    height: 100%;
    padding-right: 1px;
    position: relative;
    cursor: pointer;
}

ul.times li:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 4px;
    bottom: 0;
    background: #555;
}
ul.times li.hour:before {
    background: #111;
}
ul.times li.active:before {
    background: #025DF4;
}
.refreshConfig {
    position: absolute;
    top: 8px;
    right: 10px;
}
</style>