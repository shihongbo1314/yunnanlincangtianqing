//上传txt文件配置
export const txtFileSetting={
    beforeCreate() {
        // 读取文件
        FileReader.prototype.reading = function ({encode} = pms) {
            let bytes = new Uint8Array(this.result);    //无符号整型数组
            let text = new TextDecoder(encode || 'UTF-8').decode(bytes);
            return text;
        };
        /* 重写readAsBinaryString函数 */
        FileReader.prototype.readAsBinaryString = function (f) {
            if (!this.onload)       //如果this未重写onload函数，则创建一个公共处理方式
                this.onload = e => {  //在this.onload函数中，完成公共处理
                    let rs = this.reading();
                    console.log(rs);
                };
            this.readAsArrayBuffer(f);  //内部会回调this.onload方法
        };
    },
    methods:{
        beforeUpload(file){//上传txt文件
            let nameArr = file.name.split(".")
            if(nameArr[nameArr.length-1]!="txt"){
                this.$message.error("请选择txt文件进行上传")
                return
            }
            this.fileList = [file]
            // 读取数据
            this.read(file);
            return false
        },
        read(f) {//读取txt文件内容
            let rd = new FileReader();
            rd.onload = e => {  
            //this.readAsArrayBuffer函数内，会回调this.onload函数。在这里处理结果
                let cont = rd.reading({encode: 'UTF-8'});
                this.value = cont
            };
            rd.readAsBinaryString(f);
        }
    }
}