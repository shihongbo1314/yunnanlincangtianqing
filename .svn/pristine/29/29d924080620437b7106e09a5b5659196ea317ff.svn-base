<template>
    <div style="height:100%">
        <!-- 文本模板 -->
            <div class="top">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>产品制作</el-breadcrumb-item>
                    <el-breadcrumb-item>产品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>模板管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="template_content">
                <div class="content_left">
                    <el-tabs
                        v-model="activeName"
                        @tab-click="handleClick"
                    >
                        <el-tab-pane
                            label="模板基础信息"
                            name="first"
                        >
                            <el-form>
                                <el-form-item label="所在分组">
                                    <el-select
                                        v-model="addData.groupId"
                                        placeholder="请选择分组"
                                        style="width:320px;margin-right:22px"
                                    >
                                        <el-option
                                            v-for="item in basicsData.groupData"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="模板名称">
                                    <el-input
                                        v-model="addData.name"
                                        style="width:320px;margin-right:24px"
                                        placeholder="请输入模板名称"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="创建人">
                                    <el-input
                                        v-model="addData.creator"
                                        style="width:320px;margin-right:24px"
                                        placeholder="请输入创建人"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="任务时间">
                                    <el-select
                                        v-model="basicsData.taskTimeVal.type"
                                        placeholder="请选择"
                                        style="width:320px;margin-right:22px"
                                    >
                                        <el-option
                                            v-for="item in basicsData.taskTimeType"
                                            :key="item.val"
                                            :label="item.name"
                                            :value="item.val"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="第N天" v-if="basicsData.taskTimeVal.type != '' && basicsData.taskTimeVal.type != 'day'">
                                    <el-select
                                        clearable
                                        multiple
                                        filterable
                                        allow-create
                                        v-model="basicsData.taskTimeVal.day"
                                        placeholder="请选择"
                                        style="width:320px;margin-right:22px"
                                    >
                                        <el-option
                                            v-for="item in 7"
                                            :key="item"
                                            :label="item"
                                            :value="item"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane
                            label="模板书签"
                            name="second"
                        >
                            <div class="content_left_bookmarks">
                                <el-form>
                                    <el-form-item label="书签名称">
                                        <el-input
                                            v-model="bookMarks.name"
                                            style="width:320px;margin-right:24px"
                                            placeholder="请输入"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="书签类型">
                                        <el-select
                                            :disabled="addUpdateType == 'html'"
                                            clearable
                                            v-model="bookMarks.type"
                                            placeholder="请选择"
                                            style="width:320px;margin-right:22px"
                                        >
                                            <el-option
                                                v-for="item in bookMarksData.type"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="书签编号">
                                        <el-input
                                            v-model="bookMarks.id"
                                            style="width:320px;;margin-right:24px"
                                            placeholder="请输入"
                                        ></el-input>
                                    </el-form-item>
                                    <el-button 
                                        style="margin: 0 auto 10px; display: block;"
                                        type="primary" 
                                        @click="selectBookMarkData()"
                                    >查询</el-button>
                                </el-form>
                            </div>
                            <p style="background: #F5F6F7;width: 368px;height: 16px;margin:0"></p>
                            <div class="content_left_bottom">
                                <ul style="padding-right: 20px; list-style: auto;">
                                    <li
                                        style="margin-bottom: 20px; position: relative;"
                                        v-for="(item, index) in bookMarksData.data"
                                        :key="index"
                                    >
                                        <p style="margin: 5px 0;">{{item.name}}</p>
                                        <p style="margin: 5px 0;">书签编号：{{item.number}}</p>
                                        <el-button 
                                            type="primary" 
                                            round 
                                            @click="copyBookmarks(index)"
                                            style="position: absolute; top: 0; right: 0;"
                                        >{{true ? '复制' : '插入'}}</el-button>
                                        <!-- >{{addUpdateType == 'word' ? '复制' : '插入'}}</el-button> -->
                                        <!-- 最新一期结果例子 -->
                                        <el-skeleton style="width: calc(100% + 20px); background: #f5f6f7; border: 1px solid #dfe2e4; padding: 5px;position: relative; left: -20px; padding: 5px;" 
                                            :loading="bookmarkLive[item.id] ? false : true" 
                                            :throttle="500"
                                            animated>
                                            <!-- 无数据站位 -->
                                            <template slot="template">
                                                <!-- 数据-文本 -->
                                                <el-skeleton v-if="item.type == 'SJ' || item.type == 'BG'" :rows="3" animated />
                                                <!-- 表格 -->
                                                <el-skeleton-item v-else variant="image" style="width: 100%; height: 150px;" animated />
                                            </template>
                                            <!-- 有数据显示 -->
                                            <template v-if="bookmarkLive[item.id]">
                                                <!-- 文字 -->
                                                <div 
                                                    v-if="item.type == 'SJ'" 
                                                    class="bookmarkLiveText"
                                                >{{bookmarkLive[item.id].content}}</div>
                                                <!-- 表格 -->
                                                <div 
                                                    v-html="getBookmarksTable(item.id)"
                                                    v-else-if="item.type == 'BG'" 
                                                    style="width: 100%; max-height: 200px; overflow: auto;"
                                                ></div>
                                                <!-- 图片 -->
                                                <el-image 
                                                    v-else 
                                                    :src="bookmarkLive[item.id].content" 
                                                    style="width: 100%;" 
                                                    lazy
                                                ></el-image>
                                            </template>
                                        </el-skeleton>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="content_right">
                    <div class="Tinymce_box" style="height: 100%;">
                        <!-- 富文本 -->
                        <!-- <tinymce
                            v-if="fileType.split('_')[0] == 'html'"
                            v-model="content"
                            :domInsertText="tinymceInsertText"
                            style="height: calc(100% - 66px);"
                        /> -->
                        <el-input
                            v-if="fileType.split('_')[0] == 'html'"
                            v-model="content"
                            class="contentShowInput"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容">
                        </el-input>

                        <!-- office -->
                        <iframe v-else src="http://192.168.83.128:8080/OnlineEditorsExampleJava/EditorServlet?fileName=new.docx" class="onlyofficeIframe">

                        </iframe>
                        <!-- <onlyoffice 
                            v-else
                            :onlyofficeType="onlyofficeType"
                            :addCancel="addTemplateCancelWord"
                            style="height: calc(100% - 66px);"
                         /> -->
                         <!-- 预览
                        <div 
                            style="height: calc(100% - 66px); background:#fff; overflow: auto; padding: 10px;"
                            v-if="previewState"
                            v-html="content"
                            id="previewHTML"
                        ></div> -->
                        <div class="content_bottom">
                            <el-button 
                                style="margin-right:40px" 
                                @click="addTemplateCancel"
                            >取消</el-button>
                            <!-- <el-button 
                                :type="previewState?'primary':''" 
                                style="margin-right:40px" m
                                @click="preview"
                            >预览</el-button> -->
                            <el-button 
                                @click="addTemplateSave"
                                type="primary"
                            >保存</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template  >

<script>
import Tinymce from "../../components/Tinymce";
import onlyoffice from "../../components/onlyoffice";
import axios from "../../../src/api/requestProduct";
export default {
    components: { Tinymce , onlyoffice},
    props:{
        addType : {
            type : String
        }, 
        fileType : {
            type : String
        },
        row : {
            type : Object
        }
    },
    data() {
        return {
            activeName: "first",//设置菜单切换
            addData : {
                id : null,
                groupId : null, // 分组id
                name : '', // 模板名称
                creator : '', //模板创建人
                type : '', // 类型
                regionCode : '530900    ', // 行政编码
                taskTime : '', // 触发时间
            },
            basicsData : { // 基础数据
                groupData:[], // 分组数据
                taskTimeVal : {
                    type : '',
                    day : []
                },
                taskTimeType : [
                    {name : '手动', val : ''},
                    {name : '每年', val : 'year'},
                    {name : '每季', val : 'jidu'},
                    {name : '每月', val : 'month'},
                    {name : '每周', val : 'week'},
                    {name : '每日', val : 'day'},
                ],
                taskTimeDays : [
                    {name : '手动', val : ''},
                ]
            },
            bookMarksData : { // 书签数据
                type : [],
                data : []
            },
            bookMarks : {
                name : '',
                type : '',
                id : ''
            },
            addUpdateType : "text",



            onlyofficeType : null,
            content: "", // 富文本编辑器内容
            previewState : false, // 预览开关
            showType : "table",
            tinymceHeight : null, // 编辑器的高度
            selectData : { // 书签查询用到的
                name : '',
                type : '',
                id : ''
            },
            bookmarkLive : {}, // 书签实例
            bookmarkType : [], // 书签类型
            tablePage : { // 书签内容
                allData : [], // 所有数据
                selectData : [], // 查询的数据
            },
            addUpdateState : "add",
            addUpdateData : { // 添加、修改时内容
                name : "",
                fenzu : "",
                type : "",
                cteator : "",
            },
            tinymceInsertText : "",
            input: "",
            region: "",
            textarea2: "",
            radio: 8,
            radio1: "",
            options: [
                {
                    value: "选项1",
                    label: "类型1",
                },
                {
                    value: "选项2",
                    label: "类型2",
                },
                {
                    value: "选项3",
                    label: "类型3",
                },
                {
                    value: "选项4",
                    label: "类型4",
                },
            ],
            value: "",
            tableData: [
                {
                    date: "1",
                    name: "书签名称2",
                    address: "SJ123456789",
                    lx: "数据类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "2",
                    name: "书签名称书签名称3",
                    address: "GM56455554",
                    lx: "图片类",
                    cjr: "李四",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "3",
                    name: "书签名称书签名称书签名称1",
                    address: "BG955599955",
                    lx: "表格类",
                    cjr: "王五",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "4",
                    name: "书签名称4",
                    address: "FP456454566",
                    lx: "GIF图类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "5",
                    name: "书签名称2",
                    address: "SJ123456789",
                    lx: "数据类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "6",
                    name: "书签名称书签名称3",
                    address: "GM56455554",
                    lx: "图片类",
                    cjr: "李四",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "7",
                    name: "书签名称书签名称书签名称1",
                    address: "BG955599955",
                    lx: "表格类",
                    cjr: "王五",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "8",
                    name: "书签名称4",
                    address: "FP456454566",
                    lx: "GIF图类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "9",
                    name: "书签名称2",
                    address: "SJ123456789",
                    lx: "数据类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "10",
                    name: "书签名称书签名称3",
                    address: "GM56455554",
                    lx: "图片类",
                    cjr: "李四",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "11",
                    name: "书签名称书签名称书签名称1",
                    address: "BG955599955",
                    lx: "表格类",
                    cjr: "王五",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "12",
                    name: "书签名称4",
                    address: "FP456454566",
                    lx: "GIF图类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "13",
                    name: "书签名称2",
                    address: "SJ123456789",
                    lx: "数据类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "14",
                    name: "书签名称书签名称3",
                    address: "GM56455554",
                    lx: "图片类",
                    cjr: "李四",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "15",
                    name: "书签名称书签名称书签名称1",
                    address: "BG955599955",
                    lx: "表格类",
                    cjr: "王五",
                    sj: "2022-01-31 21:09:20",
                },
                {
                    date: "16",
                    name: "书签名称4",
                    address: "FP456454566",
                    lx: "GIF图类",
                    cjr: "张三",
                    sj: "2022-01-31 21:09:20",
                },
            ],
            newTemplate: false,
            
        };
    },
    watch:{
        
    },
    created() {
        // 初始化界面之前获取数据
        this.addData.type = this.fileType;
        this.addUpdateType = this.fileType.split('_')[0];
        if(this.addUpdateType == 'html'){
            this.bookMarks.type = this.fileType.split('_')[1];
        }
        this.initGroupType();
        this.initBookMarksType();
    },
    mounted() {
        // 界面显示完成后调用方法
    },
    methods: {
        initBookMarksType(){
            // 书签类型
            let url = this.$store.state.productBookURL + "/lc-product/prod/bookmark/type/list";
            axios.get(url).then((res) => {
                if (res.status == 200 && res.data.state == 200) {
                    this.bookMarksData.type = res.data.records;
                    // this.bookMarks.type = res.data.records[0].code;
                }
            });
        },
        initGroupType(){
            // 模板分组类型
            let url = this.$store.state.productBookURL + "/lc-product/prod/template/group/list";
            axios.get(url).then((res) => {
                if (res.status == 200 && res.data.state == 200) {
                    this.basicsData.groupData = res.data.records;
                    this.addData.groupId = res.data.records[0].id;
                }
            });
        },
        addTemplateCancel(){// 添加模板取消
            this.$parent.returnBokmarks();
        },
        addTemplateSave(){ // 添加模板保存
            let url = this.$store.state.productBookURL + "/lc-product/prod/template/info/save";
            
            this.addData.taskTime = this.basicsData.taskTimeVal.type + '_' + this.basicsData.taskTimeVal.day.join(",");
            let params = this.addData;
            if(this.addType == 'edit'){
                url = this.$store.state.productBookURL + "/lc-product/prod/template/info/update";
                params.taskState = 0;
            }
            axios.post(url, params).then((res) => {
                if (res.status == 200 &&( res.data.state == 200||res.data.state == 1001 )) {
                    this.$message("保存成功！");
                    this.$parent.returnBokmarks();
                }else{

                }
            })
        },
        selectBookMarkData(){ // 按搜索条件查询数据
            let url = this.$store.state.productBookURL + "/lc-product/prod/bookmark/info/page";
            
            let params = {
                regionCode : '530900',
                current : 1,
                size : 20,
                name : this.bookMarks.name,
                number : this.bookMarks.id,
                type : this.bookMarks.type
            };
            axios.get(url, {
                params : params
            }).then((res) => {
                if (res.status == 200 &&( res.data.state == 200||res.data.state == 1001 )) {
                    this.bookMarksData.data = res.data.records;
                }
            })
        },


        addTemplateCancelWord(){ // 添加模板取消时  word的处理
            this.showType='table';
            this.onlyofficeType = null;
        },
        updateTemplate(){// 修改模板
            this.addUpdateState ='update'; 
            this.onlyofficeType = "1_1648798570440.docx";
            this.addUpdateType = "word"; // 测试word编辑
            this.showType = this.addUpdateType;
            
        },
        arrDataToObjectData(data){ // 二维数组转换为table用的数组
            let arr = [];
            let title = data[0];
            data.slice(1).forEach(item =>{
                let obj = {}
                for (let i = 0; i < item.length; i++) {
                    const element = item[i];
                    obj[title[i]] = element;
                }
                arr.push(obj);
            })
            return arr;
        },
        getBookmarksTable(id, isBook){ // 书签的表格生成
            if(this.bookmarkLive[id] == null){
                return "";
            }
            let borderStyle = "border-collapse: collapse; width: 100%; white-space: nowrap; background:#fff;";
            let trStyle = "";
            let tdStyle = "padding: 10px;";

            if(isBook){
                borderStyle = "border-collapse: collapse; width: 100%; white-space: nowrap; background:yellow;";
            }

            let data = JSON.parse(this.bookmarkLive[id].content);
            let table = '<table class="' + id + '" border=1 style="' + borderStyle + '">';
            data.forEach(trArr => {
                table += '<tr style="' + trStyle + '">'
                trArr.forEach(td => {
                    table += '<td style="' + tdStyle + '">' + td + "</td>";
                })
                table += "</tr>";
            })
            table += "</table></div>";
            return table;
        },
        initBookMarkType(){ // 初始化书签类型
            let url = this.$baseIP + "/sd_product/prod/bookmark/type/list";
            axios.get(url).then((res) => {
                if(res.status == 200 && res.data.state == 200){
                    this.bookmarkType = res.data.records;
                    this.initBookMarkData();
                }
            })      
        },
        getBookMarkType(code){
            for (let i = 0; i < this.bookmarkType.length; i++) {
                if(this.bookmarkType[i].code == code){
                    return this.bookmarkType[i].name;
                }
            }
            return code;
        },
        initBookMarkData(){ // 初始化书签数据
            let url = this.$baseIP + "/sd_product/prod/bookmark/info/list";
            axios.get(url).then((res) => {
                if(res.status == 200 && res.data.state == 200){
                    this.tablePage.allData = res.data.records;
                    this.initBookMarkLive();
                    this.selectBookMarkData();
                }
            })      
        },
        initBookMarkLive(){ // 初始化书签的实例
            let _this = this;
            let allData = this.tablePage.allData;
            let num = 0;
            let url = this.$baseIP + "/sd_product/prod/bookmark/data/get";
            let next = function(){
                if(num > allData.length - 1){
                    return; // 全都初始化完毕
                }
                let id = allData[num].id;
                axios.get(url + "?info_id=" + id).then((res) => {
                    if(res.status == 200 && res.data.state == 200){
                        _this.bookmarkLive[id] = res.data.records;
                        let obj = res.data.records;
                        let html;
                        switch (allData[num].type) {
                            case "SJ":
                                html = '<span class="' + id + '">' + obj.content + '</span>';
                                break;
                            case "TP": // 图片、动图
                            case "DT":
                                html = '<img class="' + id + '" style="max-width: 100%;" src="' + obj.content  + '" />';
                                break;
                            case "BG":
                                html = _this.getBookmarksTable(id);
                                break;
                        }
                        obj.html = html;
                    }
                    num ++;
                    next();
                })      
            }
            next();
        },

        copyBookmarks(index){ // 复制书签内容
            let _this = this;
            let data = this.bookMarksData.data[index];
            let id = data.number;
            // if(this.addUpdateType == "word"){
            if(true){
                // 复制书签
                this.$copyText(id).then((res) => {
                    this.$message({
                        message: "复制书签成功！",
                        type: "success",
                    });
                },(err) => {
                    this.$message({
                        message: "复制书签失败！",
                        type: "error",
                    });
                    }
                );
                return;
            }
            if(this.bookmarkLive[id] == null){
                this.$message({
                    type : "error",
                    message : "该书签未加载完实例，请稍后再试！"
                })
                return;
            }
            let val;
            val = "<input type='button' class='bookmarks' value='" + id + "' />"
            this.tinymceInsertText = val;
            this.$message({
                message: "插入成功！",
                type: "success",
            });
            window.setTimeout(function(){
                _this.tinymceInsertText = ""; // 清空
            }, 100)
        },
        preview(){ // 预览显示
            let _this = this;
            if(this.previewState){ // 关闭
                this.previewState = false;
                return;
            }
            if(this.addUpdateType == "word"){
                // 从后台生成word进行预览
            }else{
                // html内容转换预览
                this.previewState = true;
                window.setTimeout(function(){
                    let div = document.getElementById("previewHTML");
                    var inputs = div.getElementsByClassName("bookmarks");
                    // 这里使用while是因为每次替换之后inputs的数组就会变动
                    while(inputs.length > 0){
                        let element = inputs[0];
                        let id = element.value;
                        if(_this.bookmarkLive[id]){
                            // 书签内容，替换成例子
                            let html = document.createElement("div");
                            html.innerHTML = _this.bookmarkLive[id].html;
                            element.parentNode.appendChild(html);
                            element.parentNode.replaceChild(html, element);
                        }
                    }
                }, 100)
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
};
</script>
<style lang="less" scoped>
.right {
    width: calc(100% - 270px);
    height: 100%;
    float: left;
    position: relative;
    top: 0;
    left: 282px;
    overflow: auto;
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
    .template_content {
        width: 100%;
        height: calc(100% - 48px);
        padding: 16px;
        display: flex;
        .content_left {
            width: 368px;
            height: 100%;
            background: #ffffff;
            margin-right: 16px;
            /deep/.el-tabs {
                height: 100%;
            }
            /deep/.el-tabs__content {
                height: calc(100% - 40px);
            }
            /deep/.el-tabs__content > div{
                height: 100%;
                overflow: auto;
            }
            /deep/.el-tabs__nav {
                width: 100%;
            }
            /deep/.el-tabs__nav-scroll {
                margin: 0;
            }
            /deep/ .el-input--small .el-input__inner {
                height: 36px;
                line-height: 36px;
            }
            /deep/.el-form-item--mini.el-form-item,
            .el-form-item--small.el-form-item {
                padding-left: 24px;
                margin: 15px 0;
            }
            /deep/.el-form-item__label {
                font-size: 16px;
                color: #333333;
            }
           
            .content_left_bottom {
                width: 100%;
                height: calc(100% - 340px);
                overflow: hidden auto;
            }
            /deep/ .bookmarkLiveText{
                word-break: break-all;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 5;
                -webkit-box-orient: vertical;
            }
        }
        .content_right {
            width: calc(100% - 400px);
            height: 100%;
            overflow: hidden auto;
            .Tinymce_box {
                .contentShowInput{
                    height: calc(100% - 70px);
                    /deep/ textarea{
                        height: 100%;
                    }
                }
                iframe.onlyofficeIframe {
                    width: 100%;
                    height: calc(100% - 70px);
                    border: none;
                }
                /deep/ .mce-tinymce{
                    height: 100%;
                    .mce-container-body{
                        height: 100%;
                        .mce-edit-area{
                            height: calc(100% - 140px);
                            iframe{
                                height: 100% !important;
                                width: 100% !important;
                            }
                        }
                    }
                }
                .content_bottom {
                    width: 100%;
                    height: 66px;
                    background: #ffffff;
                   text-align: center;
                   line-height: 66px;
                   .el-button{
                       width: 160px;
                       height: 36px;
                       font-size: 14px;
                   }
                }
            }
        }
    }

    // 新增书签  标签页样式
    /deep/.el-tabs__nav-scroll {
        margin: 10px 0 0 24px;
        .el-tabs__item {
            width: 184px;
            font-size: 16px;
            color: #adb3bb;
            text-align: center;
            padding: 0;
        }
        .el-tabs__item.is-active {
            color: #3e87f4;
            font-weight: 600;
        }
    }
    /deep/.el-tabs__header {
        margin: 0px;
    }

    .content {
        height: calc(100% + 75px);
        background-color: #ffffff;
        border-bottom: 1px #d6d9dd solid;
        margin-top: 16px;
        .Template {
            /deep/ .el-dialog {
                width: 272px;
                height: 416px;
            }
        }
        /deep/ .el-dialog {
            height: 320px;
            .el-dialog__header {
                background: #3e87f4;
                height: 32px;
                .el-dialog__title {
                    font-size: 16px;
                    color: #ffffff;
                    position: absolute;
                    top: 4px;
                    left: 24px;
                    font-weight: 500;
                }
                .el-dialog__headerbtn {
                    top: 6px;
                    right: 22px;
                    font-size: 20px;
                }
            }
            .el-dialog__footer {
                padding: 0 24px;
                .el-button--small {
                    width: 120px;
                    height: 32px;
                }
                .el-button--small {
                    font-size: 14px;
                }
                .el-button + .el-button {
                    margin-left: 32px;
                    font-size: 16px;
                }
            }
            .el-dialog__headerbtn .el-dialog__close {
                color: #ffffff;
            }
        }
        /deep/ .el-dialog__body {
            width: 320px;
            padding: 16px 18px 40px 18px;
            .NewBookmarks {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                .el-radio-button{
                    width: 128px;
                    height: 80px;
                    margin: 7px;
                    .el-radio-button__inner:hover {
                        color: none;
                    }
                    .el-radio-button__inner {
                        width: 128px;
                        height: 80px;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        color: #ADB3BB;
                        font-size: 14px;
                        border-radius: 4px;
                        border: 1px solid #DFE2E4;
                        box-shadow: none;
                    }
                }
                .el-radio-button.is-active .el-radio-button__inner {
                    background-color: #f0f6ff;
                    border-color: #3e87f4;
                    span {
                        color: #3e87f4;
                        font-weight: 600;
                    }
                    path{
                        fill : #3e87f4;
                    }
                }
            }
        }

        .content_top {
            height: 56px;
            display: flex;
            align-items: center;
            background-color: #ffffff;
            border-bottom: 1px #d6d9dd solid;
            span {
                font-size: 16px;
                color: #333333;
                letter-spacing: 0;
                text-align: justify;
                font-weight: 400;
            }
            .el-button + .el-button {
                margin-left: 0;
                /deep/.el-icon-plus {
                    width: 16px;
                    height: 16px;
                    font-size: 16px;
                }
            }
            button {
                width: 120px;
                height: 36px;
                /deep/span {
                    width: 32px;
                    height: 24px;
                    font-size: 16px;
                    color: #ffffff;
                    letter-spacing: 0;
                    text-align: justify;
                    font-weight: 400;
                }
            }
            .el-input--small {
                width: 200px;
                height: 36px;
                font-size: 16px;
                color: #adb3bb;
                letter-spacing: 0;
                text-align: justify;
                line-height: 36px;
                font-weight: 400;
            }
            /deep/.el-input .el-input__inner {
                width: 200px;
                height: 36px;
                padding-left: 10px;
                font-size: 16px;
                line-height: 36px;
            }
        }
        .table {
            height: calc(100% - 100px);
            margin: 16px 16px 0 16px;
            /deep/th {
                width: 100%;
                height: 48px;
                background: #e8eff8;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #2d5a9d;
                letter-spacing: 0;
                font-weight: 600;
            }
            /deep/ tr {
                height: 48px;
                ont-family: PingFangSC-Regular;
                font-size: 16px;
                color: #333333;
                letter-spacing: 0;
                text-align: justify;
                font-weight: 500;
            }
            .el-button--text {
                width: 65px;
                height: 24px;
                font-size: 16px;
                font-weight: 600;
                color: #2d5a9d;
            }
            .el-button--text:hover {
                color: #66b1ff;
            }
            .el-button + .el-button {
                margin-left: 0;
            }
            .gun {
                color: #d6d9dd;
            }
        }
        .bottom {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: center;
            /deep/.el-pagination {
                font-family: PingFangSC-Semibold;
                font-size: 14px;
                color: #333333;
                font-weight: 600;
            }
        }
    }
}
</style>