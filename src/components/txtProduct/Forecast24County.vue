<template>
    <div class="content" v-loading="loading">
        <div class="content_left" v-if="!quxianFlog">
            <el-card class="box_card">
                <ul>
                    <li v-for="item in division" :key="item.id">
                        <el-button
                        :type="selectCode == item.id ? 'primary' : ''"
                        class="cBtn"
                        round
                        size="medium"
                        @click="countyChange(item.id)"
                        >{{ item.name }}</el-button
                        >
                    </li>
                </ul>
            </el-card>
        </div>
        <div class="content_center">
            <el-card class="box_card">
                <div class="header">
                    <el-row>
                        <el-col :span="12">
                            标题：<el-input style="width: 200px" v-model="title" placeholder="请输入标题"></el-input>
                        </el-col>
                        <el-col :span="12" style="text-align: right">
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
                        <el-button v-if="quxianFlog" type="primary" plain size="medium" @click="handleSend">发送短信</el-button>
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
        <div class="content_right">
            <el-card class="box_card">
                <div class="header">
                    <h3>历史记录</h3>                      
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
                            prop="timeContent"
                            align="center"
                            label="标题">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            align="center"
                            width="130"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            align="center"
                            width="80"
                            label="短信状态">
                            <template slot-scope="scope">
                                <template v-if="scope.row.state=='send'">
                                    <el-button class="btnText" @click="getMessageData(scope.row)" type="text">已发送</el-button>
                                </template>
                                <template v-else>
                                    <span style="color: #909399;font-size: 12px">未发送</span>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                width="80"
                                label="操作">
                                <template slot-scope="scope">  
                                    <el-button
                                    size="mini"
                                    type="text"
                                    icon="el-icon-search"
                                    @click="handleLook(scope.row)">查看</el-button>     
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
                <el-dialog
                    :title="title"
                    :visible.sync="textdialogVisible"
                    :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    width="30%">
                    <div class="dialogDiv">
                        <el-input type="textarea" v-model="content" :autosize="true" :readonly="true" resize="none" style="font-size: 16px"></el-input>
                    </div>
                </el-dialog>
            </el-card>
        </div>
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
        <el-dialog
            title="短信发送记录"
            :visible.sync="dialogVisibleRecord"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            custom-class="messageDialog"
		    center
            width="30%">
            <div class="dialogDiv">
                <el-table
                    class="commonTable"
                    stripe
                    border
                    :data="tableDataRecord"
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="群组名称">
                    </el-table-column>
                    <el-table-column
                    prop="saveTime"
                    label="时间">
                    <template slot-scope="scope">
                        {{getDateStr(scope.row.saveTime)}}
                    </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							class="warning"
							@click="handleSeachRecord(scope.row.data)"
						>查看</el-button>
					</template>
				</el-table-column>
                </el-table>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import { saveAs } from "file-saver"
import { mapState } from "vuex"
import { txtFileSetting } from "@/minx"
import service from "@/api/request"
export default {
    name: "Forecast24County",
    data() {
        return {
            value: "",
            selectCode: 2,
            fileList: [],
            division: [],
            linCangData: [],
            nullId: "",
            textdialogVisible: false,
            tableData: [],
            current: 1,
            size: 15,
            total: 0,
            loading: false,
            title: "",
            content: "",
            quxianFlog: false,
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
            dialogVisibleRecord: false,
            tableDataRecord: [],
            recordBtn: false
        }
    },
    mixins: [txtFileSetting],
    computed: {
        ...mapState(["regionList", "weatherPheList"]),
    },
    mounted() {
        let user = JSON.parse(localStorage.getItem("lcqxfzjz"))
        if(user.roleInfo.id==4){
            this.quxianFlog = true
            this.YBmessageTableSelect.push(user.userRegion)
            this.YBmessageTableSelect[0].user = []
            this.getUserData()
            this.countyChange(user.userRegion.id)
        }else{
            this.getDivision()
        }        
    },
    methods: {     
        getUserData(){//获取群组人员数据
            service.post("/smsUserinfo/list",{
                type: 1
            }).then((res) => {
                if(res.data.state==200){
                    res.data.records.forEach((item) => {
                        this.YBmessageTableSelect.forEach(item1=>{
                            if(item.dataId==item1.id){
                                item1.user.push(item)
                            }
                        })
                    })
                }               
            })
        },
        getDivision() {//获取区划数据   
            service.post("/baseUserRegion/list").then((res) => {
                if(res.data.state==200){
                    res.data.records.forEach((item) => {
                        if (item.parentId == 1) {
                            this.division.push(item)
                        }
                    })
                    this.countyChange(this.division[0].id)
                }               
            })
        },
        countyChange(code) {//切换县区            
            this.selectCode = code
            this.getGridData()
            this.getData()
        },
        getGridData() {
            let regionId = JSON.parse(localStorage.getItem("lcqxfzjz")).userRegion.id;

            this.loading = true
            service.post("/productWeatherTown/getTownWeather",{
                regionId: this.selectCode,
                makeRegion: regionId
            }).then((res) => {
                this.loading = false
                this.value = ""
                if (res.data.state == 200) {
                    this.linCangData = res.data.records
                    this.nullId = this.linCangData.id
                    this.title = this.linCangData.timeContent
                    this.value = this.linCangData.content
                }           
            })
        },
        getData(){//获取历史记录
            service.post("/productWeatherTown/page",{
                current: this.current,
                size: this.size,
                regionId: this.selectCode
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
        save() {//保存
            let regionId = JSON.parse(localStorage.getItem("lcqxfzjz")).userRegion.id
            //获取当前时间yyyy-mm-dd
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let time = `${year}年${month}月${day}日`
            
            if (!this.value) {
                this.$message.error("内容不能为空")
                return;
            }
            if (!this.title) {
                this.$message.error("标题不能为空")
                return;
            }
            let params = {
                regionId: this.selectCode,
                makeRegion: regionId,
                content: this.value,
                timeContent: this.title
            }
            if(this.nullId){
                params.id = this.nullId
            }else{
                params.time = time
            }
            service.post("/productWeatherTown/updateTownWeather",params).then((res) => {
                if (res.data.state == 200) {
                    this.$message.success("保存成功")
                }
                this.getGridData()
                this.getData()          
            })
        },
        downloadTxt() {//下载txt文件            
            let txtName = this.linCangData.userRegion.name
            if(!this.value) {
                this.$message.error("内容不能为空")
                return
            } 
            let str = this.value
            let strData = new Blob([str], { type: "text/plain;charset=utf-8" })
            saveAs(strData, `未来24小时${txtName}乡镇预报.txt`)
        },
        handleLook(obj){//查看
            this.title = obj.timeContent
            this.content = obj.content
            this.textdialogVisible = true
        },
        handleSend(){//选择群组后发送
            if(this.YBmessageTableSelect[0].user.length==0){
                this.$message.error("该县局短信群组下暂无人员！")
                return
            }
            this.YBmessageTableSelect.forEach((item)=>{                
                item.status = ""
                item.btnShow = false
                item.content = ""
                item.all = 0
                item.success = 0
                item.error = 0                    			
			})    
            this.recordBtn = false        
            this.ybDialogVisible = true
        },
		yb3DaySendMsgAll(){ // 发送短信
			this.YBmessageCode = []
			this.YBmessageNum = 0

            this.YBmessageLoading = true
            service.post("/smsUserinfo/sendManySms",{
                content: this.value,
                type: 1,
                textInfoId: this.nullId,
                groupDataid: this.selectCode,
                functionType: "town"
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
                    this.getData()
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
		handleSeach(index, row){  // 查看操作
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
        getMessageData(data){//获取短信记录
            this.tableDataRecord = []
            service.post("/smsSendGroup/list",{
                type: 1,
                functionType: "town",
                dataId: data.id
            }).then((res) => {
                if(res.data.state==200){
                    let dataObj = {}
                    res.data.records.forEach(element => {
                        if(!dataObj[element.saveTime]){
                           dataObj[element.saveTime] = []
                        }
                        dataObj[element.saveTime].push(element) 
                    })
                    for(let i in dataObj){
                        let obj = {
                            content: dataObj[i][0]["content"],
                            saveTime: dataObj[i][0]["saveTime"],
                            sendCode: dataObj[i][0]["sendCode"],
                            data: dataObj[i]
                        }
                        let names = []
                        dataObj[i].forEach(item=>{                            
                            names.push(item.userRegion.name)                           
                        })
                        obj.name = names.join(" ")
                        this.tableDataRecord.push(obj)
                    }
                    this.dialogVisibleRecord = true
                }               
            })
        },
        handleSeachRecord(data){//查询短信发送详情
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
        },
        getDateStr(str){//转换时间格式
            return DateGrid(new Date(str),"yyyy-MM-dd HH:mm:ss")
        }
    },
};
</script>

<style lang="less" scoped>
.content {
    height: 100%;
    display: flex;
    padding: 16px;
    font-size: 14px;
    & .box_card {
        height: 100%;
    }
    .content_left {
        width: 200px;
        padding-right: 16px;
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
            li {
                margin-bottom: 20px;
                position: relative;
                .cBtn {
                    width: 100%;
                    font-size: 16px;
                }
                
                span {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
                span.no {
                    color: rgb(255, 72, 72);
                }
                span.yes {
                    color: rgb(44, 202, 123);
                }
            }
        }
    }
    .content_center {
        flex: 1;
        .header {
            padding-bottom: 20px;
        }
        .textareaClass {
            /deep/ textarea {
                resize: none;
                font-size: 18px;
            }
        }
    }
    .content_right{        
        width: 600px;
        padding-left: 16px;
        .header{
            h3{
                margin-top: 0;
            }  
        }
        .tableDiv{
            height: calc(100% - 40px);
            overflow: auto;
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
    .btnText{
        text-decoration: underline;
    }
}
</style>