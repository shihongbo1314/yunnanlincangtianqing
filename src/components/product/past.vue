<template>
    <div class="pastContent">
        <div class="past_top">
            审核状态 <el-select v-model="value" placeholder="请选择" style="width: 120px;margin-right: 40px;font-size: 16px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            入库时间选择 <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" style="width: 120px;margin:0 40px;font-size: 16px" @click="getData(1)">搜索</el-button>
            <el-button v-if="$store.state.productType" plain icon="el-icon-plus" v-loading="loading" style="font-size: 16px" @click="addProduct">手动制作产品</el-button>

        </div>
        <div class="past_bottom">
            <el-table :data="tableData" style="width: 100%;font-size: 16px" :row-class-name="tableRowClassName">
                <el-table-column type="index" width="100" label="序号" align="center">
                </el-table-column>
                <el-table-column prop="name" label="产品名称">
                </el-table-column>
                <el-table-column prop="saveTime" label="入库时间" align="center">
                </el-table-column>
                <el-table-column prop="state" label="产品状态" align="center">
                    <template #default="scope">
                        <template v-if="scope.row.state == 1">
                            <span>已发布</span>
                        </template>
                        <template v-else-if="scope.row.state == 2">
                            <span style="color:#3E87F4">待发布</span>
                        </template>
                        <template v-else-if="scope.row.state == 3">
                            <span style="color:#3E87F4">待审核</span>
                        </template>
                        <template v-else-if="scope.row.state == 4">
                            <span style="color:#3E87F4">待制作</span>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
                        <el-button size="mini" type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 16px;text-align:center" @size-change="getData(1)"
                @current-change="getData" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="查看专报" :visible.sync="dialogVisible" width="80%">
            <iframe :src="iframeSrc" style="width: 100%; height: 800px;  border: none;"></iframe>
        </el-dialog>
    </div>
</template>

<script>
import {DateGrid} from '@/api/date.js'
import requestProduct from "@/api/requestProduct.js";
export default {
    watch: {
        '$store.state.productTypeNum': function () {
            this.getData();
        }
    },
    data() {
        return {
            loading:false,
            num : 0,
            iframeSrc : null,
            dialogVisible:false,
            pageSize : 10,
            currentPage : 1,
            total : 0,
            options: [{
                value: '',
                label: '全部'
            }, {
                value: '1',
                label: '待审核'
            }, {
                value: '2',
                label: '已审核'
            }],
            value: '',
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            tableData: [],
        }
    },
    created() {
        this.getData();
    },
    methods: {
        addProduct(){
            let productType = this.$store.state.productType;
            if(productType ==null){
                return;
            }
            if(this.loading){
                return;
            }
            this.loading = true;
            requestProduct.post('workSheet/add.do', {
                productTypeId : productType.id,
                time : DateGrid(new Date(), 'yyyy-MM-dd')
            }).then(e=>{
                this.loading = false;
                console.log(e)
                if(e.data.state == 1){
                    this.$message.success("制作成功")
                    this.getData();
                }else{
                    this.$message.error("制作失败")
                }
            })
        },
        getData(page) {
            if(page == null){
                page = 1;
            }
            this.currentPage = page;
            let type = null;
            if(this.$store.state.productType){
                type = this.$store.state.productType.typeName;
            }
            requestProduct.post('generalProductInfo/listByPage.do', {
                name : type,
                regionId : 1,
                state:'1,2,3,4',
                pageSize : this.pageSize,
                currPage : this.currentPage
            }).then(e=>{
                this.total = e.data.total;
                this.tableData = e.data.list;
            })
        },
        handleDelete(row){
            requestProduct.post('workSheet/deleteProduct.do', {
                productInfoId : row.id
            }).then(e=>{
                if (e.data.state == 1) {
                    this.$message.success("删除成功")
                    this.getData()
                } else {
                    this.$message.error("删除失败")
                }
            })
        },
        handleEdit(row){
            this.num++;
            this.iframeSrc = this.$store.state.productURL + "html/main/productMake/GeneralProductInfoEdit.html?id=" + row.id + "&num=" + this.num;
            this.dialogVisible = true;
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 0) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
}
</script>

<style>
.pastContent {
    background: #fff;
}

.past_top {
    height: 56px;
    line-height: 56px;
    padding-left: 24px;
    border-bottom: 1px solid #D6D9DD;
}

.el-table .warning-row {
    background: #fff;
}

.el-table .success-row {
    background: rgba(245, 246, 247, 0.50);
}

.past_bottom {
    padding: 16px;
}
</style>