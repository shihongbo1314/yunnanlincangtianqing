<template>
    <div class="text_box" v-loading="loading">
        <div class="text_left">
            <el-card class="box_card" :body-style="{height: '100%'}"> 
                <div class="header">
                    <el-row>
                        <el-col :span="10">
                            <el-button size="mini" @click="back">返回</el-button>  
                        </el-col>
                        <el-col :span="14" style="text-align: right">                           
                            <el-button type="success" size="medium" @click="send">发送</el-button>                            
                        </el-col>
                    </el-row>
                </div>
                <el-input
                    class="textareaClass"
                    type="textarea"
                    v-model="value"
                    :autosize="{ minRows: 20 }"
                    placeholder="请输入内容"
                ></el-input>
            </el-card>
        </div>
        <div class="text_right">
            <el-card class="box_card" :body-style="{height: '100%'}">
                <div class="header">
                    姓名：<el-input style="width: 150px" v-model="name"></el-input>
                    手机号：<el-input style="width: 150px" v-model="phone"></el-input>
                    <el-button style="margin-left: 10px;" size="medium" type="primary" @click="search">查询</el-button>  
                </div>
                <div class="tableDiv">
                    <el-table
                        ref="multipleTable"
                        :data="tableSelectData"
                        border
                        stripe
                        @selection-change="handleSelectionChange"
                        style="width: 100%"
                        class="commonTable">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            align="center"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            align="center"
                            width="150"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            align="center"
                            label="所属群组">
                            <template slot-scope="scope">
                                <template>
                                    {{getGroup(scope.row)}}
                                </template>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="header">
                    手机号：<el-input style="width: 150px" v-model="addPhone"></el-input>
                    <el-button style="margin-left: 10px;" size="medium" type="primary" @click="addPhoneFun">添加</el-button>  
                </div>
                <div class="selectDiv">
                    <el-tag
                        v-for="tag in mobileList"
                        :key="tag.name"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{getPhoneName(tag)}}
                        {{tag}}
                    </el-tag>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import service from "@/api/request"
export default {
    name: "TxtSend",//短信发送
    data(){
        return{
            loading: false,
            value: "",
            name: "",
            phone: "",
            addPhone: "",
            tableData: [],
            tableSelectData: [],
            division: [],
            division1: [],
            multipleSelection: [],
            mobileList: []
        }
    },
    watch:{
        multipleSelection(newVal,oldVal){
            //根据旧数据进行移除
            if(oldVal.length){
               oldVal.forEach(item=>{
                   if(this.mobileList.includes(item.phone)){
                       this.mobileList.splice(this.mobileList.indexOf(item.phone), 1)
                   }
               })  
            }
            //把新选择的加进去
            if(newVal.length){
               newVal.forEach(item=>{
                   if(!this.mobileList.includes(item.phone)){
                       this.mobileList.push(item.phone)
                   }
               })  
            }
        }
    },
    created(){
        this.getDivision()
    },
    methods:{
        getDivision() {//获取县区局区划数据   
            service.post("/baseUserRegion/list").then((res) => {
                if(res.data.state==200){
                    res.data.records.forEach((item) => {
                        if (item.parentId == 1) {
                            this.division.push(item)
                        }
                    })
                    this.getDivision1()
                }               
            })
        },
        getDivision1() {//获取水电站区划数据   
            service.post("/basinInfo/basinInfoList").then((res) => {
                if(res.data.state==200){
                    this.division1 = res.data.records                   
                } 
                this.getUserData()              
            })
        },
        getUserData(){//获取用户数据
            service.post("/smsUserinfo/list",{
                type: 1
            }).then((res) => {
                if(res.data.state==200){
                    this.tableData = this.tableData.concat(res.data.records)
                    service.post("/smsUserinfo/list",{
                        type: 2
                    }).then((res) => {
                        if(res.data.state==200){
                            this.tableData = this.tableData.concat(res.data.records)                            
                        } 
                        this.search()              
                    })
                }               
            })            
        },
        search(){//查询
            this.tableSelectData = []
            this.tableData.forEach(item=>{
                if(item.name.includes(this.name)&&item.phone.includes(this.phone)){
                    this.tableSelectData.push(item)
                }
            })
        },
        getGroup(data){//获取群组名称
            let str = ""
            if(data.type==1){
                str = "县区局 -> "
                this.division.forEach(item=>{
                    if(item.id==data.dataId){
                        str+=item.name
                    }
                })
            }else if(data.type==2){
                str = "水电站 -> "
                this.division1.forEach(item=>{
                    if(item.id==data.dataId){
                        str+=item.name
                    }
                })
            }
            return str
        },
        handleSelectionChange(val) {//表格选择
            this.multipleSelection = val
        },
        addPhoneFun(){//添加手机号
            let str = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
            if(str.test(this.addPhone)){
                if(this.mobileList.includes(this.addPhone)){
                    this.$message.info("该手机号已添加")
                }else{
                    this.mobileList.push(this.addPhone)
                }                
            }else{
                this.$message.error("请输入正确格式的手机号")
                return
            }            
        },
        handleClose(tag){//关闭标签
            this.mobileList.splice(this.mobileList.indexOf(tag), 1);
        },
        getPhoneName(phone){//手机号姓名
            let str = ""
            this.tableData.forEach(item=>{
                if(item.phone==phone){
                    str = item.name+ " — "
                }
            })
            return str
        },
        send(){//发送
            if(!this.value){
                this.$message.error("请输入内容，不超过500个字")
                return
            }
            if(!this.mobileList.length){
                this.$message.error("请在右侧选择或添加要发送的手机号")
                return
            }
            this.loading = true
            service.post("/smsUserinfo/sendCustomSms",{
                content: this.value,
                mobiles: this.mobileList.join(",")
            }).then((res) => {
                this.loading = false
                if(res.data.state==200){
                    this.$message.success("发送成功")                         
                }            
            })
        },
        back(){//返回
            this.$emit("handleBack")
        }
    },
}
</script>

<style lang="less" scoped>
.text_box{
    width: 100%;
    height: 100%;
    display: flex;
    & .box_card {
        height: 100%;
    }
    .text_left{
        height: 100%;
        flex: 1;
        .header{
            padding-bottom: 16px;
        }
    }
    .text_right{
        height: 100%;        
        width: 600px;
        padding-left: 16px;
        .header{
            padding-bottom: 16px;
        }
        .tableDiv{
            height: 400px;
            overflow: auto;
            margin-bottom: 16px;
        }
        .selectDiv{
            height: 250px;
            overflow: auto;
            border: 1px solid #C0C4CC;
            border-radius: 4px;
            padding: 10px;
        }
        .el-tag + .el-tag {
            margin-left: 10px;
        }
        .el-tag{
            margin-bottom: 10px;
        }
    }
    .textareaClass {
        height: calc(100% - 52px);
        /deep/ textarea {
            resize: none;
            font-size: 18px;
            height: 100% !important;
        }
    }
}
</style>
