<template>
  <div class="txtProduct">
    <!-- 所有产品列表 -->
    <div class="txtLeft">
        <ul>
            <li v-for="p in productList" :key="p.id" :class="selectIndex==p.id?'active':''" @click="selectIndex = p.id">
                {{p.name}}
            </li>
        </ul>
    </div>
    <!-- 产品制作部分 -->
    <div class="txtRight">
        
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            selectIndex: 1,
            productList: [
                {id: 1, name: "人体舒适度"},
                {id: 2, name: "紫外线强度"},
                {id: 3, name: "旅游气象指数"},
                {id: 4, name: "空气质量"},
                {id: 5, name: "森林火险等级"},
                {id: 6, name: "穿衣指数"}                          
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.txtProduct{
    display: flex;
    height: 100%;
    .txtLeft{
        height: 100%;
        color: #333;
        width: 300px;
        border-right: 1px solid #ADB3BB;
        ul{
            list-style: none;
            margin: 0;
            padding: 0;
            li{
                padding: 15px 20px;
                border-bottom: 1px solid #EBEEF5;
                cursor: pointer;
            }
            li.active{
                background: #DCECFF;
                color: #2D5A9D;
                font-weight: bold;
            }
        }
    }
    .txtRight{
        flex-grow: 1;
        height: 100%;
        .text_btn{
            padding: 20px;
        }
        .text_border{
            flex-grow: 1;
        }
    }
}
</style>