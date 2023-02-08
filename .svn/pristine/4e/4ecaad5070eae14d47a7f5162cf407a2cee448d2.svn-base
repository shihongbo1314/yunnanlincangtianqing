// 待完成功能
// 地图上需要自定义geojson显示范围

// 图片的左边和下边经纬度刻度


// 数据和图例自定义
// 	数据是个二维数组，前端根据图例级别制作成图

// 站点值或标记位置值显示
// 	值的显示范围以及阈值
// 	值按照图例对应显示颜色

// 区域的geojson中提取标记名称和坐标


<template>
  <div class="menu_index" style="width:100%; height:100%">

    <!-- 主要显示 -->
    <div id="left">
      <div id="main" :style="'width: ' + data.width + 'px; height: '+ data.height + 'px'">
        <div class="mainPrint" ref="showMapImg">
          <div class="mainBorder" :style="'border: '+data.border+'px solid #000'">
            <div class="title">
              <div 
                v-for="(item, index) in data.title" 
                :key="index" 
              >
                <p v-if="item.isHTML" v-html="item.text"></p>
                <p v-else
                :style="'text-align:' + item.align + '; font-size: ' + item.fontSize + 'px; padding: ' + item.top + 'px ' + item.left + 'px 0px;'"
                >{{item.text}}</p>
              </div>
            </div>
            <div class="foot">
              <div 
                v-for="(item, index) in data.foot" 
                :key="index" 
              >
                <p v-if="item.isHTML" v-html="item.text"></p>
                <p v-else
                :style="'text-align:' + item.align + '; font-size: ' + item.fontSize + 'px; padding: 0 ' + item.left + 'px ' + item.top + 'px;'"
                >{{item.text}}</p>
              </div>
            </div>
            <div class="legend" v-if="data.legend.ONOFF" :class="'legendStyle' + data.legend.type">
              <p v-if="data.legend.title">{{data.legend.title}}</p>
              <p v-if="data.legend.title">{{data.legend.util}}</p>
              <ul class="legendUL">
                <li v-for="(item, index) in data.legend.data" :key="index">
                  <span class="color" :style="'background:' + item.color"></span>
                  <span class="value">{{item.val}}</span>
                </li>
              </ul>
            </div>
            <div ref="map" style="width:100%; height: 100%; background: #fff;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧 -->
    <div id="right">
      <el-form ref="form" :model="data" label-width="40px">
        <el-form-item label="宽度" style="display: inline-block; width: 45%; margin-right: 5%; margin-bottom: 0;">
          <el-input-number v-model="data.width" :precision="0" :step="10"  @change="boundsChange"></el-input-number>
        </el-form-item>
        <el-form-item label="高度" style="display: inline-block; width: 45%; margin-bottom: 0;">
          <el-input-number v-model="data.height" :precision="0" :step="10"  @change="boundsChange"></el-input-number>
        </el-form-item>
        <el-form-item label="距上" style="display: inline-block; width: 45%; margin-right: 5%; margin-bottom: 0;">
          <el-slider v-model="data.grid.top" @change="boundsChange"></el-slider>
        </el-form-item>
        <el-form-item label="距下" style="display: inline-block; width: 45%; margin-bottom: 0;">
          <el-slider v-model="data.grid.bottom" @change="boundsChange"></el-slider>
        </el-form-item>
        <el-form-item label="距左" style="display: inline-block; width: 45%; margin-right: 5%; margin-bottom: 0;">
          <el-slider v-model="data.grid.left" @change="boundsChange"></el-slider>
        </el-form-item>
        <el-form-item label="距右" style="display: inline-block; width: 45%; margin-bottom: 0;">
          <el-slider v-model="data.grid.right" @change="boundsChange"></el-slider>
        </el-form-item>
        <el-form-item label="边框" style="display: inline-block; width: 95%; margin-bottom: 0;">
          <el-slider v-model="data.border" @change="boundsChange"></el-slider>
        </el-form-item>
        <el-form-item 
          v-for="(item, index) in data.region" 
          :key="index" 
          label="区域" 
          style="display: inline-block; width: 95%; margin-bottom: 0;"
        >
          <el-input v-model="item.code" placeholder="请输入区域编码" style="width: 80%; margin-right: 10px;"  @change="initRegionBirder"></el-input>
          <el-button type="danger" icon="el-icon-delete" circle @click="data.region.splice(index,1); initRegionBirder() "></el-button>
          <el-form ref="form" :model="item" label-width="40px" style="padding-bottom: 0;">
            <el-form-item label="边界">
              <el-switch
                v-model="item.border"
                active-text="超出范围隐藏"
                inactive-text="" @change="initRegionBirder">
              </el-switch>
            </el-form-item>
            <el-form-item label="粗细" v-if="!item.isHTML" style="display: inline-block; width: 95%; margin-bottom: -15px;">
              <el-slider v-model="item.style.weight"  @change="initRegionBirder"></el-slider>
            </el-form-item>
            <el-form-item label="颜色" v-if="!item.isHTML" style="display: inline-block; width: 45%; margin-right: 5%; margin-bottom: -10px;">
               <el-input v-model="item.style.color" type="color"  @change="initRegionBirder"></el-input>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-button style="margin: 0 auto 10px; display: block;" type="primary" icon="el-icon-plus" @click="addRegion">添加区域</el-button>
        <el-form-item v-for="(item, index) in data.title" :key="index" :label="'标题'" style="margin-bottom: 0;">
          <el-input v-model="item.text" placeholder="请输入内容" style="width: 80%; margin-right: 10px;"></el-input>
          <el-button type="danger" icon="el-icon-delete" circle @click="data.title.splice(index,1); "></el-button>
          <el-form ref="form" :model="item" label-width="40px" style="padding-bottom: 0;">
            <el-form-item label="HTML">
              <el-switch
                v-model="item.isHTML"
                active-text="自定义格式"
                inactive-text="">
              </el-switch>
            </el-form-item>
            <el-form-item label="对齐" v-if="!item.isHTML">
              <el-radio-group v-model="item.align">
                <el-radio label="left">居左</el-radio>
                <el-radio label="center">居中</el-radio>
                <el-radio label="right">居右</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="大小" v-if="!item.isHTML" style="display: inline-block; width: 95%; margin-bottom: -15px;">
              <el-slider v-model="item.fontSize"></el-slider>
            </el-form-item>
            <el-form-item label="距上" v-if="!item.isHTML" style="display: inline-block; width: 45%; margin-right: 5%; margin-bottom: -10px;">
              <el-slider v-model="item.top"></el-slider>
            </el-form-item>
            <el-form-item label="左右" v-if="!item.isHTML" style="display: inline-block; width: 45%; margin-bottom: -10px;">
              <el-slider v-model="item.left"></el-slider>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-button style="margin: 0 auto 10px; display: block;" type="primary" icon="el-icon-plus" @click="addTitle">添加标题</el-button>
        <el-form-item v-for="(item, index) in data.foot" :key="index" :label="'尾注'" style="margin-bottom: 0;">
          <el-input v-model="item.text" placeholder="请输入内容" style="width: 80%; margin-right: 10px;"></el-input>
          <el-button type="danger" icon="el-icon-delete" circle @click="data.foot.splice(index,1); "></el-button>
          <el-form ref="form" :model="item" label-width="40px" style="padding-bottom: 0;">
            <el-form-item label="HTML">
              <el-switch
                v-model="item.isHTML"
                active-text="自定义格式"
                inactive-text="">
              </el-switch>
            </el-form-item>
            <el-form-item label="对齐" v-if="!item.isHTML">
              <el-radio-group v-model="item.align">
                <el-radio label="left">居左</el-radio>
                <el-radio label="center">居中</el-radio>
                <el-radio label="right">居右</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="大小" v-if="!item.isHTML" style="display: inline-block; width: 95%; margin-bottom: -15px;">
              <el-slider v-model="item.fontSize"></el-slider>
            </el-form-item>
            <el-form-item label="距底" v-if="!item.isHTML" style="display: inline-block; width: 45%; margin-right: 5%; margin-bottom: -10px;">
              <el-slider v-model="item.top"></el-slider>
            </el-form-item>
            <el-form-item label="左右" v-if="!item.isHTML" style="display: inline-block; width: 45%; margin-bottom: -10px;">
              <el-slider v-model="item.left"></el-slider>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-button style="margin: 0 auto 10px; display: block;" type="primary" icon="el-icon-plus" @click="addFoot">添加尾注</el-button>

        <el-form-item label="图片" style="margin-bottom: 10px;">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入图片地址"
            v-model="data.imageUrl" @change="initImage">
          </el-input>
        </el-form-item>
        <el-form-item label="范围" style="margin-bottom: 0;">
          <el-input
            style="width: 48%; margin-right: 4%; margin-bottom: 5px;"
            placeholder="请输入最大纬度"
            v-model="data.imageBounds[0][0]" @change="initImage">
          </el-input>
          <el-input
            style="width: 48%; margin-bottom: 5px;"
            placeholder="请输入最大经度"
            v-model="data.imageBounds[0][1]" @change="initImage">
          </el-input>
          <el-input
            style="width: 48%; margin-right: 4%;"
            placeholder="请输入最小纬度"
            v-model="data.imageBounds[1][0]" @change="initImage">
          </el-input>
          <el-input
            style="width: 48%;"
            placeholder="请输入最小经度"
            v-model="data.imageBounds[1][1]" @change="initImage">
          </el-input>
        </el-form-item>
        <el-form-item label="图例" style="margin-bottom: 0;">
          <el-switch
            v-model="data.legend.ONOFF"
            active-text="显示"
            inactive-text="">
          </el-switch>
          <el-form ref="form" :model="data.legend" label-width="40px" v-if="data.legend.ONOFF">
            <el-form-item label="位置">
              <el-radio-group v-model="data.legend.type">
                <el-radio label="1">居左</el-radio>
                <el-radio label="2">居右</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="data.legend.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="data.legend.util" placeholder="请输入单位"></el-input>
            </el-form-item>
            <ul class="legendConfig">
              <li v-for="(item, index) in data.legend.data" :key="index">
                  <el-input v-model="item.color" type="color" style="width: 80px; vertical-align: top;"></el-input>
                  <el-input v-model="item.val" placeholder="请输入值" style="width:80px; margin: 0 10px;"></el-input>
                  <el-button type="danger" icon="el-icon-delete" circle @click="data.legend.data.splice(index,1); "></el-button>
              </li>
            </ul>
            <el-button type="primary" icon="el-icon-plus" @click="addLegend" style="margin: 0 auto; display: block;">添加级别</el-button>
          </el-form>
        </el-form-item>
        <el-form-item label="标记" style="margin-bottom: 0;">
          <el-switch
            v-model="data.marker.ONOFF"
            active-text="显示"
            inactive-text="" @change="markerChange">
          </el-switch>
          <ul class="legendConfig" v-if="data.marker.ONOFF">
            <li v-for="(item, index) in data.marker.data" :key="index" style="margin-bottom: 10px;">
                <el-input class="latLngInput" placeholder="" v-model="item.lng" style="width: 45%; margin-right: 5%" @change="markerChange">
                  <template slot="prepend">经度</template>
                </el-input>
                <el-input class="latLngInput" placeholder="" v-model="item.lat" style="width: 45%" @change="markerChange">
                  <template slot="prepend">纬度</template>
                </el-input>
                <el-input v-model="item.name" placeholder="请输入名称" style="width:250px; margin: 5px 5px 5px 0;" @change="markerChange"></el-input>
                <el-button type="danger" icon="el-icon-delete" circle @click="data.marker.data.splice(index,1); "></el-button>
            </li>
          </ul>
          <div style="text-align: center;">
            <el-button type="primary" icon="el-icon-plus"  @click="addMarkerMap" >点击地图添加标记</el-button>
          </div>
        </el-form-item>
      </el-form>
      <hr>
      <div style="text-align: center; margin-bottom: 10px;">
        <el-button type="primary"  @click="saveImage" >保存图片</el-button>
        <el-button type="primary"  @click="JSONDialog = true" >查看JSON</el-button>
      </div>
    </div>

<el-dialog
  title="JSON信息"
  :visible.sync="JSONDialog"
  width="80%"
  :before-close="handleClose">
 <json-viewer :value="data" copyable theme="my-awesome-json-theme"></json-viewer>
</el-dialog>

  </div>
</template>

<script>
// @ is an alias to /src
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import axios from "axios";
import domtoimage from "dom-to-image";

  import JsonViewer from 'vue-json-viewer'
export default {
  components:{
    JsonViewer
  },
  props: {
      jsonData : {// 需要处理的数据
        type : String,
        default: null,
      },
      jsonIndex : {// 处理数据的下标
        type : Number,
        default: 0,
      },
      success : {// 出图完成调用方法
        type : Number,
        default: function (data) {
          // this为空
          console.log("子组件", data, "this", this);
        },
      },
  },
  watch: {
    loading (newVal){ // 加载状态变动
      if(newVal == 2){ // 加载完毕
        this.saveBase64();
      }
    },
  },
  data(){
    return{
        JSONDialog : false,
        map : null,
        mapClick : false,
        markerLayer : null,
        regionLayer : null,
        imgLayer : null,
        regionBorderLayer : null,
        showBounds : null,
        regionJSON : {},
        loading : 0, // 默认加载数据状态
        data : {
          width: 1000,
          height: 700,
          border: 1,
          title : [// 标题
            {
              text : "请输入标题",
              align : 'center',
              top : 10,
              left: 10,
              fontSize : 20
            }
          ],
          foot : [// 尾注
            {
              text : "请输入尾注",
              align : 'right',
              top : 10,
              left: 10,
              fontSize : 20
            }
          ],
          grid:{
            top : 10,
            left : 10,
            right: 10,
            bottom: 10
          },
          region : [// 显示区域
            {
              code : '370000',
              border : true,
              style : {
                fill : false,
                weight : 1,
                color : '#000000'
              }
            },
            {
              code : '370000_full',
              border : false,
              style : {
                fill : false,
                weight : 0.5,
                color : '#666666'
              }
            }
          ],
          imageUrl : 'http://61.153.185.211:8088/YANTAI_FILE/data/cimiss/data/164644545272710000-370000-NORMAL-null-TEM_Avg-warm_min_4-station.png',// 叠加图片地址
          imageBounds : [[38.400557, 122.705634],[34.377318, 114.806026]], // 叠加图片显示范围
          legend : { // 图例
            ONOFF : true,
            type : '1',
            title:null,
            util : null,
            data : [
              {val : '23', color : "#ffffff"},
            ]
          },
          marker : {// 标记
            ONOFF : true,
            data : []
          }
        }
    }
  },
  created(){
    // 初始化界面之前获取数据
   // this.initMap();
    if(this.jsonData != null){
      this.data = JSON.parse(this.jsonData);
    }
  },
  mounted(){
    // 界面显示完成后调用方法
    this.initMap();
    this.initRegionBirder();
    this.initImage();
    this.markerChange();
  },
  methods: {
      initMap (){// 初始化网格预报 预报间隔的数据时间
        let _this = this;
        this.map = L.map(this.$refs["map"], {
            zoomSnap : 0.1, // 缩放倍数
            zoomControl: false, //禁用 + - 按钮
            doubleClickZoom: false, // 禁用双击放大
            attributionControl: false, // 移除右下角leaflet标识
            dragging : false, // 禁止拖动
            keyboard : false, // 禁止键盘
            scrollWheelZoom : false, // 禁止鼠标放大缩小
        });
        this.map.on("click", function(ev){
          if(!_this.mapClick){
            return;
          }
          _this.mapClick = false;
          _this.data.marker.data.push({
            name : '名称',
            lat : ev.latlng.lat,
            lng : ev.latlng.lng
          })
          _this.markerChange();
        })
        // this.map.fitBounds(this.data.imageBounds);
      },
      initRegionBirder(){// 初始化地图边界
        this.$message('重置边界')
        if(this.regionLayer != null){
          this.regionLayer.clearLayers();
        }else{
          this.regionLayer = L.layerGroup();
          this.regionLayer.addTo(this.map);
        }
        if(this.regionBorderLayer != null){
          this.regionBorderLayer.clearLayers();
        }else{
          this.regionBorderLayer = L.layerGroup();
          this.regionBorderLayer.addTo(this.map);
        }
        let num = 0;
        let count = this.data.region.length;
        let _this = this;
        let borderJSON = null;
        let next = function(){
          let bounds = null;
          _this.data.region.forEach(region=>{
            let layer = L.geoJSON(_this.regionJSON[region.code], {
              style: function () {
                return region.style;
              },
              pane : "shadowPane"
            })
            layer.addTo(_this.regionLayer);
            if(bounds == null){
              bounds = layer.getBounds();
            }else{
              bounds.extend(layer.getBounds());
            }
            if(region.border){
              // 当前行政区域
              let regionJSON = JSON.parse(JSON.stringify(_this.regionJSON[region.code]));
              if(borderJSON == null){
                borderJSON = {
                  type: "FeatureCollection",
                  features : [
                    {
                      type: "Feature",
                      geometry : {
                        type: "MultiPolygon",
                        coordinates : [[[[180, 85], [180, -85],[-180, -85], [-180, 85]]], []]
                      }
                    }
                  ]
                };
              }
              regionJSON.features.forEach(arr1=>{
                arr1.geometry.coordinates.forEach(arr2=>{
                  arr2.forEach(arr=>{
                    borderJSON.features[0].geometry.coordinates[1].push(arr);
                  })
                })
              })
            }
          })
          if(borderJSON){
            let layer = L.geoJSON(borderJSON, {
              style: {
                fillColor : '#fff',
                fill : true,
                fillOpacity : 1,
                stroke : false
              },
              pane : "overlayPane"
            })
            layer.addTo(_this.regionBorderLayer);
          }
          _this.showBounds = bounds;
          _this.boundsChange();
        }
        this.data.region.forEach(region=>{
          if(_this.regionJSON[region.code]){
            num ++;
            if(num == count){
              next();
            }
            return;
          }
          axios.get('http://61.153.185.211:9080/QirenTool/GetRegionCodeJson?code=' + region.code).then((res) => {
            _this.regionJSON[region.code] = res.data;
            num ++;
            if(num == count){
              next();
            }
          });
        })
      },
      initImage(){
        // 图片需要从服务器从新加载
        axios.get('http://61.153.185.211:9080/QirenTool/GetImageForURL?url=' + this.data.imageUrl).then((res) => {
          if(this.imgLayer != null){
            this.imgLayer.setBounds(this.data.imageBounds);
            this.imgLayer.setUrl('http://61.153.185.211:9080/QirenTool/image/' + res.data);
          }else{
            this.imgLayer = L.imageOverlay('http://61.153.185.211:9080/QirenTool/image/' + res.data, this.data.imageBounds, {
              pane : "tilePane"
            });
            this.imgLayer.addTo(this.map);
          }
          this.loading ++;
        });
      },
      addTitle(){// 添加标题
        this.data.title.push({
          text : "请输入标题",
          align : 'center',
          top : 10,
          left: 10,
          fontSize : 20
        })
      },
      addFoot(){// 添加尾注
        this.data.foot.push({
          text : "请输入尾注",
          align : 'right',
          top : 10,
          left: 10,
          fontSize : 20
        })
      },
      boundsChange(){// 图形边界调整
        this.map.invalidateSize();
        this.map.fitBounds(this.showBounds, {
          paddingTopLeft : [this.data.grid.left, this.data.grid.top],
          paddingBottomRight : [this.data.grid.right, this.data.grid.bottom]
        });
        this.loading ++;
      },
      addLegend(){// 添加一个图例颜色值
        this.data.legend.data.push({
          val : 0,
          color : '#ffffff'
        })
      },
      addMarkerMap(){ // 添加一个标记
        this.mapClick = true;
        this.$message('请在地图点击选择位置！');
      },
      markerChange(){
        if(this.markerLayer != null){
          this.markerLayer.clearLayers();
        }else{
          this.markerLayer = L.layerGroup();
          this.markerLayer.addTo(this.map);
        }
        if(!this.data.marker.ONOFF){
          return;
        }
        this.data.marker.data.forEach(item=>{
          let marker = L.marker([item.lat, item.lng],{
            icon : L.divIcon({
              iconSize: [20, 20],
              iconAnchor: [10, 10],
              html : '<span>' + item.name + '</span>',
              className : 'markerPoint'
            }),
            draggable : true
          })
          marker.on("moveend", function(){
            let latlng = marker.getLatLng();
            item.lat = latlng.lat;
            item.lng = latlng.lng;
          })
          marker.addTo(this.markerLayer);
        })
      },
      addRegion(){// 添加区域
        this.data.region.push({
          code : '370000',
          border : false,
          style : {
            fill : false,
            weight : 1,
            color : '#000000'
          }
        })
        this.initRegionBirder();
      },
      saveImage(){
        var vv = this.$refs.showMapImg;
        domtoimage.toPng(vv).then((dataUrl) => {
          //保存图片
          var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          save_link.href = dataUrl;
          save_link.download = "save.png";
          var event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          save_link.dispatchEvent(event);
        });
      },
      saveBase64(){
        let _this = this;
        var vv = this.$refs.showMapImg;
        domtoimage.toPng(vv).then((dataUrl) => {
          //保存图片
          _this.success(dataUrl, _this.data.fileName, _this.jsonIndex);
        });
      }
  }
}
</script>
<style scoped>
#left{
  width: calc(100% - 400px);
  height: 100%;
  overflow: auto;
  position: relative;
  border-right: 1px solid #ccc;
  background: #eee;
  display: inline-block;
}
#main{
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.mainPrint ,
.mainBorder {
  width: 100%;
  height: 100%;
  position: relative;
}
#main .title{
  position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    color: #000;

}
#main .title P{
  margin: 0;
  line-height: 1.1;
}
#main .foot{
  position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    color: #000;

}
#main .foot P{
  margin: 0;
  line-height: 1.1;
}
#right{
  display: inline-block;
  width: 400px;
  height: 100%;
  vertical-align: top;
  overflow: auto;
}
#right >>> .el-form{
  padding: 10px;
}
#right >>> .el-form-item .el-form-item--small{
  margin-bottom: 0;
}
ul.legendConfig {
    list-style: none;
    margin: 10px;
    padding: 0;
}
.legend {
    position: absolute;
    z-index: 9999;
    text-align: center;
}

.legend.legendStyle1 {
    bottom: 10px;
    left: 10px;
}


.legend.legendStyle2 {
    bottom: 10px;
    right: 10px;
}


ul.legendUL {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    display: inline-block;
}

.legend > p {
    margin: 0;
    text-align: center;
}

ul.legendUL .color {
    width: 30px;
    height: 25px;
    display: inline-block;
    border: 0.5px solid #000;
    margin-right: 5px;
    vertical-align: bottom;
    border-bottom: none;
}

ul.legendUL .val {
    vertical-align: bottom;
    line-height: 25px;
    white-space: nowrap;
}

ul.legendUL li:last-child .color {
    border-bottom: 1px solid #000;
}

ul.markerConfig li+li {
    margin-top: 5px;
}
.latLngInput >>> .el-input-group__prepend {
    padding: 0 10px;
}

#left >>> .markerPoint:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5px;
    height: 5px;
    background: #333;
    border-radius: 99px;
}

#left >>> .markerPoint > span {
    position: absolute;
    bottom: 12px;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    color: #000;
    text-shadow: 0 0 2px white;
    left: 50%;
    transform: translateX(-50%);
}
</style>
