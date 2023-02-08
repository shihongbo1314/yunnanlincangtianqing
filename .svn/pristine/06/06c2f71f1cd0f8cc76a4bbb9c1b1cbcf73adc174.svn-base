<template>
    <div style="height:100%">
        <div id="placeholder"></div>
    </div>
</template>

<script>
import load from '../Tinymce/dynamicLoadScript'
import axios from "axios";
const onlyofficeApi = 'https://125.124.160.201/web-apps/apps/api/documents/api.js'
export default {
    components: {

    },
    data() {
        return {
            docEditor : null,
        };
    },
    watch:{
        
    },
    created() {
        // 初始化界面之前获取数据
    },
    mounted() {
        // 界面显示完成后调用方法
        this.init();
    },
    methods: {
        init (){
            load(onlyofficeApi, (err) => {
                if (err) {
                    this.$message.error(err.message)
                    return
                }
                this.initOnlyOffice()
            })
        },
        initOnlyOffice(){
            let config = {
                "document":{
                "fileType":"docx",
                "key":"Khirz6zTPdfd7",
                "title":"示例文档 Title.docx",
                "url":"https://example.com/url -to-example-document.docx"
            },
                "documentType":"word",
                "editorConfig":{
                     "callbackUrl":"https://example.com/url-to-callback.ashx"
                }
            }
            this.docEditor = new DocsApi.DocEditor("placeholder", config);
        }
    },
};
</script>
<style lang="less" scoped>

</style>