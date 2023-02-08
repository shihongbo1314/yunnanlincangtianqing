<template>
  <!-- 信息提示 -->
  <div class="messageAlert">
    <div class="rightConfigTitle">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="item1" :name="item1" v-for="(item1, index1) in baseType" :key="index1">
          <div class="rightConfigInfo">
            <p class="title">{{messageType}}</p>
            <ul class="messageList">
              <li class="messageBox" v-for="(item, index) in message[item1][messageType]" :key="index">
                <div class="messageTitle">
                  <span>{{item.title}}</span>
                  <el-button type="primary">复制</el-button>
                </div>
                <div class="messageInfo">
                  {{item.info}}
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
   
  </div>
</template>

<script>
export default {
    data(){
        return{
          activeName : "现在",
          messageType : "能见度",
          baseType : ['过去', "现在", "未来"],
          message : {
            "过去" : {
              "能见度":[
                {
                  title : "红色I级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "蓝色IV级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "橙色II级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "黄色III级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "红色I级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "红色I级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                }
              ]
            },
            "现在" : {
              "能见度":[
                {
                  title : "红色I级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "橙色II级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "黄色III级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "蓝色IV级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "红色I级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "红色I级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                }
              ]
            },
            "未来" : {
              "能见度":[
                {
                  title : "橙色II级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "黄色III级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "蓝色IV级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "红色I级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "红色I级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                },{
                  title : "红色I级",
                  info : "G15-青岛段、G18-潍坊段、G20青岛-潍坊段、G22-青岛段、G25-临沂段、G3-枣庄市台儿段、G2516-东高市利津县、G2561-聊城市高唐县、G2561-滨州市宾州城",
                }
              ]
            }
          }
        }
    }
}
</script>
<style scoped>
.mapLayerConfig{
  margin-bottom: 10px;
}
.rightConfigTitle{
  font-size: 16px;
  color: #2D5A9D;
  letter-spacing: 0;
  text-align: justify;
  line-height: 32px;
  font-weight: 600;
}
.rightConfigTitle >>> .el-tabs__header {
    margin: 0;
    padding: 10px 10px 0;
    border-bottom: 1px solid #DFE2E4;
}
.rightConfigTitle >>> .el-tabs__nav {
  width: 100%;
  text-align: center;
}
.rightConfigTitle >>> .el-tabs__nav-wrap::after ,
.rightConfigTitle >>> .el-tabs__active-bar {
  display: none;
}
.rightConfigTitle >>> .el-tabs__item {
    padding: 0;
    width: 88px;
    text-align: center;
    font-size: 16px;
    color: #333;
    font-weight: 600;
    height: 32px;
    line-height: 32px;
    border-radius: 4px 4px 0px 0px;
    border: 1px solid #DFE2E4;
    border-bottom: none;
    margin: 0 2px;
}

.rightConfigTitle >>> .el-tabs__item.is-active {
    background: #DCECFF;
    border-radius: 4px 4px 0 0;
    color: #2D5A9D;
}
.rightConfigInfo{
  background: #F5F6F7;
  padding: 10px;
  line-height: 1;
}
.rightConfigInfo > .title {
    color: #3E87F4;
    letter-spacing: 0;
    text-align: justify;
    font-weight: 600;
    padding-left: 5px;
    border-left: 2px solid #3E87F4;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    margin: 0 0 10px;
}

ul.messageList {
    margin: 0;
    padding: 0;
    list-style: none;
    background: #fff;
    overflow: auto;
}

.messageBox {
    margin: 10px;
}

.messageTitle {
    background: #F2F8FF;
    border-radius: 4px 4px 0px 0px;
    padding: 5px;
    overflow: auto;
}

.messageTitle > span {
    font-size: 14px !important;
    margin-left: 5px;
    line-height: 24px;
}

.messageTitle >>> button {
    color: #2D5A9D;
    background: #DCECFF;
    padding: 4px 8px;
    float: right;
    margin-right: 5px;
    border: none;
}

.messageInfo {
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    text-align: justify;
    line-height: 24px;
    font-weight: 400;
    border: 1px solid #DFE2E4;
    padding: 10px;
}
</style>
