<template>
  <div class="addr">
    您当前所选择的区域：<el-button type="text" icon="el-icon-map-location">{{addr}}</el-button>
    <span v-if="changeShow" @click="openList">[切换城市]</span>
  </div>
</template>

<script>
import cityFullJSON from "../../assets/map/530900_full.json";
export default {
  props: ["addrListShow"],
  data(){
    return{
      userData: null,
      addr: '临沧市',
      changeShow: true
    }
  },
  created(){
    let user = localStorage.getItem('lcqxfzjz')
    if(user){
      this.userData = JSON.parse(user)
      this.init()
    }
  },
  methods:{
    init(){
      if(this.userData.userRegion.id == 2){
        this.changeShow = false
      }
      cityFullJSON.features.forEach(item=>{
        let {properties:proper} = item
        if(proper.name ==  this.userData.userRegion.name){
          if(proper.name.includes("自治")){
            this.addr = proper.name.substring(0,2)+"县"
          }else{
            this.addr = proper.name
          }          
        }
      })
    },
    openList(){
      this.$emit("update:addrListShow", true)
    }
  }
}
</script>
<style scoped>
.addr{
  width: 350px;
  padding-left: 10px;
  padding-top: 3px;
}
.addr p{
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  line-height: 22px;
  font-weight: 400;
  margin: 4px 0 0;
  text-align: center;
}
.addr >>> .el-button--text{
  color: #025DF4;
  font-size: 16px;
  padding: 2px 5px;
  font-weight: 600;
  cursor: default;
}
.addr >>> .el-button--text i{
  font-size: 22px;
}
.addr span{
  font-size: 16px;
  color: #025DF4;
  letter-spacing: 0;
  text-align: justify;
  line-height: 24px;
  font-weight: 400;
  text-decoration: underline;
  cursor: pointer;
}
</style>
