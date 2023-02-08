<template>
    <div class="mainContent">
        <div class="content">
            <div class="content_left">
                <el-card class="box_card">
                    <el-form ref="form" label-width="80px">
                        <el-form-item label="天气现象">
                            <el-select
                                v-model="form.weatherPhe"
                                filterable
                                placeholder="请选择天气现象"
                            >
                                <el-option
                                v-for="item in $store.state.weatherPheList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="最高温">
                            <el-input-number v-model="form.maxTem"></el-input-number>
                        </el-form-item>
                        <el-form-item label="最低温">
                            <el-input-number v-model="form.minTem"></el-input-number>
                        </el-form-item>
                        <el-form-item label="湿度">
                            <el-input-number
                                v-model="form.humidity"
                                :mix="0"
                                :max="100"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item label="风向">
                            <el-input v-model="form.windDir"></el-input>
                        </el-form-item>
                        <el-form-item label="风级">
                            <el-select
                                v-model="form.windLevel"
                                filterable
                                placeholder="请选择风级"
                            >
                                <el-option
                                v-for="item in windLevelList"
                                :key="item"
                                :label="item + '级'"
                                :value="item"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="舒适度">
                            <el-input v-model="form.confort"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="medium" type="primary" @click="saveData">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
            <div class="content_right">
                <el-card class="box_card">
                    <div class="downloadBtn">
                        <el-button size="medium" type="warning" @click="handleDownImage"
                        >下载</el-button
                        >
                    </div>
                    <div class="downloadImg">
                        <div id="imageDiv">
                            <img :src="weatherIcon" />
                            <p>{{ weatherName }}</p>
                            <h2>
                                {{ form.minTem != "" ? form.minTem : "-" }} ~
                                {{ form.maxTem != "" ? form.maxTem : "-" }}℃
                            </h2>
                            <ul>
                                <li>
                                <icon
                                    name="wind"
                                    scale="2.5"
                                    class="icon"
                                    style="color: darkorange"
                                ></icon
                                >{{ form.windDir }} {{ form.windLevel }}级<i></i>
                                </li>
                                <li>
                                <icon
                                    name="hum"
                                    scale="2.5"
                                    class="icon"
                                    style="color: blue"
                                ></icon
                                >湿度：{{ form.humidity }}%<i></i>
                                </li>
                                <li>
                                <icon name="confort" scale="2.5" class="icon"></icon
                                >舒适度：{{ form.confort }}
                                </li>
                            </ul>
                            <div class="image_unit">临沧市气象台发布</div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import domtoimage from "dom-to-image"
import service from "@/api/request"
export default {
    data() {
        return {
            form: {
                weatherPhe: 0,
                maxTem: "25",
                minTem: "15",
                humidity: 80,
                windDir: "东风",
                windLevel: 0,
                confort: "早晚感觉较舒适"
            },
            windLevelList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
    },
    computed: {
        weatherIcon() {
            return require(`../../assets/img/weatherIcon/${Number(
                this.form.weatherPhe
            )}.png`)
        },
        weatherName() {
            let name = ""
            this.$store.state.weatherPheList.forEach((element) => {
                if (element.code == this.form.weatherPhe) {
                    name = element.name
                }
            });
            return name
        },
    },
    created(){
        this.getData()
    },
    mounted() {
        
    },
    methods: {
        getData() {//获取数据
            service.post("/productWeatherEight/getWeather").then((res) => {
                if(res.data.state==200){
                    this.jsonId = res.data.records.id
                    this.form = JSON.parse(res.data.records.jsonContent)
                }               
            })
        },
        saveData() {//保存数据
            let data = JSON.stringify(this.form)
            service.post("/productWeatherEight/saveOrUpdate",{
                jsonContent: data,
                id: this.jsonId,
            }).then((res) => {
                if(res.data.state==200){
                    if(res.data.state == 200) {
                        this.$message.success("保存成功")
                    }else{
                        this.$message.error("保存失败")
                    }
                }               
            })
        },
        handleDownImage() {//下载图片        
            let _this = this
            domtoimage.toPng(document.getElementById("imageDiv")).then((dataUrl) => {
                var img = new Image();
                img.onload = function () {
                    var data = this.getAttribute("src");
                    var filename = "下载.jpg";
                    var save_link = document.createElementNS(
                    "http://www.w3.org/1999/xhtml",
                    "a"
                    );
                    save_link.href = data;
                    save_link.download = filename;
                    var event = document.createEvent("MouseEvents");
                    event.initMouseEvent(
                    "click",
                    true,
                    false,
                    window,
                    0,
                    0,
                    0,
                    0,
                    0,
                    false,
                    false,
                    false,
                    false,
                    0,
                    null
                    );
                    save_link.dispatchEvent(event);
                };
                img.src = dataUrl;
            }).catch(function (error) {
                _this.$message.error("下载失败!");
            })
        },
    },
};
</script>

<style lang="less" scoped>
.mainContent {
  height: 100%;
}
.content {
  height: 100%;
  display: flex;
  padding: 16px;
  & .box_card {
    height: 100%;
  }
  .content_left {
    width: 300px;
  }
  .content_right {
    flex: 1;
    padding-left: 16px;
    .box_card {
      position: relative;
      .downloadBtn {
        position: absolute;
        right: 20px;
        top: 20px;
      }
      .downloadImg {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      #imageDiv {
        min-width: 600px;
        max-width: 100%;
        background: linear-gradient(to bottom, #3b90d1, #87c5f8);
        color: #fff;
        text-align: center;
        padding: 30px 30px 60px;
        h2 {
          margin: 0;
          margin-bottom: 20px;
        }
        p {
          margin: 10px;
        }
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: inline-block;
          white-space: nowrap;
          &::after {
            content: "";
            display: block;
            clear: both;
          }
          li {
            display: inline-block;
            padding: 0 10px;
            position: relative;
            .icon {
              vertical-align: middle;
              margin-right: 5px;
            }
            i {
              position: absolute;
              right: -2px;
              height: 15px;
              width: 2px;
              background: rgba(255, 255, 255, 0.6);
              top: 50%;
              transform: translateY(-50%);
            }
          }
          li:last-child {
            border: 0;
          }
        }
        .image_unit {
          text-align: right;
          margin-top: 20px;
          letter-spacing: 3px;
        }
      }
    }
  }
}
</style>