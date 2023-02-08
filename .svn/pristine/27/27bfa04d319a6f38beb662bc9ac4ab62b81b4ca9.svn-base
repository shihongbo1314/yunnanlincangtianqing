<template>
    <div class="recordDiv">
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
                    prop="title"
                    align="center"
                    label="标题">
                </el-table-column>
                <el-table-column
                    prop="time"
                    align="center"
                    width="100"
                    label="时间">
                    <template slot-scope="scope">
                        {{getTimeStr(scope.row.time)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="state"
                    align="center"
                    width="80"
                    label="状态">
                    <template slot-scope="scope">
                        <template v-if="type=='zhoumo'||type=='yizhou'||type=='zhuchi'">
                            <template v-if="scope.row.state=='send'">
                                <span style="color: #67C23A;font-size: 12px">已上传</span>
                            </template>
                            <template v-else>
                                <span style="color: #909399;font-size: 12px">未上传</span>
                            </template>
                        </template>
                        <template v-if="type=='qitian'||type=='shikuang'||type=='shuidianzhan'">
                            <template v-if="scope.row.state=='send'">
                                <el-button class="btnText" @click="getMessageData(scope.row)" type="text">已发送</el-button>
                            </template>
                            <template v-else>
                                <span style="color: #909399;font-size: 12px">未发送</span>
                            </template>
                        </template>
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
                            icon="el-icon-document-copy"
                            class="success"
                            @click="handleCopy(scope.row)">复制</el-button>
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
            :visible.sync="dialogVisible"
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
							@click="handleSeach(scope.row.data)"
						>查看</el-button>
					</template>
				</el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import service from "@/api/request"
import {DateGrid} from "@/utils"
export default {
    name: "TxtRecord",//文本记录
    props: ["type"],
    data(){
        return {
            dialogVisibleRecord: false,
            dialogVisible: false,
            tableData: [],
            current: 1,
            size: 15,
            total: 0,
            title: "",
            content: "",
            tableDataRecord: []
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){//获取历史记录
            let user = JSON.parse(localStorage.getItem("lcqxfzjz"))
            service.post("/productWeatherWeek/page",{
                current: this.current,
                size: this.size,
                roleId: user.roleInfo.id,
                type: this.type
            }).then((res) => {
                if(res.data.state==200){
                    this.total = res.data.total
                    this.tableData = res.data.records
                }               
            })
        },
        getTimeStr(str){//转换时间格式
            return str.substr(0,4)+"-"+str.substr(4,2)+"-"+str.substr(6,2)
        }, 
        getDateStr(str){//转换时间格式
            return DateGrid(new Date(str),"yyyy-MM-dd HH:mm:ss")
        },        
        currentChange(val){//改变当前页
            this.current = val
            this.getData()
        },
        handleCopy(obj){//复制
            this.$emit("changeRowSelect",obj)
        },
        handleLook(obj){//查看
            this.title = obj.title
            this.content = obj.content
            this.dialogVisible = true
        },
        getMessageData(data){//获取短信记录
            let type = 1
            if(this.type=="shuidianzhan"){
                type = 2
            }
            this.tableDataRecord = []
            service.post("/smsSendGroup/list",{
                type: type,
                functionType: "week",
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
                            if(type==1){
                                names.push(item.userRegion.name)
                            }else{
                                names.push(item.basinInfo.name)
                            }                            
                        })
                        obj.name = names.join(" ")
                        this.tableDataRecord.push(obj)
                    }
                    this.dialogVisibleRecord = true
                }               
            })
        },
        handleSeach(data){//查询短信发送详情
            this.$emit("recordList",data)
        }
    }
}
</script>

<style lang="less" scoped>
.recordDiv{
    height: 100%;
    .tableDiv{
        height: calc(100% - 40px);
    }
}
.header{
    position: relative;
    h3{
        margin-top: 0;
    }  
    .cancelBtn{
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }
}
.success{
    color: #67C23A;
}
.dialogDiv{
    max-height: 500px;
    overflow: auto;
}
.btnText{
    text-decoration: underline;
}
</style>