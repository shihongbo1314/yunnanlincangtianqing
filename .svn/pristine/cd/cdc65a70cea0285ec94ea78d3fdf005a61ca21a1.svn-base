<template>
    <el-card class="box_card">
        <div class="header">
            <el-row>
                <el-col :span="12">  
                    姓名：<el-input v-model="groupName" style="display:inline-block;width: 200px;margin-right: 10px" placeholder="请输入姓名"></el-input>                         
                    <el-button type="primary" size="medium" @click="getData()">查询</el-button>
                    <el-button type="success" size="medium" @click="handleAdd">添加</el-button>
                </el-col>
                <!-- <el-col :span="12" style="text-align:right">
                    <el-button size="medium">导入</el-button>
                    <el-button size="medium">导出</el-button>
                </el-col> -->
            </el-row>  
        </div>
        <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%"
            class="commonTable">
            <el-table-column label="序号" align="center" width="70">
                <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * pageSize + 1}} </span></template>
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="手机号">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱">
            </el-table-column>
            <el-table-column
            prop="type"
            label="所属群组">
                <template slot-scope="scope">
                    {{getGroup(scope.row)}}
                </template>
            </el-table-column>
            <el-table-column
            prop="state"
            label="接收状态" width="100">
             <template slot-scope="scope">
                <el-switch
                    @change="updateState(scope.row)"
                    v-model="scope.row.state"
                    active-value="2"
                    inactive-value="1"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch> 
            </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    class="warning"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="margin-top: 20px;text-align:right"
            @size-change="getData"
            @current-change="getData"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <!-- 添加/修改对话框 -->
        <el-dialog
            :title="dialogStatus"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form ref="form" :rules="rules" :model="form" label-width="110px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input type="tel" v-model="form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="mail" v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="接收状态" prop="state">
                    <el-switch
                        v-model="form.state"
                        active-value="2"
                        inactive-value="1"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch> 
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleFun">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script>
import request from '@/api/request'
import {DateGrid} from '../../utils'
export default {
    name: "PropleGroup",
    data(){
        return{
            name:"",
            currentPage: 1,
            pageSize: 10,
            total : 0,
            tableData:[],
            dialogStatus: "添加",
            dialogVisible: false,
            form: {
                name: "",
                phone: "",
                email: "",
                state: 1,
                id : null,
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                phone: [
                    {required: true,  message: '请输入手机号', trigger: 'blur' },
                    {
                        pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        message: '请输入正确的手机号码',
                    },
                ],
                email: [
                    {required: true,  message: '请输入邮箱', trigger: 'blur' },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change'],
                    }
                ]
            },
            groupData: {},
            groupName: "",
            division: [],
            division1: []
        }
    },
    computed:{
        total(){
            return this.tableData.length
        }
    },
    mounted(){
        this.$bus.$on('setGroupData',this.setGroupData)
        this.$bus.$on('deleteTableData',this.deleteTableData)
    },
    created(){
        this.getDivision()        
    },
    methods: {
        getDivision() {//获取县区局区划数据   
            request.post("/baseUserRegion/list").then((res) => {
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
            request.post("/basinInfo/basinInfoList").then((res) => {
                if(res.data.state==200){
                    this.division1 = res.data.records                   
                }  
                this.getData()         
            })
        },
        getData(page){//查询数据
            if(!page){
                page=1;
            }
            this.currentPage = page;
            this.tableData = []
            request.post('smsUserinfo/page', {
                dataId : this.groupData.id,
                type : this.groupData.type,
                name : this.groupName,
                size:this.pageSize,
                current:this.currentPage
            }).then((res) => {
                if (res.data.state == 200) {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                }
            });
        },
      setGroupData(data){//群组数据
        this.groupData = data
        this.getData()
      },
    deleteTableData(name){//删除群组时将群组的数据也一起删除
        this.allData.forEach((item,index)=>{
            if(item.group.includes(name)){
                this.allData.splice(index, 1)
            }
        })
        this.groupName = ""
        this.getData()
    },
    updateState(row){
        this.form = JSON.parse(JSON.stringify(row));
        this.dialogStatus = "修改"
        this.handleFun();
    },
    handleFun(){
        let params = this.form;
        if(this.dialogStatus == "添加"){
            delete params.id;
        }

        request.post('smsUserinfo/saveOrUpdate', params).then((res) => {
            if (res.data.state == 200) {
                this.$message.success(this.dialogStatus + "成功")
                this.dialogVisible = false;
                this.getData(this.currentPage)
            }else{
                this.$message.error(this.dialogStatus + "失败")
            }
        });
    },
    handleAdd(){
        if(this.groupData==""){
            this.$message.error("请在左侧群组中选中要添加人员的群组")
            return
        }
        this.form = {
            dataId : this.groupData.id,
            type : this.groupData.type,
            name: "",
            phone: "",
            email: "",
            state: 1,
            id : null,
        },
        this.dialogVisible = true
    },
    handleEdit(_, row){//修改
        this.form = JSON.parse(JSON.stringify(row));
        this.dialogStatus = "修改"
        this.dialogVisible = true
    },
    handleDelete(index, rows){//删除
        this.$confirm(`确定要删除吗？`, '提示', {
            type: 'warning'
        }).then(() => {
            request.post('smsUserinfo/delete', {id:rows.id}).then((res) => {
                if (res.data.state == 200) {
                    this.$message.success("删除成功")
                    this.dialogVisible = false;
                    this.getData()
                }else{
                    this.$message.error("删除失败")
                }
            });
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
    },    
}
</script>

<style lang="less" scoped>
.box_card{
    height: 100%;
    font-size: 14px;
    .header{
        padding-bottom: 20px;
    }
    .red {
        color: #F56C6C;
    }
    .warning{
        color: #E6A23C;
    }
}
</style>