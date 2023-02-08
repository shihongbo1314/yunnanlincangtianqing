<template>
    <div>
        <el-table :data="tableData" :show-header="false" style="width: 100%;font-size: 16px">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-button style="margin-left:10px"  type="primary" @click="handleEdit(props.row)">修改</el-button>
                    <el-button  type="primary" @click="peizhimuban(props.row)">配置模板</el-button>
                    <el-button  type="danger" @click="handleDelete(props.row)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="typeName" label="产品名称">
            </el-table-column>
            <el-table-column prop="audit" label="审核状态" align="center" width="80px">
                <template #default="scope">
                    <el-checkbox :value="scope.row.audit" v-model="scope.row.audit"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="state" label="产品状态" align="center" width="80px">
                <template #default="scope">
                    <template v-if="scope.row.state === '1'">
                        <el-tooltip class="item" effect="dark" content="完成时间" placement="bottom">
                            <icon name="success" scale="2.7" style="vertical-align: middle;"></icon>
                        </el-tooltip>
                    </template>
                    <template v-else-if="scope.row.state === '2'">
                        <el-tooltip class="item" effect="dark" content="失败原因" placement="bottom">
                            <icon name="fail" scale="2.7" style="vertical-align: middle;"></icon>
                        </el-tooltip>
                    </template>
                    <template v-else>
                        <span class="emptySpan"></span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="往期材料" align="center" width="80px">
                <template #default="scope">
                    <span class="pastSpanBtn" @click="handleSearch(scope.row)">查看往期</span>
                </template>
            </el-table-column>
        </el-table>
        <el-button style="width: 100%;" type="success" @click="handleAdd">添加新产品</el-button>
        <!-- 添加/修改对话框 -->
        <el-dialog :title="dialogStatus" :visible.sync="dialogVisible" width="360px">
            <el-form ref="form" :rules="rules" :model="form" label-width="110px">
                <el-form-item label="产品名称" prop="name">
                    <el-input v-model="form.typeName" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item label="触发方式" prop="phone">
                    <el-select v-model="form.triggerType" placeholder="请选择">
                        <el-option v-for="(item, index1) in triggerType" :key="index1" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form.triggerType == '时间'" label="触发时间" prop="email">
                    <el-select v-model="form.triggerTimeType" placeholder="请选择">
                        <el-option v-for="(item, index2) in triggerTimeType" :key="index2" :label="'每' + item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form.triggerType == '时间' && form.triggerTimeType != '日'" label="" prop="email">
                    第<el-input type="number" style="width:80px" v-model="form.triggerTimeValue"></el-input>天
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleFun">确 定</el-button>
            </span>
        </el-dialog>
        <iframe hidden :src="iframeSRC"></iframe>
    </div>
</template>

<script>
import requestProduct from "@/api/requestProduct.js";
export default {
    props: ['data'],
    data() {
        return {
            num : 0,
            iframeSRC:null,
            dialogStatus: "添加",
            dialogVisible: false,
            tableData: [],
            triggerType: ['时间', '手动'],
            triggerTimeType: ['年', "季", "月", "旬", '周', '日'],
            form: {
                id: null,
                baseTypeName: null, // 产品类型
                typeName: null, // 产品名称
                className: null, // 模板分类
                regionId: null, // 省市县id
                infoJSON: null, // 模板内容
                periods: null, // 当前期数
                state: null, // 状态 （启用、禁用）
                triggerType: null, // 触发方式
                triggerTimeType: null, // 时间触发类型
                triggerTimeValue: null, // 时间触发值
                path: null, // 模板的位置
                fileName: null, // 模板doc文件
                startDateStr: null,	//MMdd
                endDateStr: null,		//MMdd
                startTimeStr: null,	//HHmm
                endTimeStr: null,		//HHmm
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.tableData = []
            requestProduct.post('generalProductType/findByBaseTypeName.do', {
                baseTypeName: this.data.name,
                regionId: 1
            }).then(e => {
                this.tableData = e.data.data;
                this.tableData.forEach(item=>{
                    item.audit = true
                })
            })
        },
        peizhimuban(data){
            this.num ++;
            this.iframeSRC = this.$store.state.productURL + "office.html?title=" + data.typeName + "&id=" + data.id + "&path=" + data.path.replace("\\", "/") + data.fileName + "&num=" + this.num;
        },
        handleFun() {
            let params = this.form;
            let url;
            if (this.dialogStatus == "添加") {
                url = 'generalProductType/save.do'
                delete params.id;
                params.infoJSON = JSON.stringify({
                    "title": params.typeName,
                    "periods": 1,
                    "auther": [null, null, "临沧市气象局", "2023年1月1日"],
                    "main": [],
                    "foot": ["制作：xxx"],
                    "haveFoot": true
                })
            } else {
                url = 'generalProductType/edit.do'
            }
            params.className = this.form.typeName;

            requestProduct.post(url, params).then((res) => {
                if (res.data.state == 1) {
                    this.$message.success(this.dialogStatus + "成功")
                    this.dialogVisible = false;
                    this.getData()
                } else {
                    this.$message.error(this.dialogStatus + "失败")
                }
            });
        },
        handleAdd() {
            if (this.groupData == "") {
                this.$message.error("请在左侧群组中选中要添加人员的群组")
                return
            }
            this.form = {
                id: null,
                baseTypeName: this.data.name, // 产品类型
                typeName: null, // 产品名称
                className: null, // 模板分类
                regionId: 1, // 省市县id
                infoJSON: null, // 模板内容
                periods: 1, // 当前期数
                state: 1, // 状态 （启用、禁用）
                triggerType: '时间', // 触发方式
                triggerTimeType: '月', // 时间触发类型
                triggerTimeValue: 1, // 时间触发值
                path: null, // 模板的位置
                fileName: null, // 模板doc文件
                startDateStr: null,	//MMdd
                endDateStr: null,		//MMdd
                startTimeStr: null,	//HHmm
                endTimeStr: null,		//HHmm
            },
                this.dialogVisible = true
        },
        handleEdit(row) {//修改
            this.form = JSON.parse(JSON.stringify(row));
            this.dialogStatus = "修改"
            this.dialogVisible = true
        },
        handleDelete(rows) {//删除
            this.$confirm(`确定要删除吗？`, '提示', {
                type: 'warning'
            }).then(() => {
                requestProduct.post('generalProductType/delete.do', { id: rows.id }).then((res) => {
                    if (res.data.state == 1) {
                        this.$message.success("删除成功")
                        this.dialogVisible = false;
                        this.getData()
                    } else {
                        this.$message.error("删除失败")
                    }
                });
            })
        },
        handleSearch(row){
            // 查看这个类型专报的往期产品
            this.$store.state.productType = row;
            this.$store.state.productTypeNum ++;
        }
    },
}
</script>

<style>
.pastSpanBtn {
    padding: 2px 4px;
    color: #ADB3BB;
    border: 1px solid rgba(173, 179, 187, 0.5);
    border-radius: 2px;
    cursor: pointer;
    font-size: 12px;
}

.emptySpan {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #FFFFFF;
    border: 1px solid rgba(223, 226, 228, 1);
    border-radius: 50%;
    vertical-align: middle;
}
</style>