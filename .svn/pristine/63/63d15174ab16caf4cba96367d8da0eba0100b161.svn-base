<template>
  <div class="menu_index" style="width:100%; height:100%">

    <div class="config">
      <el-button :type="websockOpen ? 'danger' : 'success'" icon="el-icon-video-play" @click="openWebsocket">{{(websockOpen?'关闭':'启动') + '出图程序'}}</el-button>

      <el-button type="primary" icon="el-icon-warning" @click="textDemo">测试</el-button>
    </div>


      <!-- <cityImage /> -->

      <div class="cityImageBox">
        <cityImage class="cityImage"
          v-for="(item, index) in imgData" :key="index" 
          :jsonData="item"
          :jsonIndex="index"
          :success="saveImage"
           />
      </div>

  </div>
</template>

<script>
// @ is an alias to /src
import request from "../api/request.js";
import axios from "axios";
import cityImage from './cityImage.vue'
import qs from 'qs'
export default {
  components:{
    cityImage
  },
  data(){
    return{
        websock : null,
        websockOpen : false,
        imgData : [],
    }
  },
  created(){
    // 初始化界面之前获取数据
   // this.initMap();
  },
  mounted(){
    // 界面显示完成后调用方法
  },
  methods: {
    textDemo(){// 测试
      let json = {"width":1000,"height":700,"border":1,"title":[{"text":"测试标题信息","align":"center","top":10,"left":10,"fontSize":20}],"foot":[{"text":"请输入尾注","align":"right","top":10,"left":10,"fontSize":20}],"grid":{"top":10,"left":10,"right":10,"bottom":10},"region":[{"code":"370000","border":true,"style":{"fill":false,"weight":1,"color":"#ff0000"}},{"code":"370000_full","border":false,"style":{"fill":false,"weight":0.5,"color":"#666666"}}],"imageUrl":"http://61.153.185.211:8088/YANTAI_FILE/data/cimiss/data/164644545272710000-370000-NORMAL-null-TEM_Avg-warm_min_4-station.png","imageBounds":[[38.400557,122.705634],[34.377318,114.806026]],"legend":{"ONOFF":true,"type":"1","title":null,"util":null,"data":[{"val":"23","color":"#ffffff"}]},"marker":{"ONOFF":true,"data":[]}};
      let fileName = new Date().getTime() + '.png';
      json.fileName = fileName;
      let data = {"json":encodeURI(JSON.stringify(json)),"fileName":fileName};
      axios({
        method: 'post',
        url: 'http://61.153.185.211:9080/QirenTool/GetCityImage',
        data: qs.stringify(data)
      }).then((res) => {
         window.open('http://61.153.185.211:9080/QirenTool/image/' + fileName);
        this.$message(res.data == 1001 ? '测试成功' : '测试失败' + res.data)
      });
    },
    openWebsocket(){
      if(this.websockOpen){
        this.websock.close();
      }else{
        this.initWebSocket();
      }
    },
    initWebSocket(){ //初始化weosocket
      const wsuri = "ws://61.153.185.211:9080/QirenTool/websocket_cityImage";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      this.$message('启动成功！');
      this.websockOpen = true;
    },
    websocketonerror(){//连接建立失败重连
      this.websockOpen = false;
      this.$message('出图程序连接失败，正在重连！');
      this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收
      this.imgData.push(e.data);
    },
    websocketclose(e){  //关闭
      this.$message('出图程序关闭！');
      this.websockOpen = false;
    },
    saveImage(base64, fileName, index){
      let data = {"str":base64, fileName:fileName};
      axios({
        method: 'post',
        url: 'http://61.153.185.211:9080/QirenTool/SetBase64Image',
        data: qs.stringify(data)
      }).then((res) => {
        this.imgData.splice(index,1);
      });
    }
  }
}
</script>
<style scoped>
.config{
  position: absolute;
  top:10px;
  left: 10px;
  z-index: 9999;
}
.cityImageBox{
  width: 100%;
  height: 100%;
  position: relative;
}
.cityImage{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 99;
}
</style>
