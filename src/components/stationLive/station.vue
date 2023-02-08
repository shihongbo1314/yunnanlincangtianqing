<template>
    <div>
        <div class="top">站点选择</div>
        <div class="middle">
            <table>
                <tbody>
                    <tr>
                        <td>站点类型</td>
                        <td>
                            <el-row>
                                <el-col :span="12"><el-checkbox v-model="type" :label="1">国家站</el-checkbox></el-col>
                                <el-col :span="12"><el-checkbox v-model="type" :label="0">区域站</el-checkbox></el-col>
                            </el-row>  
                        </td>
                    </tr>
                    <tr>
                        <td>节点层级</td>
                        <td>
                            <el-row>                               
                                <el-col :span="12"><el-radio v-model="level" :label="1">市</el-radio></el-col>
                                <el-col :span="12"> <el-radio v-model="level" :label="2">县</el-radio></el-col>                                                     
                            </el-row> 
                        </td>
                    </tr>
                    <tr>
                        <td>选择方式</td>
                        <td>
                            <el-row>
                                <el-col :span="12"><el-radio v-model="choose" :label="1">多选</el-radio></el-col>
                                <el-col :span="12"><el-radio v-model="choose" :label="2">单选</el-radio></el-col>
                            </el-row>
                        </td>
                    </tr>
                    <tr>
                        <td>查询</td>
                        <td>
                            <el-input placeholder="请输入站点名称或站号" v-model="name" class="input-with-select">
                                <el-button slot="append" icon="el-icon-search" @click="searchStaion"></el-button>
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td :colspan="2">
                            已选择站点：{{select}} / {{number}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="bottom">
            <el-tree
                :class="choose==1?'treeDiv':'treeDiv singleTree'"
                ref="tree"
                :key="treeKey"
                :data="data"
                show-checkbox
                node-key="id"
                :check-strictly="choose!=1"
                :default-expanded-keys="expandedKeys"
                :default-checked-keys="checkedKeys"
                @check-change="treeCheckChange"
                :props="defaultProps">
            </el-tree>
        </div>
    </div>
</template>

<script>
import inter from "../../api/request.js"
export default {
    data(){
        return {
            type: [1],
            level: 1,
            choose: 1,
            name: "",
            number: 0,
            select: 0,
            stationData: [],
            stationCity: {
                "济南市": {},
                "青岛市": {},
                "淄博市": {},
                "枣庄市": {},
                "东营市": {},
                "烟台市": {},
                "潍坊市": {},        
                "济宁市": {},
                "泰安市": {},
                "威海市": {},
                "日照市": {},
                "临沂市": {},
                "德州市": {},
                "聊城市": {},
                "滨州市": {},
                "菏泽市": {},
            },
            cityCode: {
                "济南市": 370100,
                "青岛市": 370200,
                "淄博市": 370300,
                "枣庄市": 370400,
                "东营市": 370500,
                "烟台市": 370600, 
                "潍坊市": 370700,         
                "济宁市": 370800,
                "泰安市": 370900,
                "威海市": 371000,
                "日照市": 371100,
                "临沂市": 371300,
                "德州市": 371400,
                "聊城市": 371500,
                "滨州市": 371600,
                "菏泽市": 371700,
            },
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            checkedKeys: [],// 勾选的站点id
            expandedKeys: [],// 默认展开的节点
            treeKey: 0,
            searchFlog: false,
            searchStationArray: [],// 查询勾选的站点 
        }
    },
    watch:{
        type(){
            this.changeCondition()
        },
        level(){
            this.changeCondition()
        },
        choose(){
            this.changeCondition()
        }
    },
    created(){
        this.getStationData()
    },
    methods: {
        getStationData(){ //获取站点数据
            inter.get("/cimissDataStatistics/listStation.do",{
                params: {
                    stationType: "自动气象观测站",
                    adminCode: 370000
                }
            }).then((res)=>{
                this.stationData = res
                this.stationData.forEach(element => {
                    if(this.stationCity[element.city]){
                        if(!this.stationCity[element.city][element.county]){
                            this.stationCity[element.city][element.county] = []
                        }
                        this.stationCity[element.city][element.county].push(element)
                    }
                })
                this.changeCondition()
            }).catch(()=>{
                this.$message.error("网络异常")
            })
        },
        changeCondition(){// 筛选条件改变，重新生成树组件数据
            this.number = 0
            this.data = []
            this.checkedKeys = []
            this.expandedKeys = []
            let province = {
                id: 370000,
                label: '山东省',
                children: [],
                isLeaf: false
            }
            
            for(let i in this.stationCity){
                let city = {
                    id: this.cityCode[i],
                    label: i,
                    children: [],
                    isLeaf: false
                }  
                
                if(this.stationCity[i][""]){
                    this.stationCity[i][""].forEach(element=>{
                        if(this.type.includes(element.forecast)){
                            if(this.searchFlog&&!(element.stationId.includes(this.name)||element.stationName.includes(this.name))){
                                return
                            }
                            this.number++
                            this.checkedKeys.push(element.stationId)
                            let station = {
                                id: element.stationId,
                                label: `${element.stationName}（${element.stationId}）`,
                                isLeaf: true
                            }                            
                            city.children.push(station)
                        }                        
                    })
                }            
                for(let j in this.stationCity[i]){
                    if(j==""){
                        continue
                    }
                    if(this.searchFlog&&!this.searchStationLeaf(this.stationCity[i][j])){
                        continue
                    }
                    let county = {
                        id: this.stationCity[i][j][0]["adminCode"],
                        label: j,
                        children: [],
                        isLeaf: false
                    }
                    this.stationCity[i][j].forEach(element=>{
                        if(this.type.includes(element.forecast)){
                            if(this.searchFlog&&!(element.stationId.includes(this.name)||element.stationName.includes(this.name))){
                                return
                            }
                            this.number++
                            this.checkedKeys.push(element.stationId)
                            let station = {
                                id: element.stationId,
                                label: `${element.stationName}（${element.stationId}）`,
                                isLeaf: true
                            }
                            if(this.level==1){
                                if(element.forecast){
                                    city.children.unshift(station)
                                }else{
                                    city.children.push(station)
                                }                                
                            }else{
                                county.children.push(station)
                            }
                        }                        
                    })
                    if(county.children.length!=0){                        
                        this.expandedKeys.push(this.stationCity[i][j][0]["adminCode"])
                        city.children.push(county)
                    }                    
                }
                if(city.children.length!=0){
                    this.expandedKeys.push(this.cityCode[i])
                    province.children.push(city)
                }                
            }
            if(province.children.length!=0){
                this.expandedKeys.push(370000)
                this.data.push(province)
            }
            
            if(this.choose != 1){ // 当时单选的时候，只默认勾选第一项
                let firstVal = this.checkedKeys[0]
                if(this.searchStationArray.length!=0&&!this.searchFlog){
                    firstVal = this.searchStationArray[0]
                }                
                this.checkedKeys = [firstVal]
            }else{
                if(this.searchStationArray.length!=0&&!this.searchFlog){
                    this.checkedKeys = this.searchStationArray
                }
            }
            this.select = this.checkedKeys.length
            this.treeKey++
        },
        treeCheckChange(data,checked){// 节点状态改变时  
            if(this.choose != 1&&checked){
                this.$refs.tree.setCheckedKeys([data.id])
            }
            let allNodes = this.$refs.tree.getCheckedNodes()
            let leafNodes = allNodes.filter(item => item.isLeaf)
            this.select = leafNodes.length  
        },
        searchStaion(){// 查询站点
            if(this.searchFlog){// 将每次查询的站点勾选的项存储下来
                let allNodes = this.$refs.tree.getCheckedNodes()
                let leafNodes = allNodes.filter(item => item.isLeaf)
                leafNodes.forEach(item=>{
                    if(!this.searchStationArray.includes(item.id)){
                        this.searchStationArray.push(item.id)
                    }
                })                
            }
            if(this.name!=""){
               this.searchFlog = true 
               this.changeCondition()
            }else{
                if(this.searchFlog){// 前面有查询的站点存储
                    this.searchFlog = false
                    this.changeCondition()                  
                }else{
                    if(this.searchStationArray.length!=0){
                        this.searchStationArray = [] 
                        this.changeCondition()
                    }                   
                }
            }
        },
        searchStationLeaf(arr){ // 判断站点中是否符合站点查询的条件
            let trueArr = arr.filter(element => element.stationId.includes(this.name)||element.stationName.includes(this.name))
            return trueArr.length
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/dataQuery.scss";
.input-with-select .el-input-group__prepend {
    background-color: #F5F6F7;
    width: 100%;
}
table tbody tr:last-child td:first-child{
    border-right: 0;
    text-align: center;
}
/deep/ .singleTree.el-tree .el-tree-node .is-leaf + .el-checkbox .el-checkbox__inner{display: inline-block;}
/deep/ .singleTree.el-tree .el-tree-node .el-checkbox .el-checkbox__inner{display: none;}
</style>