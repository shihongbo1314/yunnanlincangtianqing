<template>
    <div class="content">
        <div class="contentLeft">
            <el-card class="box_card" :body-style="{height: '100%'}">          
                <div class="header">
                    <el-row>
                        <el-col :span="10">
                            标题：<el-input style="width: 300px" v-model="title" placeholder="请输入内容"></el-input>
                        </el-col>
                        <el-col :span="14" style="text-align: right">
                            <el-upload
                            style="display: inline-block;margin-right: 10px"
                            action="/"
                            accept=".txt"
                            :show-file-list="false"
                            :before-upload="beforeUpload"
                            :file-list="fileList"
                            >
                            <el-button type="primary" size="medium">上传TXT文件</el-button>
                            </el-upload>
                            <el-button type="warning" size="medium" @click="downloadTxt">下载</el-button>
                            <el-button type="success" size="medium" @click="save">保存</el-button>
                            <el-button type="primary" plain size="medium" @click="sendMessage">发送短信</el-button>
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
        <div class="contentRight">
            <el-card class="box_card" :body-style="{height: '100%'}">
                <TxtRecord :key="recordKey" :type="type" @changeRowSelect="changeRowSelect" @recordList="recordList"/>
            </el-card>
        </div>
        <el-dialog
            custom-class="messageDialog"
		    center
            title="选择发送群组"
            :visible.sync="smsDialogVisible"
            width="30%">
            <el-checkbox-group v-model="checkList">
                <el-row>
                    <el-col :span="12" style="margin-bottom: 16px" v-for="(i,index) in YBmessageTable" :key="index">
                        <el-checkbox :label="i.id" :disabled="!i.user.length">{{i.name}}{{i.user.length?'（'+i.user.length+'人）':'（暂未配置短信人员）'}}</el-checkbox>
                    </el-col>
                </el-row>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="smsDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSend">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
		:title="'群组短信发送情况'"
		:visible.sync="ybDialogVisible"
		width="30%"
		custom-class="messageDialog"
		center
		>
		<!-- 发送水库表格 -->
		<el-table
			class="statusTbale commonTable"
            stripe
            border
            :key="messageTableKey"
			:data="YBmessageTableSelect"
			style="width: 100%">
				<el-table-column
				prop="name"
				width="100"
				label="群组名称">
				</el-table-column>
				<el-table-column
				prop="status"
                align="center"
				label="发送状态">
					<template slot-scope="scope">					
						<span v-html="scope.row.status"></span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="80" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							class="warning"
							@click="handleSeach(scope.$index, scope.row)"
							v-if="scope.row.btnShow"
						>查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="text-align:center;margin-top:20px">
				<el-button type="success" @click="yb3DaySendMsgAll" :loading="YBmessageLoading" v-if="!recordBtn">发送短信</el-button>
			</div>			
		</el-dialog>
		<!-- E 预报全部水库发送弹框 -->

        <!-- S 实况预报发送弹框 -->
		<el-dialog
		:title="messageObj.name+'短信发送情况'"
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
		<!-- E 实况预报发送弹框 -->
    </div>
</template>
<script>
import { saveAs } from "file-saver"
import { txtFileSetting } from "@/minx"
import TxtRecord from "@/components/txtProduct/TxtRecord"
import service from "@/api/request"
export default {
    name: "TxtEditorSi",//实况通报
    components:{
        TxtRecord
    },
    data() {
        return {
            value: "",
            title: "",
            fileList: [],
            nullId: "",
            type: "shikuang",
            recordKey: 0,
            smsDialogVisible: false,
            YBmessageTable: [],
            checkList: [],
            YBmessageTable: [],
            YBmessageLoading: false,
            sendHtml: "<div class='cont'><div class='twill'></div><div class='info'>发送中</div></div>",
            dialogVisible: false,
            messageObj: {
                all: 0,
                success: 0,
                error: 0,
                name: "-",
                title: '实况',
                content: '',
                btnShow: false,
                table: [],
                code: null,
                loading: false
            },
            messageTableKey: 1,
            YBmessageTableSelect: [],
            ybDialogVisible: false,
            recordBtn: false
        };
    },
    mixins: [txtFileSetting],
    created(){
        this.getData()
    },
    mounted() {
        this.getDivision()
    },
    methods: {
        getDivision() {//获取区划数据   
            service.post("/baseUserRegion/list").then((res) => {
                if(res.data.state==200){
                    this.YBmessageTable = []
                    res.data.records.forEach((item) => {
                        if (item.parentId == 1) {
                            item.user = []
                            this.YBmessageTable.push(item)
                        }
                    })
                    this.getUserData()
                }               
            })
        },
        getUserData(){//获取群组人员数据
            service.post("/smsUserinfo/list",{
                type: 1
            }).then((res) => {
                if(res.data.state==200){
                    res.data.records.forEach((item) => {
                        this.YBmessageTable.forEach(item1=>{
                            if(item.dataId==item1.id){
                                item1.user.push(item)
                            }
                        })
                    })
                }               
            })
        },
        getData(){//获取今天最新保存的记录
            let roleId = JSON.parse(localStorage.getItem("lcqxfzjz")).roleInfo.id
            service.post("/productWeatherWeek/getLastWeather",{
                roleId: roleId,
                type: this.type
            }).then((res) => {
                if(res.data.state==200){
                    this.nullId = res.data.records[0].id
                    this.value = res.data.records[0].content
                    this.title = res.data.records[0].title
                }  
                this.recordKey++           
            })
        },
        save(){//保存
            let roleId = JSON.parse(localStorage.getItem("lcqxfzjz")).roleInfo.id
            if(!this.title) {
                this.$message.error("标题不能为空");
                return;
            }
            if(!this.value) {
                this.$message.error("内容不能为空");
                return;
            }
            
            service.post("/productWeatherWeek/saveOrUpdate",{
                roleId: roleId,
                type: this.type,
                content: this.value,
                title: this.title,
                id: this.nullId
            }).then((res) => {
                if(res.data.state==200){
                    this.$message.success("保存成功")
                }  
                this.getData()        
            })
        },
        downloadTxt() {//下载txt文件 
            if(!this.title) {
                this.$message.error("标题不能为空");
                return;
            }
            if(!this.value) {
                this.$message.error("内容不能为空");
                return;
            }       
            let strData = new Blob([this.value], { type: "text/plain;charset=utf-8" })
            saveAs(strData, `${this.title}.txt`)
        },
        changeRowSelect(data){//切换显示的表格数据
            this.value = data.content
        },
        sendMessage(){//发送短信
            if (!this.nullId) {
                this.$message.error("请先完成保存")
                return
            }
            this.checkList = []
            this.smsDialogVisible = true
        },
        handleSend(){//选择群组后发送
            if(!this.checkList.length) {
                this.$message.error("请至少选择一个短信群组")
                return
            }
            this.YBmessageTableSelect = []
            this.YBmessageTable.forEach((item)=>{
                if(this.checkList.includes(item.id)){
                    item.status = this.sendHtml
                    item.btnShow = false
                    item.content = ""
                    item.all = 0
                    item.success = 0
                    item.error = 0
                    this.YBmessageTableSelect.push(item)
                }				
			})  
            this.recordBtn = false          
            this.ybDialogVisible = true
            this.smsDialogVisible = false
            this.yb3DaySendMsgAll()
        },
		yb3DaySendMsgAll(){ // 发送短信
			this.YBmessageCode = []
			this.YBmessageNum = 0

            this.YBmessageLoading = true
            service.post("/smsUserinfo/sendManySms",{
                content: this.value,
                type: 1,
                textInfoId: this.nullId,
                groupDataid: this.checkList.join(","),
                functionType: "week"
            }).then((res) => {
                if(res.data.state==200){
                    let dataArray = res.data.records;                    
                    for(var j=0;j<this.YBmessageTableSelect.length;j++){
                        let flog = false
                        for(var i=0;i<dataArray.length;i++){
                            if(dataArray[i].other == this.YBmessageTableSelect[j]["id"]){                                
                                if(dataArray[i].state==200){
                                    this.YBmessageCode.push(dataArray[i].records)
                                    this.YBmessageTableSelect[j]["code"] = dataArray[i].records
                                    this.YBmessageTableSelect[j]["status"] = this.sendHtml
                                    this.YBmessageTableSelect[j]["btnShow"] = true
                                }else{
                                    this.YBmessageTableSelect[j]["status"] = dataArray[i].message
                                }
                                flog = true
                            }
                        }
                        if(!flog){
                            this.YBmessageTableSelect[j]["status"] = "暂未配置短信人员"
                        }
                    }
                    this.messageTableKey++
                    if(this.YBmessageCode.length != 0){
                        setTimeout(()=>{
                            this.ybMessageStatus();
                        },5000)	
                    }else{
                        this.YBmessageLoading = false
                    }
                    this.recordKey++ 
                }else{
                    this.YBmessageLoading = false
                    this.$message.error("发送异常！")
                    this.YBmessageTableSelect.forEach((item)=>{
                        item.status = "失败"
                    })
                    this.messageTableKey++						
                }                
            })
		},
		ybMessageStatus(){// 循环判断短信状态
			if(!this.ybDialogVisible){
				return
			}
			if(this.YBmessageCode.length == this.YBmessageNum){
				let flog = false
				for(let i=0;i<this.YBmessageTableSelect.length;i++){				
					if(this.YBmessageTableSelect[i].all){
						let all = this.YBmessageTableSelect[i].success+this.YBmessageTableSelect[i].error;
						if(all!=this.YBmessageTableSelect[i].all){
							flog = true
						}else{
							if(this.YBmessageTableSelect[i].success == this.YBmessageTableSelect[i].all){
								this.YBmessageTableSelect[i]["status"] = "<span style='color:#00DE65'>成功</span>"
							}else{
								this.YBmessageTableSelect[i]["status"] = "<span style='color:#FF5454'>失败"+this.YBmessageTableSelect[i].error+"</span>"
							}						
						}
					}					
				}
                this.messageTableKey++
				if(flog){
					this.YBmessageNum = 0
					setTimeout(()=>{
						this.ybMessageStatus()
					},5000)	
				}else{
					this.YBmessageLoading = false
				}
			}else{
				let code = this.YBmessageCode[this.YBmessageNum];
				for(let i=0;i<this.YBmessageTableSelect.length;i++){
					if(this.YBmessageTableSelect[i].code==code){
						if(this.YBmessageTableSelect[i].all){
							let all=this.YBmessageTableSelect[i].success+this.YBmessageTableSelect[i].error;
							if(all==this.YBmessageTableSelect[i].all){//判断该组是否发送完成
								this.YBmessageNum++;
								this.ybMessageStatus();
								return
							}
						}
						break
					}
				}
                service.post("/smsUserinfo/getMsgState",{
                    group_id: code
                }).then((res) => {
                    if(res.data.state==200){
                        let dataArray = res.data.records
                        let successNum = 0
                        let errorNum = 0
                        dataArray.forEach((item)=>{
                            if(item.report_status=="CM:0000"){//发送成功
                                successNum++
                            }else if(item.report_status==-1){//发送中
                            
                            }else{//发送失败
                                errorNum++
                            }
                        })
                        for(let j=0; j<this.YBmessageTableSelect.length; j++){
                            if(this.YBmessageTableSelect[j].code == code){
                                this.YBmessageTableSelect[j].all = dataArray.length;
                                this.YBmessageTableSelect[j].success = successNum;
                                this.YBmessageTableSelect[j].error = errorNum;
                                break
                            }
                        }
                        this.YBmessageNum++
                        this.ybMessageStatus()
                    }               
                })
			}
		},
        // 循环判断短信状态
		switchMessageStatus(){
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
        // 查看操作
		handleSeach(index, row){
			this.messageObj.name = row.name
			this.messageObj.title = "预报"
			this.messageObj.code = row.code
			this.messageObj.all = 0
			this.messageObj.success = 0
			this.messageObj.error = 0
			this.messageObj.content = this.value
			this.messageObj.btnShow = false
			this.dialogVisible = true
			this.switchMessageStatus()
		},
        recordList(data){//查看记录
            this.YBmessageCode = []
			this.YBmessageNum = 0

            this.YBmessageTableSelect = []
            data.forEach((item)=>{   
                let dataArray = item.detailedList
                let successNum = 0
                let errorNum = 0
                dataArray.forEach((item)=>{
                    if(item.reportStatus=="CM:0000"){//发送成功
                        successNum++
                    }else if(item.reportStatus==-1){//发送中
                    
                    }else{//发送失败
                        errorNum++
                    }
                })
                item.name = item.userRegion.name             
                item.status = this.sendHtml
                item.btnShow = true
                item.content = item.content
                item.all = dataArray.length
                item.success = successNum
                item.error = errorNum
                item.code = item.sendCode
                this.YBmessageCode.push(item.sendCode)
                this.YBmessageTableSelect.push(item)			
			})    
            let flog = false
            for(let i=0;i<this.YBmessageTableSelect.length;i++){               
                let all = this.YBmessageTableSelect[i].success+this.YBmessageTableSelect[i].error
                if(all!=this.YBmessageTableSelect[i].all){
                    flog = true
                }else{
                    if(this.YBmessageTableSelect[i].success == this.YBmessageTableSelect[i].all){
                        this.YBmessageTableSelect[i]["status"] = "<span style='color:#00DE65'>成功</span>"
                    }else{
                        this.YBmessageTableSelect[i]["status"] = "<span style='color:#FF5454'>失败"+this.YBmessageTableSelect[i].error+"</span>"
                    }						
                }                				
            }
            this.messageTableKey++
            if(flog){
                this.YBmessageNum = 0
                setTimeout(()=>{
                    this.ybMessageStatus()
                },5000)	
            }else{
                this.YBmessageLoading = false
            }
            this.recordBtn = true
            this.ybDialogVisible = true
        }
    }
};
</script>

<style lang="less" scoped>
.content {
    height: 100%;
    font-size: 14px;
    padding: 16px;
    display: flex;
    & .box_card {
        height: 100%;
    }
    .contentLeft {
        height: 100%;
        flex: 1;
    }
    .header {
        padding-bottom: 16px;
    }
    .contentRight {
        height: 100%;        
        width: 600px;
        padding-left: 16px;
    }
    .textareaClass {
        height: calc(100% - 52px);
        /deep/ textarea {
            resize: none;
            font-size: 18px;
            height: 100% !important;
        }
    }
     /**动态条纹**/
    div /deep/ .statusTbale .cont {
        width: 100%;
        position: relative;
    }
    div /deep/ .statusTbale .info {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    div /deep/ .statusTbale .twill {
        width: 100%;
        height: 15px;
        border-radius: 20px;
        background-size: 50px 50px;
    /*	background-image: linear-gradient(-45deg,#409EFF 0,#409EFF 25%,white 0,white 50%,#409EFF 0,#409EFF 75%,white 0,white 100%);*/
        background-image: linear-gradient(-45deg,rgba(67,231,167,0.5) 0,rgba(67,231,167,0.5) 5%,white 0,white 10%,rgba(67,231,167,0.5) 0,rgba(67,231,167,0.5) 15%,white 0,white 20%,rgba(67,231,167,0.5) 0,rgba(67,231,167,0.5) 25%,white 0,white 30%,rgba(67,231,167,0.5) 0,
        rgba(67,231,167,0.5) 35%,white 0,white 40%,rgba(67,231,167,0.5) 0,rgba(67,231,167,0.5) 45%,white 0,white 50%,rgba(67,231,167,0.5) 0,rgba(67,231,167,0.5) 55%,white 0,white 60%,rgba(67,231,167,0.5) 0,
        rgba(67,231,167,0.5) 65%,white 0,white 70%,rgba(67,231,167,0.5) 0,rgba(67,231,167,0.5) 75%,white 0,white 80%,rgba(67,231,167,0.5) 0,rgba(67,231,167,0.5) 85%,white 0,white 90%,rgba(67,231,167,0.5) 0,
        rgba(67,231,167,0.5) 95%,white 0,white 100%);
        animation: move 10s linear infinite;
    }
    @keyframes move {
        form{
            background-position-x: 0px;
        }
        to{
            background-position-x: 300px;
        }
    }
}
</style>
