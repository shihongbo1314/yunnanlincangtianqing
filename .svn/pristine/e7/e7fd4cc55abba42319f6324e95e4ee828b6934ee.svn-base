<template>
  <div class="menu_wxyt">
    <el-container class="content_container">
      <el-aside width="400px" class="wxyt_left">
        <div class="left_middle">
          <el-row>
            <el-col :span="9"><span class="firstSpan">产品名称</span></el-col>
            <el-col :span="5"><span>审核状态</span></el-col>
            <el-col :span="5"><span>产品状态</span></el-col>
            <el-col :span="5"><span>往期材料</span></el-col>
          </el-row>         
        </div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :name="index+1" v-for="(item,index) in collapseList" :key="index">
            <template slot="title">
              <icon :name="item.icon" scale="3" style="margin-right: 4px"></icon>{{item.name}}
            </template>
            <cTable :data="item" />
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-main class="wxyt_right">
          <div class="main_top">
            产品制作 > 订制化产品 > 查看往期
          </div>
          <div class="main-bottom">
            <cPast/>
          </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import cTable from "../components/product/table.vue"
import cPast from "../components/product/past.vue"
export default {
  components: {
    cTable,
    cPast
  },
  data(){
    return{
      input: '',
      activeNames: [1,2],
      collapseList: [
        {name: '订制化产品',icon: 'customize',data: 8},
        {name: '专项服务材料',icon: 'special',data: 4},
        {name: '日常服务产品',icon: 'dailyService',data: 4},
        {name: '非定时产品',icon: 'untimed',data: 4}
      ],
      menuShow: false,
      tableShow: true
    }
  },
  created(){
    // 初始化界面之前获取数据
    this.$store.state.productType = null;
  },
  mounted(){
    // 界面显示完成后调用方法
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>
<style scoped>
.menu_wxyt{
  width: 100%;
  height: 100%;
}
.menu_wxyt .content_container{
  width: 100%;
  height: 100%;
}
.wxyt_left{
  border-right: 1px solid #ADB3BB;
}
::v-deep  .el-collapse-item__header{
  background: #DCECFF;
  font-size: 18px;
  color: #2D5A9D;
  font-weight: 600;
  padding-left: 20px;
}
.left_top{
  padding: 8px 16px;
}
.left_middle{
  margin-bottom: 8px;
}
.left_middle span{
  font-size: 14px;
  color: #ADB3BB;
  display: inline-block;
  width: 100%;
  text-align: center;
  border-left: 1px solid #ADB3BB;
}
.left_middle span.firstSpan{
  border: 0;
}
/* 主要内容 */
.wxyt_right{
  background: #f5f6f7;
  padding: 0;
}
.main_top{
  background: #fff;
  height: 48px;
  line-height: 48px;
  color: #2D5A9D;
  padding-left: 16px;
}
.main-bottom{
  height: calc(100% - 48px);
  overflow: auto;
  padding-top: 16px;
}
.templateDiv{
  width: 100%;
  height: 100%;
  position: relative;
}
.menuBtn{
  position: absolute;
  bottom: 80px;
  right: 80px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: linear-gradient(180deg, #72BCFA 0%, #3E87F4 100%);
  border: 2px solid rgba(255,255,255,1);
  box-shadow: 0px 0px 10px 6px rgba(212,220,232,0.78);
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
  cursor: pointer;
}
.menuBtn>div{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
}
.menuList{
  position: absolute;
  bottom: 184px;
  right: 40px;
  width: 160px;
}
.menuList>ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
.menuList>ul>li{
  height: 40px;
  line-height: 40px;
  background: #eef6ff;
  padding-left: 8px;
  border: 1px solid #bacbde;
  border-bottom: 0;
  color: #446ca9;
}
.menuList>ul>li:last-child{
  border-bottom: 1px solid #bacbde;
}
.menuList>ul>li.active{
  background: #3e87f4;
  color: #fff;
}
</style>