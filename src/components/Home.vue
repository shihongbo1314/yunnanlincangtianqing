/* 主体框架 */
<template>
  <div style="width:100%; height: 100%;">
    <v-header></v-header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import vHeader from "./Header.vue"
export default {
  name: "Home",
  components:{
    vHeader
  },
  data(){
    return{
      
    }
  },
  created(){
  },
  mounted(){
 
	},
  methods:{
    
  }
}
</script>

<style scoped>
.mainHome{
  width: 100%;
  height: 100%;
}
.content{
  width: 100%;
  height: calc(100% - 56px);  
}
</style>