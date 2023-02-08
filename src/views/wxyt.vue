<template>
  <div class="menu_wxyt">
    <!-- <span>   卫星云图</span>
    <video id="video2" height="210" autoplay="true" muted="muted" controls></video>
    <video ref="video" autoplay="autoplay" muted="muted" controls="controls"></video>
    <div id="shexiangtou">
      <div :class="listIndex == index ? 'active' : ''" v-for="(item, index) in list" :key="index" @click="showVideo(index)">
        <p>{{item.type == 1 ? 'webcocket' : 'M3U8-TS'}}</p>
        <p>cameraId：{{item.cameraId}}</p>
        <p>cameraCode：{{item.cameraCode}}</p>
        <p>cameraName：{{item.cameraName}}</p>
        <p>ownSection：{{item.ownSection}}</p>
        <p>ip：{{item.ip}}</p>
        <p>port：{{item.port}}</p>
        <p>captureFrequency：{{item.captureFrequency}}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
let Hls = require('hls.js');
import Wfs from "../assets/api/wfs.js";
import axios from "axios";
export default {
  data(){
    return{
      wfs : null,
      hls : '',
      listIndex : null,
      list : [// 摄像头列表
      ]
    }
  },
  created(){
    // 初始化界面之前获取数据
   // this.initMap();
   this.initList(1, 1);
   this.initList(1, 2);
  },
  mounted(){
    // 界面显示完成后调用方法
    // this.initMap();
  },
  methods: {
    initList (isAble, type){
      let url = 'https://yqk.bj.cn/camera/camera/list?isAble=' + isAble + '&type=' + type
      axios.get(url).then((res) => {
          console.log(res)
          if(res.status == 200 && res.data.state == 200){
            this.list = this.list.concat(res.data.records);
          }
      });
    },
    closeVideo(){
      if(this.listIndex == null){
        return;
      }
      let obj = this.list[this.listIndex];
      if(obj.type == 1){
        // webcocket方式播放
        if(this.websock){
          this.websock.close();
          this.websock = null;
        }
      }else{
        // M3U8-TS方式播放
        //this.$message('M3U8-TS方式播放');
      }
    },
    showVideo (index){
      if(this.listIndex == index){
        return;
      }
      this.closeVideo();
      this.listIndex = index;
      let obj = this.list[index];
      if(obj.type == 1){
        // webcocket方式播放
        const wsuri = "wss://yqk.bj.cn/camera/player/" + this.list[this.listIndex].cameraCode;
        // const wsuri = "ws://58.59.29.50:15012/play2?id=" + this.list[this.listIndex].cameraCode;
        this.wfs = new Wfs();
         var video = document.getElementById("video2");
        this.wfs.attachMedia(video, "ch1", "H264Raw", wsuri);
        // this.initWebSocket(obj.cameraCode);
        this.$message('webcocket方式播放');
      }else{
        // M3U8-TS方式播放
        let url = 'https://yqk.bj.cn/camera/camera/live/url?cameraId=' + obj.cameraId;
        axios.get(url).then((res) => {
            // if(res.status == 200 && res.data.state == 200){
              this.hlsPlay(res.data.records);
            // }
        });
        this.$message('M3U8-TS方式播放');
      }
    },
    hlsPlay(url){
      // url = 'http://60.208.121.230:9980/live/509017226_37010000001311007494_0_0.m3u8'
      if (Hls.isSupported()) {
          this.hls = new Hls();
          this.hls.loadSource(url);
          this.hls.attachMedia(this.$refs.video);
          this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            this.$message('加载成功');
            this.$refs.video.play();
          });
          this.hls.on(Hls.Events.ERROR, () => {
            // console.log(event, data);
            // 监听出错事件
            this.$message('加载失败');
          });
        }
    }
  }
}
</script>
<style scoped>
#shexiangtou div {
    display: inline-block;
    margin: 20px;
    border: 2px solid #000;
    padding: 10px;
}

#shexiangtou div.active {
    background: #eee;
    border: 2px solid green;
}

.menu_wxyt {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>