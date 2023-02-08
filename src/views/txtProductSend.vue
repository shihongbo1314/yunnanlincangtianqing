<template>
    <div class="txtProductSend">
        <TxtSend v-if="sendFlog" @handleBack="handleBack" />
        <el-card class="box_card" :body-style="{height: '100%'}" v-if="!sendFlog">     
            <div class="header">
                <el-row>
                    <el-col :span="12">
                        时间范围：<el-date-picker
                            v-model="timeArr"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                        <el-button size="small" type="primary" style="margin-left: 10px;" @click="getData">查询</el-button>
                    </el-col>
                    <el-col :span="12" style="text-align:right">
                        <el-button size="small" type="success" @click="sendFlog=true">短信发送</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="tableDiv">
                <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width: 100%"
                    class="commonTable">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="saveTime"
                        align="center"
                        label="时间">
                        <template slot-scope="scope">
                            {{getDateStr(scope.row.saveTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="detailedList"
                        align="center"
                        label="发送人数">
                        <template slot-scope="scope">
                            {{scope.row.detailedList.length}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="detailedList"
                        align="center"
                        label="成功人数">
                        <template slot-scope="scope">
                            {{getNum(scope.row.detailedList,'success')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="detailedList"
                        align="center"
                        label="失败人数">
                        <template slot-scope="scope">
                            {{getNum(scope.row.detailedList,'error')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="detailedList"
                        align="center"
                        label="发送中人数">
                        <template slot-scope="scope">
                            {{getNum(scope.row.detailedList,'middle')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        align="center"
                        width="100"
                        label="查看内容">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="text"
                                @click="handleLook(scope.row)">查看</el-button>  
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            width="150"
                            label="操作">
                            <template slot-scope="scope">  
                                <el-button
                                size="mini"
                                type="text"
                                icon="el-icon-search"
                                @click="handleSeach(scope.row)">查看详情</el-button>     
                            </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @current-change="currentChange"
                    style="margin-top: 10px;text-align:center"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog
            title="短信内容查看"
            :visible.sync="txtdialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            custom-class="messageDialog"
		    center
            width="30%">
            <div class="dialogDiv">
                <el-input type="textarea" v-model="content" :autosize="true" :readonly="true" resize="none" style="font-size: 16px"></el-input>
            </div>
        </el-dialog>
        <el-dialog
		title="短信发送情况"
		:visible.sync="dialogVisible"
		width="30%"
		custom-class="messageDialog"
		center
		>
            <!-- 发送人数统计和发送内容 -->
            <el-row>
                <el-col :span="12" class="diaTopLeft diaTop">
                    <p>发送情况</p>
                    <ul class="clearFloat">
                        <li>
                            <span>共计发送</span>
                            <h2 style="#333333">{{messageObj.all}}人</h2>
                        </li>
                        <li>
                            <span>成功发送</span>
                            <h2 style="color:#00DE65">{{messageObj.success}}人</h2>
                        </li>
                        <li>
                            <span>失败发送</span>
                            <h2 style="color:#FF5454">{{messageObj.error}}人</h2>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="12" class="diaTopLeft diaTop">
                    <p>发送内容</p>
                    <div ref="ybMsg">{{messageObj.content}}</div>
                </el-col>
            </el-row>
            <div class="line"></div>
            <!-- 发送人员表格 -->
            <el-table
                class="statusTbale commonTable"
                :data="messageObj.table"
                stripe
                border
                height="200"
                style="width: 100%">
                <el-table-column
                prop="name"
                label="姓名">
                </el-table-column>
                <el-table-column
                prop="mobile"
                label="手机">
                </el-table-column>
                <el-table-column
                prop="status"
                label="发送状态">
                    <template slot-scope="scope">
                        <span v-html="scope.row.status"></span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="msg"
                label="原因">
                </el-table-column>
            </el-table>
		</el-dialog>
    </div>
</template>

<script>
import service from "@/api/request"
import {DateGrid} from "@/utils"
import TxtSend from "@/components/txtProduct/txtSend"
export default {
    name: "SmsSend",//短信发送
    components:{
        TxtSend
    },
    data(){
        return{
            tableData: [],
            current: 1,
            size: 15,
            total: 0,
            timeArr: [],
            sendFlog: false,
            txtdialogVisible: false,
            content: "",
            messageObj: {
                all: 0,
                success: 0,
                error: 0,
                title: '实况',
                content: '',
                btnShow: false,
                table: [],
                code: null,
                loading: false
            },
            dialogVisible: false,
        }
    },
    created(){
        this.timeArr.push(new Date(new Date().getTime()-1000*60*60*24))
        this.timeArr.push(new Date())        
        this.getData()
    },
    methods:{
        getData(){//获取历史记录
            if(this.timeArr.length!=2){
                this.$message.error("请选择时间")
                return
            }
            service.post("/smsSendGroup/page",{
                current: this.current,
                size: this.size,
                type: "custom",
                sendStartTime: DateGrid(this.timeArr[0],"yyyy-MM-dd HH:mm:ss"),
                sendEndTime: DateGrid(this.timeArr[1],"yyyy-MM-dd HH:mm:ss")
            }).then((res) => {
                if(res.data.state==200){
                    this.total = res.data.total
                    this.tableData = res.data.records
                }               
            })
        },
        currentChange(val){//改变当前页
            this.current = val
            this.getData()
        },
        handleBack(){//显示表格页面
            this.sendFlog = false
            this.getData()
        },
        getDateStr(str){//转换时间格式
            return DateGrid(new Date(str),"yyyy-MM-dd HH:mm:ss")
        },
        handleLook(obj){//查看
            this.content = obj.content
            this.txtdialogVisible = true
        },
        getNum(data,type){
            let num = 0
            data.forEach(element => {
                if(type=='success'){
                    if(element.reportStatus=="CM:0000"){
                        num++
                    }
                }
                if(type=="error"){
                    if(element.reportStatus=="CM:0000"){//发送成功
                        
                    }else if(element.reportStatus==-1){//发送中
                    
                    }else{//发送失败
                        num++
                    }
                }
                if(type=="middle"){
                    if(element.reportStatus=="CM:0000"){//发送成功
                        
                    }else if(element.reportStatus==-1){//发送中
                        num++
                    }else{//发送失败
                        
                    }
                }
            })
            return num
        },
        handleSeach(row){  // 查看操作
			this.messageObj.code = row.sendCode
			this.messageObj.all = 0
			this.messageObj.success = 0
			this.messageObj.error = 0
			this.messageObj.content = row.content
			this.dialogVisible = true
			this.switchMessageStatus()
		},
        switchMessageStatus(){// 循环判断短信状态
			if(!this.dialogVisible){
				return
			}
            service.post("/smsUserinfo/getMsgState",{
                group_id: this.messageObj.code
            }).then((res) => {
                if(res.data.state==200){
                    let dataArray = res.data.records
                    let flog = false
                    let successNum = 0
                    let errorNum = 0

                    dataArray.forEach((item)=>{
                        if(item.report_status == "CM:0000"){
                            item.status = "成功"
                            item.msg = ""
                            successNum++;
                        }else if(item.report_status == -1){
                            item.status = this.sendHtml
                            item.msg = ""
                            flog = true
                        }else{
                            item.status = "失败"
                            item.msg = item.report_msg
                            errorNum++
                        }
                    })
                    this.messageObj.table = dataArray
                    this.messageObj.all = dataArray.length
                    this.messageObj.success = successNum
                    this.messageObj.error = errorNum
                    if(flog){
                        setTimeout(()=>{
                            this.switchMessageStatus()
                        },5000)							
                    }else{
                        this.messageObj.loading = false
                        if(dataArray.length != successNum){
                            this.messageObj.btnShow = true
                        }else{
                            this.messageObj.btnShow = false
                        }
                    }
                }else{
                    this.messageObj.loading = false
					this.$message.error(`发送异常！`)
                }              
            })
		},      
    }
}
</script>

<style lang="less" scoped>
.txtProductSend{
    height: 100%;
    padding: 16px;
    background: #f5f6f7;
    & .box_card {
        height: 100%;
    }
    .header{
        padding-bottom: 16px;
    }
}
</style>