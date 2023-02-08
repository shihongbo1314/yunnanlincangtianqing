<template>
    <div class="content">
        <div class="contentLeft">
            <el-card class="box_card" :body-style="{height: '100%'}">          
                <div class="header">
                    <el-row>
                        <el-col :span="10">
                            标题：<el-input style="width: 300px" v-model="title" placeholder="请输入标题"></el-input>                            
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
                            <el-button v-if="kefuFlog" type="primary" plain size="medium" @click="uploadProvince">上传至省服务器</el-button>
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
                <TxtRecord :key="recordKey" :type="type" @changeRowSelect="changeRowSelect"/>
            </el-card>
        </div>       
    </div>
</template>
<script>
import { saveAs } from "file-saver"
import { txtFileSetting } from "@/minx"
import TxtRecord from "@/components/txtProduct/TxtRecord"
import service from "@/api/request"
export default {
    name: "TxtEditorEr",//未来一周
    components:{
        TxtRecord
    },
    data() {
        return {
            value: "",
            title: "",
            fileList: [],
            nullId: "",
            type: "yizhou",
            recordKey: 0,
            kefuFlog: false
        };
    },
    mixins: [txtFileSetting],
    created(){
        this.getData()
    },
    mounted() {
        let user = JSON.parse(localStorage.getItem("lcqxfzjz"))
        if(user.roleInfo.id==2){
            this.kefuFlog = true
        }
    },
    methods: {
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
            if(this.kefuFlog&&!this.nullId){
                this.$message.error("市台尚未制作")
                return
            }
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
        changeRowSelect(data){//复制
            this.value = data.content
        },
        uploadProvince(){//上传至省服务器
            // if(this.kefuFlog&&!this.nullId){
            //     this.$message.error("市台尚未制作")
            //     return
            // }
            this.$message.info("暂无此功能")
        },
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
        padding-bottom: 20px;
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
}
</style>
