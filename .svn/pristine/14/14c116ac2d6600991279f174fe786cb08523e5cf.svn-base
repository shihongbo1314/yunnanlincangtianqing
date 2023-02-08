<template>
    <div style="height:100%">
        <!-- 新增书签功能 -->
        <div class="top">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>产品制作</el-breadcrumb-item>
                <el-breadcrumb-item>产品管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增书签</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="content">
            <div class="shuju">
                <p>丨书签信息</p>
                <el-form label-width="76px">
                    <el-form-item label="书签名称">
                        <el-input v-model="addData.name" style="width:840px;margin-right:24px"
                            placeholder="请输入书签名称"></el-input>
                    </el-form-item>
                    <el-form-item label="书签描述">
                        <el-input
                            type="textarea"
                            :rows="2"
                            style="width:840px;margin-right:24px"
                            placeholder="请输入书签描述"
                            v-model="addData.desc">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="创建人" style="width: 50%; display: inline-block;">
                        <el-input v-model="addData.user" style="width:360px" placeholder="请输入创建人"></el-input>
                    </el-form-item>
                    <el-form-item label="保存类型" style="width: 50%; display: inline-block;">
                        <el-select v-model="addData.saveType"
                            :disabled="reData.dataType=='string'"
                            @change="imgShowTypeChange"
                            style="width:360px">
                            <el-option v-for="item in saveType" :key="item.code" :label="item.name"
                                :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <p>丨书签配置</p>
                <el-form style="display:flex;flex-wrap: wrap;" label-width="76px">
                    <el-form-item label="数据来源" style="width:482px">
                        <el-select @change="bookDataChange" v-model="addData.bookData" placeholder="请选择数据来源"
                            style="width:360px;">
                            <el-option v-for="item in bookData" :key="item.code" :label="item.name"
                                :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="要素选择">
                        <el-select @change="siteElementDataChange" v-model="siteElementSelect.element"
                            placeholder="请选择要素" style="width:353px;">
                            <el-option v-for="item in siteElementData" :key="item.id" :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开始时间" style="width:482px">
                        <span>偏移&nbsp;</span>
                        <el-input v-model="addData.startTime.value" type="number" style="width:104px;margin-right:8px"
                            placeholder="请输入"></el-input>
                        <el-select v-model="addData.startTime.interval" style="width:120px">
                            <el-option v-for="item in timeData.interval" :key="item.val" :label="item.name"
                                :value="item.val"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <span>偏移&nbsp;</span>
                        <el-input v-model="addData.endTime.value" type="number" style="width:104px;margin-right:8px"
                            placeholder="请输入"></el-input>
                        <el-select v-model="addData.endTime.interval" style="width:120px">
                            <el-option v-for="item in timeData.interval" :key="item.val" :label="item.name"
                                :value="item.val"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="台站筛选" style="width:482px" v-if="reData.dataType=='table'">
                        <el-select v-model="siteElementSelect.sites" multiple filterable style="width:360px"
                            @change="showDataChange">
                            <el-option v-for="item in stationData" :key="item.stationId"
                                :label="`${item.stationName}(${item.stationId})`" :value="item.stationId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据处理" v-if="reData.dataType=='table'">
                        <el-select v-model="siteElementSelect.shaixuan" filterable style="width:360px"
                            @change="showDataChange">
                            <el-option v-for="item in shaixuanData" :key="item.val" :label="item.name"
                                :value="item.val"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <p>丨 {{getSaveTypeName()}}配置</p>
                <!-- 文本设置 -->
                <el-form :hidden="addData.saveType != 'SJ'"  label-width="76px">
                    <el-form-item label="可选参数">
                        <el-cascader
                            v-model="textSystem.val"
                            :options="textSystem.options"
                            @change="textSystemChange">
                        </el-cascader>
                        <span style="margin-left: 20px;">参数：{{'${' + textSystem.key.key + '}'}}</span>
                        <span style="margin-left: 20px;">值：{{textSystem.key.val}}</span>
                    </el-form-item>
                    <el-form-item label="文本处理">
                        <el-input v-model="textSystemValue.text" @input="addDataTextChange" type="textarea" :rows="3"
                            style="width:840px;margin-right:24px"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 表格设置 -->
                <el-form label-width="76px" :hidden="addData.saveType != 'BG'">
                    <el-form-item label="边框" style="width: 50%; display: inline-block;">
                        <el-switch
                            v-model="tableSystem.border"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="样式" style="width: 50%; display: inline-block;">
                        <el-select v-model="tableSystem.className" >
                            <el-option
                                v-for="item in tableSystemData.className"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="item.name" v-for="item in reData.tableData" style="width: 50%; display: inline-block;">
                        <span>显示</span>
                        <el-switch
                            @change="tableDataChange"
                            v-model="item.show"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>

                        <el-select v-if="item.show" v-model="item.align" placeholder="请选择">
                            <el-option
                            v-for="item in tableSystemData.alignData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <!-- 图片设置  -->
                <el-form label-width="76px" :hidden="addData.saveType != 'TP'">
                    <el-form-item label="出图类型" style="width: 50%; display: inline-block;">
                        <el-select v-model="imgSystem.type" @change="imgShowTypeChange" >
                            <el-option
                                v-for="item in imgSystemData.type"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="可选参数">
                        <el-cascader
                            v-model="textSystem.val"
                            :options="textSystem.options"
                            @change="textSystemChange">
                        </el-cascader>
                        <span style="margin-left: 20px;">参数：{{'${' + textSystem.key.key + '}'}}</span>
                        <span style="margin-left: 20px;">值：{{textSystem.key.val}}</span>
                    </el-form-item>
                    <el-form-item label="标题处理">
                        <el-input v-model="imgSystem.title" @input="imgTitleChange" style="width:840px;"></el-input>
                    </el-form-item>
                    <el-form-item label="签发处理">
                        <el-input v-model="imgSystem.bottom" @input="imgBottomChange" style="width:840px;"></el-input>
                    </el-form-item>
                    <el-form-item label="出图范围" v-if="imgSystem.type == 'img'">
                        <el-select v-model="imgSystem.city" @change="mapShowCityChange" style="width:840px;">
                            <el-option
                                v-for="item in imgSystemData.city"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-if="imgSystem.type != 'img'">
                        <el-form-item label="x轴" style="width: 50%; display: inline-block;">
                            <el-select v-model="imgSystem.xData" @change="imgEchartTitleYDataInit">
                                <el-option
                                    v-for="item in reData.tableData"
                                    :key="item.key"
                                    :label="item.name"
                                    :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="y轴" style="width: 50%; display: inline-block;">
                            <el-select v-model="imgSystem.yData" @change="imgEchartChange">
                                <el-option
                                    v-for="item in reData.tableData"
                                    :key="item.key"
                                    :disabled="item.key == imgSystem.xData"
                                    :label="item.name"
                                    :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form>
                    
                <div style="text-align: center;">
                        <el-button type="primary" @click="saveBook">{{ addType == 'add' ? '创建' : '修改' }}</el-button>
                    <el-button @click="closeBook">取消</el-button>
                </div>
            </div>
            <div class="yulan">
                <div class="yulan_one">
                    <div v-if="addData.saveType == 'SJ'">
                        <p class="yulan_top">文本数据预览</p>
                        <p>{{ textSystemValue.showText }}</p>
                    </div>

                    <div v-if="reData.dataType == 'table' && (addData.saveType == 'BG' || addData.saveType == 'SJ')">
                        <p class="yulan_top">表格数据预览</p>
                        <el-table :class="tableSystem.className" :data="reData.showData" :border="tableSystem.border" style="width: 100%">
                            <el-table-column :hidden="!item.show" :align="item.align" v-for="item in reData.showTableData" :key="item.key" :prop="item.key"
                                :label="item.name">
                            </el-table-column>
                        </el-table>
                    </div>

                    <div :hidden="addData.saveType != 'TP'">
                        <p class="yulan_top">图片预览</p>
                        <div :hidden="imgSystem.type == 'img'" ref="echart" style="width: 100%; height: 300px;"></div>
                        <div class="yulanMap" :hidden="imgSystem.type != 'img'" style="width: 100%; height: 300px;">
                            <div class="mapTitle">{{ imgSystem.titleStr }}</div>
                            <div class="mapBottom">{{ imgSystem.bottomStr }}</div>
                            <div class="legend"></div>
                            <div ref="map" style="width:100%; height: 100%;z-index: 0;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../../../src/api/requestProduct";
import countyJSON from "../../assets/map/530900_full.json";
import cityJSON from "../../assets/map/530900.json"
export default {
    watch:{
    },
    props:{
        addType : {
            type : String
        }, 
        row : {
            type : Object
        }
    },
    data() {
        return {
            editData : null, // 编辑模式数据
            editDisaster : false,
            addData: { // 添加书签保存的内容
                name: '',
                desc: '',
                user: '',
                bookData: null,
                startTime: {
                    value: 0,
                    interval: 'hour'
                },
                endTime: {
                    value: 0,
                    interval: 'hour'
                },
                saveType: 'BG',
            },
            bookData: [], // 数据来源
            stationData: [], // 站点数据
            siteElementData: null, // 站点要素列表
            siteElementSelect: { // 站点要素选择的值
                element: null,
                sites: null,
                shaixuan: '0_0',
            },
            reData: { // 接口返回的原始数据处理
                dataType : '', // 显示的数据类型
                tableData: [],
                showTableData : [],
                data: [],  // 原始数据
                showData: null, // 处理后的数据
            },
            timeData: { // 数据时间选项
                type: [
                    { name: '正常', val: 0 },
                    { name: '之前', val: -1 },
                    { name: '之后', val: 1 },
                ],
                interval: [
                    { name: '时', val: 'hour' },
                    { name: '日', val: 'day' },
                    { name: '月', val: 'month' },
                    { name: '年', val: 'year' },
                ]
            },
            shaixuanData: [
                {
                    name: '无', val: '0_0'
                }, {
                    name: '单站最大值', val: 'max_1'
                }, {
                    name: '多站最大值', val: 'max_2'
                }, {
                    name: '单站最小值', val: 'min_1'
                }, {
                    name: '多站最小值', val: 'min_2'
                }, {
                    name: '单站平均值', val: 'avg_1'
                }, {
                    name: '多站平均值', val: 'avg_2'
                }
            ],
            saveType: [
                
            ],
            tableSystem : {
                border : true,
                className : ''
            },
            tableSystemData : {
                alignData : [
                    {
                        label: '居左对齐', value: 'left'
                    }, {
                        label: '居中对齐', value: 'center'
                    }, {
                        label: '居右对齐', value: 'right'
                    }
                ],
                className : [
                    {
                        label: '默认', value: ''
                    }, {
                        label: '夜间模式', value: 'night'
                    }
                ]
            },
            textSystemData : { // 文本配置时可用的参数

            },
            textSystem:{
                val : null,
                key : {},
                options : []
            },
            textSystemValue:{
                text: '',
                showText: ''
            },
            imgSystemData : {// 图片配置可选参数
                type : [
                    {
                        label: '折线图', value: 'line'
                    }, {
                        label: '柱状图', value: 'bar'
                    },{
                        label: '色斑图', value: 'img'
                    }
                ],
                echart : null,
                map : null,
                city : []
            },
            imgSystem:{
                type : 'line',
                title : '标题',
                titleStr : '标题',
                bottom: '气象局',
                bottomStr : '气象局',
                xData : '',
                yData : '',
                city : ''
            },
        };
    },
    created() {
        console.log(this.textSystemValue)
        // 初始化界面之前获取数据
        this.mapShowCityInit();
        // 初始化编辑模式
        this.initEditData();
        // 初始化保存类型
        this.initBookMarkType();
    },
    mounted() {
        // 界面显示完成后调用方法
        if(this.addType == 'add'){
            this.initBookData();
            this.initStationData();
        }
    },
    methods: {
        initBookMarkType() {
            let url = this.$store.state.productBookURL + "/lc-product/prod/bookmark/type/list";
            axios.get(url).then((res) => {
                if (res.status == 200 && res.data.state == 200) {
                    let data = [];
                    res.data.records.forEach(item=>{
                        if(item.name == '动图'){
                            return;
                        }
                        data.push(item);
                    })
                    this.saveType = data;
                    // this.saveType = res.data.records;
                }
            });
        },
        initEditData(){
            // 初始化编辑模式数据
            if(this.addType == 'add'){
                return;
            }
            this.editDisaster = true;
            let url = this.$store.state.productBookURL + "/lc-product/prod/bookmark/info/get";
            axios.get(url, {
                params : {
                    number : this.row.number
                }
            }).then((res) => {
                console.log(this)
                if (res.status == 200 && res.data.state == 200) {
                    this.editData = res.data.records;
                    this.editData.json = JSON.parse(this.editData.config.otherSettingInfo);
                    this.addData.name = this.editData.base.name;
                    this.addData.desc = this.editData.base.description;
                    this.addData.user = this.editData.base.creator;
                    this.addData.saveType = this.editData.base.type.split("_")[1];
                    this.addData.bookData = this.editData.config.sourceCode;
                    this.addData.startTime.value = this.editData.config.startTimeInfo.split("_")[0];
                    this.addData.startTime.interval = this.editData.config.startTimeInfo.split("_")[1];
                    this.addData.endTime.value = this.editData.config.endTimeInfo.split("_")[0];
                    this.addData.endTime.interval = this.editData.config.endTimeInfo.split("_")[1];

                    // 数据筛选
                    this.siteElementSelect.element = this.editData.json.siteElementSelect.element;
                    this.siteElementSelect.sites = this.editData.json.siteElementSelect.sites;
                    this.siteElementSelect.shaixuan = this.editData.json.siteElementSelect.shaixuan;


                    // // 文本结果参数
                    this.textSystemValue.text = this.editData.json.textSystemValue.text;
                    this.textSystemValue.showText = this.editData.json.textSystemValue.showText;
                    // // 表格结果参数
                    this.tableSystem = this.editData.json.tableData.tableSystem;
                    this.reData.tableData = this.editData.json.tableData.titleData;
                    this.reData.dataType = this.editData.json.tableData.dataType;
                    this.tableDataChange();

                    // this.tableSystemData = this.editData.json.tableSystemData;
                    // this.tableSystemData = this.editData.json.tableSystemData;
                    // // 图片结果参数
                    Object.keys(this.imgSystem).forEach(key=>{
                        this.imgSystem[key] = this.editData.json.imgSystem[key];
                    })

                    // this.siteElementSelect.sites = [];
                    // this.siteElementSelect.shaixuan = [];

                    this.initBookData();
                    this.initStationData();
                }
            })
        },
        initBookData() { // 初始化书签类型
            let url = this.$store.state.productBookURL + "/lc-product/prod/bookmark/info_data_source/list";
            axios.get(url).then((res) => {
                if (res.status == 200 && res.data.state == 200) {
                    this.bookData = res.data.records;
                    if(this.addType == 'add'){
                        this.addData.bookData = this.bookData[0].code;
                    }
                    this.bookDataChange();
                }
            })
        },
        bookDataChange() { // 选择书签类型变动
            let editChange = true;
            if(this.addType == 'edit' && this.editData.firstBookDataChange == null){
                editChange = false;
                this.editData.firstBookDataChange = true;
            }
            console.log(editChange)
            if(editChange){
                this.siteElementSelect = {
                    element: null,
                    sites: null,
                    shaixuan: '0_0',
                };
            }
            this.textSystemData = {

            }
            let url = this.$store.state.productBookURL + "/lc-product/prod/bookmark/info_data_element/list";
            axios.get(url, {
                params: {
                    sourceCode: this.addData.bookData
                }
            }).then((res) => {
                if (res.status == 200 && res.data.state == 200) {
                    this.siteElementData = res.data.records;
                    if(editChange){
                        this.siteElementSelect.element = this.siteElementData[0].id;
                    }
                    this.siteElementDataChange();
                }
            })
        },
        siteElementDataChange() { // 要素类型变动
            let url = this.$store.state.productBookURL + "/lc-product/prod/bookmark/result/get";
            let elementName;
            this.siteElementData.forEach(item => {
                if (item.id == this.siteElementSelect.element) {
                    elementName = item.name;
                }
            })
            this.textSystemData.element = {
                name : '要素',
                val : elementName
            };
            this.textSystemIinit();
            axios.get(url, {
                params: {
                    elementId: this.siteElementSelect.element,
                }
            }).then((res) => {
                if (res.status == 200 && res.data.state == 200) {
                    this.reData.data = res.data.records.data;
                    if(this.addType == 'add'){
                        this.reData.tableData = [];
                        this.reData.dataType = res.data.records.type;
                        switch (res.data.records.type) {
                            case 'table':
                                let keys = res.data.records.key.split(",");
                                let names = res.data.records.name.split(",");
                                for (let i = 0; i < keys.length; i++) {
                                    this.reData.tableData.push({
                                        name : names[i],
                                        key : keys[i],
                                        show : true,
                                        align : 'center'
                                    })
                                }
                                this.imgSystem.xData = this.reData.tableData[0].key;
                                this.imgSystem.yData = this.reData.tableData[1].key;
                                break;
                            case 'string':
                                this.addData.saveType = 'SJ';
                                break;
                            default:
                                // 不需要处理
                                break;
                        }
                    }
                    this.showDataChange();
                    this.tableDataChange();
                }
            })
        },
        initStationData() { // 初始化所有站点
            let url = this.$store.state.productBookURL + "/lc-product/prod/bookmark/info_data_station/list";
            axios.get(url).then((res) => {
                if (res.status == 200 && res.data.state == 200) {
                    this.stationData = res.data.records;
                }
            })
        },
        stationShow(site) { // 判断这个站点是否显示
            let sites = this.siteElementSelect.sites;
            if (sites == null || sites.length == 0) {
                return true; // 没有限制 显示全部
            }
            for (let i = 0; i < sites.length; i++) {
                if (sites[i] == site) {
                    return true; // 当前站点显示
                }
            }
            return false; // 没有匹配这个站点
        },
        showDataChange() { // 预览数据变动
            let showData = [];
            let shaixuan = this.siteElementSelect.shaixuan.split("_");
            let redata = JSON.parse(JSON.stringify(this.reData.data));
            let countName;
            switch (shaixuan[1]) {
                case '0':
                    // 不处理
                    redata.forEach(item => {
                        if (!this.stationShow(item.stationId)) {
                            return; // 站点不显示
                        }
                        showData.push(item);
                    })
                    break;
                case '1':
                    // 单站
                    let count = 0;
                    redata.forEach(item => {
                        item.value = parseFloat(item.value);
                        if (!this.stationShow(item.stationId)) {
                            return; // 站点不显示
                        }
                        if (item.value > 9999) {
                            return; // 脏数据  不参与
                        }
                        switch (shaixuan[0]) {
                            case 'max':
                                if (showData.length == 0 || showData[0].val < item.value) {
                                    showData[0] = item;
                                }
                                countName = "最大值";
                                break;
                            case 'min':
                                if (showData.length == 0 || showData[0].val > item.value) {
                                    showData[0] = item;
                                }
                                countName = "最小值";
                                break;
                            case 'avg':
                                if (showData.length == 0) {
                                    showData[0] = item;
                                } else {
                                    showData[0].value += item.value;
                                }
                                count++;
                                countName = "平均值";
                                break;

                            default:
                                break;
                        }
                    })
                    if (shaixuan[0] == 'avg') {
                        showData[0].stationId = '-';
                        showData[0].datetime = '-';
                        showData[0].value = parseFloat((showData[0].value / count).toFixed(1));
                    }
                    break;
                case '2':
                    // 多站
                    let sites = {};
                    redata.forEach(item => {
                        item.value = parseFloat(item.value);
                        if (!this.stationShow(item.stationId)) {
                            return; // 站点不显示
                        }
                        if (item.value > 9999) {
                            return; // 脏数据  不参与
                        }
                        if (sites[item.stationId] == null) {
                            sites[item.stationId] = [];
                        }
                        sites[item.stationId].push(item)
                    });
                    Object.keys(sites).forEach(site => {
                        let arr = sites[site];
                        let siteData;
                        let count = 0;
                        arr.forEach(item => {
                            switch (shaixuan[0]) {
                                case 'max':
                                    if (siteData == null || siteData.val < item.value) {
                                        siteData = item;
                                    }
                                    countName = "最大值";
                                    break;
                                case 'min':
                                    if (siteData == null || siteData.val > item.value) {
                                        siteData = item;
                                    }
                                    countName = "最小值";
                                    break;
                                case 'avg':
                                    if (siteData == null) {
                                        siteData = item;
                                    } else {
                                        siteData.value += item.value;
                                    }
                                    count++;
                                    countName = "平均值";
                                    break;
                                default:
                                    break;
                            }
                        })
                        if (shaixuan[0] == 'avg') {
                            siteData.datetime = '-';
                            siteData.stationId = '-';
                            siteData.value = parseFloat((siteData.value / count).toFixed(1));
                        }

                        showData.push(siteData);
                    })
                    break;
                default:
                    break;
            }

            this.reData.showData = showData;
            this.textSystemData.showData = {
                name : '数据',
                val : showData
            };
            if(countName){
                this.textSystemData.count = {
                    name : '统计',
                    val : countName
                };
            }else{
                delete this.textSystemData.count;
            }
            this.textSystemIinit();
            this.imgShowTypeChange();
        },
        addDataTextChange() {
            this.allTextChange(this.textSystemValue.text, text=>{
                this.textSystemValue.showText = text;
            })
        },
        allTextChange(str, fun){
            let text = str + '';
            let next = true;
  
            while (next && text.indexOf("${") > -1 && text.indexOf("}") > -1) {
                let t = text + '';
                let keystr = text.substr(text.indexOf("${")+2);
                keystr = keystr.substr(0, keystr.indexOf("}"));
                let key = keystr.split("_");
                try {
                    let val = this.textSystemData[key[0]].val;
                    if(key.length > 1){
                        if(this.reData.dataType=='string'){
                            val = val[key[1]];
                        }else{
                            val = val[key[1]][key[2]];
                        }
                    }
                    text = text.replace("${" + keystr + "}", val);
                    t = text;
                } catch (error) {
                    next = false;
                }
            }
            fun && fun(text);
        },
        getSaveTypeName(){
            // 获取显示类型的名称
            for (let i = 0; i < this.saveType.length; i++) {
                if(this.saveType[i].val == this.addData.saveType){
                    return this.saveType[i].name
                }
            }
        },
        tableDataChange(){
            // 表格显示数据的变动
            let data = [];
            this.reData.tableData.forEach(item=>{
                if(item.show){
                    data.push(item)
                }
            })
            this.reData.showTableData = data;
        },
        textSystemIinit(){
            // 文本可选参数选项初始化
            let option = [];
            Object.keys(this.textSystemData).forEach(key=>{
                let op = {
                    value: key,
                    label: this.textSystemData[key].name
                }
                if(key == "showData"){
                    // 查询数据
                    op.children = [];
                    this.textSystemData[key].val.forEach((item, index) => {
                        let o = [];
                        if(this.reData.dataType=='table'){
                            this.reData.tableData.forEach(title=>{
                                o.push({
                                    value: key + "_" + index + "_" + title.key,
                                    label: title.name,
                                })
                            })
                        }else{
                            o = null;
                        }
                        op.children.push({
                            value: key + "_" + index,
                            label: '第' + (index + 1) + "行",
                            children : o
                        })
                    })
                    
                }
                option.push(op)
            })
            this.textSystem.options = option;
            if(this.textSystem.val == null){
                this.textSystem.val = [option[0].value];
                this.textSystemChange();
            }
        },
        textSystemChange(){
            // 文本可选参数变动
            let keystr = this.textSystem.val[this.textSystem.val.length-1];
            let key = keystr.split("_");
            let val = this.textSystemData[key[0]].val;
            if(key.length > 1){
                if(this.reData.dataType=='string'){
                    val = val[key[1]];
                }else{
                    val = val[key[1]][key[2]];
                }
            }
            this.textSystem.key = {
                key : keystr,
                val : val
            }
        },
        imgShowTypeChange(){
            // 图片显示类型初始化
            setTimeout(() => {
                this.imgMapInit();
                this.imgEchartTitleYDataInit(); // echart
            }, 500);
        },
        imgEchartTitleYDataInit(){
            if(this.imgSystem.xData != this.imgSystem.yData){
                this.imgEchartChange();
                return;
            }
            let yData = [];
            this.reData.tableData.forEach(item=>{
                if(item.key == this.imgSystem.yData){
                    return;
                }
                yData.push(item);
            })
            this.imgSystem.yData = yData[0].key;
            this.imgEchartChange();
        },
        imgTitleChange(){
            this.allTextChange(this.imgSystem.title, text=>{
                this.imgSystem.titleStr = text;
                this.imgEchartChange();
            })
        },
        imgBottomChange(){
            this.allTextChange(this.imgSystem.bottom, text=>{
                this.imgSystem.bottomStr = text;
                this.imgEchartChange();
            })
        },
        imgEchartChange(){
            console.log(1)
            if(this.imgSystemData.echart == null){
                this.imgSystemData.echart = this.$echarts.init(this.$refs.echart);
            }
            let xData = [], yData = [];
            this.reData.showData.forEach(item=>{
                xData.push(item[this.imgSystem.xData]);
                yData.push(item[this.imgSystem.yData])
            })
            let gridTop = 20;
            if(this.imgSystem.title != ''){
                gridTop += 25;
            }
            if(this.imgSystem.bottom != ''){
                gridTop += 15;
            }
            let option = {
                title : {
                    text : this.imgSystem.titleStr,
                    subtext: this.imgSystem.bottomStr,
                    left: 'center'
                },
                grid: {
                    top: gridTop + 'px',
                    left: '20px',
                    right: '20px',
                    bottom: '20px',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: yData,
                    type: this.imgSystem.type
                    }
                ]
            }
            this.imgSystemData.echart.clear();
            this.imgSystemData.echart.resize();
            this.imgSystemData.echart.setOption(option)
        },
        imgMapInit(){
            // 地图出图初始化
            if(this.imgSystemData.map == null){
                this.imgSystemData.map = L.map(this.$refs["map"], {
                    center: [25.03284, 100.546904], // 地图中心
                    zoom: 8, //缩放比列
                    zoomControl: false, //禁用 + - 按钮
                    doubleClickZoom: false, // 禁用双击放大
                    attributionControl: false, // 移除右下角leaflet标识
                    dragging: false, // 移动地图
                    doubleClickZoom: false, // 放大缩小地图
                    keyboard: false, // 键盘控制地图
                    scrollWheelZoom: false, // 鼠标控制地图
                    zoomSnap: 0.01,
                });
                // this.map.fitBounds([
                //     [25.03284, 100.546904],
                //     [23.073182, 98.668863],
                // ]);
                // this.imageBounds = [[25.035, 100.545],[23.015, 98.67]]
            }

            console.log(countyJSON)
            console.log(cityJSON)
            this.mapShowCityChange();
            this.mapShowImageChange();
        },
        mapShowCityInit(){
            // 地图城市初始化
            this.imgSystemData.city.push({
                name : '临沧市',
                json : cityJSON
            })
            countyJSON.features.forEach(item=>{
                this.imgSystemData.city.push({
                    name : item.properties.name,
                    json : item
                })
            })
            this.imgSystem.city = this.imgSystemData.city[0].name;
        },
        mapShowCityChange(){
            if(this.imgSystemData.map == null){
                return;
            }

            if(this.imgSystemData.borderLayer == null){
                this.imgSystemData.borderLayer = L.layerGroup();
                this.imgSystemData.borderLayer.addTo(this.imgSystemData.map);
            }
            this.imgSystemData.borderLayer.clearLayers();

            let borderJSON = {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        geometry: {
                            type: "MultiPolygon",
                            coordinates: [[[[180, 85], [180, -85], [-180, -85], [-180, 85]]], []]
                        }
                    }
                ]
            };
            let item;
            for (let i = 0; i < this.imgSystemData.city.length; i++) {
                if(this.imgSystemData.city[i].name == this.imgSystem.city){
                    item = this.imgSystemData.city[i];
                    break;
                }
                
            }
            if(item.name == '临沧市'){
                borderJSON.features[0].geometry.coordinates[1].push(item.json.geometries[0].coordinates[0])
            }else{
                item.json.geometry.coordinates.forEach(it => {
                    borderJSON.features[0].geometry.coordinates[1].push(it[0])
                })
            }
            console.log(borderJSON)
            let baseLayer = L.geoJSON(borderJSON, {
                fillColor: '#fff',
                fill: true,
                fillOpacity : 1,
                stroke: false,
                pane: "overlayPane"
            })
            let layer = L.geoJSON(item.json, {

            })
            this.imgSystemData.map.invalidateSize();
            this.imgSystemData.map.fitBounds(layer.getBounds(), {
                // paddingTopLeft : L.point(0, 60),
                // paddingBottomRight : L.point(0, 60)
            })

            layer.addTo(this.imgSystemData.borderLayer);
            baseLayer.addTo(this.imgSystemData.borderLayer);
        },
        mapShowImageChange(){
            var imageUrl = 'http://61.153.185.211:8088/grib2data/yb/2022/11/16/SMERGE-TMP/20/20221116_006.png',
            imageBounds = [ [8, 92],  [29, 102]];

            if(this.imgSystemData.imgLayer == null){
                this.imgSystemData.imgLayer = L.imageOverlay(imageUrl, imageBounds).addTo(this.imgSystemData.map);
            }else{
                this.imgSystemData.imgLayer.setBounds(imageBounds).setUrl(imageUrl);
            }   
        },
        saveBook(){
            let url = this.$store.state.productBookURL + "lc-product/prod/bookmark/info/save";
            
            let type = this.addData.saveType;
            let otherJSON = {
                siteElementSelect : this.siteElementSelect,
                textSystemValue : this.textSystemValue,
                tableData : {
                    titleData : this.reData.tableData,
                    tableSystem : this.tableSystem,
                    dataType : this.reData.dataType
                },
                imgSystem : this.imgSystem,
            }
            let params = {
                regionCode : '530900',
                name : this.addData.name,
                creator : this.addData.user,
                type : type,
                description	: this.addData.desc,
                sourceCode : this.addData.bookData,
                elementId : this.siteElementSelect.element,
                startTimeInfo : this.addData.startTime.value + "_" + this.addData.startTime.interval,
                endTimeInfo	: this.addData.endTime.value + "_" + this.addData.endTime.interval,
                otherSettingInfo : JSON.stringify(otherJSON)
            }
            if(this.addType == 'edit'){
                url = this.$store.state.productBookURL + "lc-product/prod/bookmark/info/update";
                params.number = this.row.number;
                delete params.regionCode;
                delete params.type;
            }
            axios.post(url, params).then((res) => {
                if (res.status == 200 &&( res.data.state == 200||res.data.state == 1001 )) {
                    this.$message("保存成功！");
                    this.$parent.returnBokmarks();
                }else{

                }
            })
        },
        closeBook(){
            this.$parent.returnBokmarks();
        }


    },
};
</script>

<style lang="less" scoped>
.right {
    width: calc(100% - 280px);
    height: 100%;
    float: left;
    position: relative;
    top: 0;
    left: 282px;

    .top {
        height: 48px;
        background-color: #ffffff;

        .el-breadcrumb {
            width: 240px;
            height: 48px;
            font-size: 16px;
            letter-spacing: 0;
            text-align: justify;
            line-height: 48px;
            font-weight: 400;
            margin: 0 0 12px 16px;

            /deep/.el-breadcrumb__inner {
                color: #2d5a9d;
            }

            /deep/.el-breadcrumb__separator[class*="icon"] {
                margin: 0 3px;
                font-weight: 400;
                color: #2d5a9d;
            }
        }
    }

    .content {
        height: calc(100% - 64px);
        background-color: #ffffff;
        margin-top: 16px;

        .shuju {
            display: inline-block;
            width: 960px;
            height: calc(100% - 48px);
            margin: 24px;
            background-color: #f5f6f7;
            overflow: auto;

            p {
                height: 24px;
                font-size: 16px;
                color: #3e87f4;
                font-weight: 600;
                margin-left: 20px;
                margin-top: 24px;
            }

            /deep/.el-form-item--small .el-form-item__label {
                font-size: 16px;
                margin-left: 24px;
                color: #333333;
                text-align: right;
            }

            /deep/.el-input--small .el-input__inner {
                height: 36px;
                font-size: 16px;
                padding-left: 10px;
            }

            /deep/.el-form-item--small .el-form-item__content {
                display: flex;
            }

            .el-button {
                width: 160px;
                height: 36px;
            }

            .el-radio-group {
                margin-top: 10px;
                font-size: 16px;
            }

            .xuanze {
                width: 48px;
                height: 24px;
                background-color: #ffffff00;
                text-align: center;
                border: none;
                font-size: 16px;
                color: #333333;
                margin-right: 24px;
            }

            /deep/ .el-radio {
                margin: 0 15px;

                .el-radio__inner {
                    width: 16px;
                    height: 16px;
                }

                .el-radio__label,
                .el-checkbox__label {
                    font-size: 16px;
                }
            }

            .quyu {
                height: 72px;
                border: 1px solid rgba(214, 217, 221, 1);
                border-radius: 4px;
                background-color: #ffffff;
                margin-top: 8px;

                .sanjiao {
                    width: 0;
                    height: 0;
                    border-left: 4px solid transparent;
                    border-right: 4px solid transparent;
                    border-bottom: 4px solid #d6d9dd;
                    position: relative;
                    top: -4px;
                    left: 106px;
                }

                /deep/.el-checkbox-group {
                    .el-checkbox-button__inner {
                        border: none;
                        width: 48px;
                        height: 24px;
                        font-size: 16px;
                        color: #333333;
                        border: none;
                        background-color: #ffffff;
                        margin: 4px 27px 0 0;
                    }

                    .el-checkbox-button.is-checked .el-checkbox-button__inner {
                        color: #2672fd;
                        font-size: 16px;
                        font-weight: 600;
                        background: none;
                        box-shadow: none;
                    }
                }
            }

            .table_type {
                width: 912px;
                height: 216px;
                background: #ffffff;
                border-radius: 4px;
                margin-left: 24px;

                .table_type_one {
                    height: 216px;
                    overflow-x: scroll;
                }

                /deep/ .el-radio--small.is-bordered {
                    width: 320px;
                    height: 200px;
                    background: #d8dfe5;
                    margin: 8px 0 8px 8px;
                }
            }
        }

        .yulan {
            display: inline-block;
            width: calc(100% - 1032px);
            height: calc(100% - 48px);
            overflow: auto;
            margin-left: 0;
            vertical-align: top;

            .yulan_top {
                height: 48px;
                background: #ff8a47;
                text-align: center;
                line-height: 48px;
                font-size: 16px;
                color: #ffffff;
                font-weight: 500;
                margin: 24px 0;
            }

            span {
                font-size: 18px;
                color: #ff8a47;
                letter-spacing: 0;
                font-weight: 600;
                margin-left: 24px;
            }

            .yulan_one {
                margin: 24px;

                /deep/ .el-form-item--small .el-form-item__label {
                    font-size: 16px;
                }

                .yulan_p {
                    height: 24px;
                    font-size: 16px;
                    color: #3e87f4;
                    font-weight: 600;
                    margin-left: -7px;
                    margin-top: 24px;
                }

                .yulan_content {
                    width: 100%;
                    height: 480px;

                    .el-table {
                        border: 1px solid rgba(198, 219, 244, 1);
                    }

                    /deep/th {
                        font-size: 16px;
                        color: #333333;
                        font-weight: 400;
                        text-align: center;
                        background: #dcecff;
                        border: 1px solid rgba(214, 217, 221, 1);
                    }
                }

                .el-button {
                    width: 160px;
                    height: 36px;
                    background: #3e87f4;
                    border-radius: 4px;
                    font-weight: 500;
                }
            }
        }
    }

    
}

.el-table.night {
    border: 1px solid #333;
    /deep/ td,
    /deep/ th{
        background: #000;
        color: #fff;
    }
}
.el-switch{
    margin: 8px;
    margin-right: 20px;
}

.yulanMap{
    box-shadow: 0 0 1px 1px #000;
    position: relative;
    .mapTitle{
        position:absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        font-size: 16px;
        z-index: 1;
    }
    .mapBottom{
        position:absolute;
        right: 10px;
        bottom: 10px;
        font-size: 16px;
        z-index: 1;
    }
}
</style>