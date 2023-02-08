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
        <div class="text_btn">
            <!-- <el-button type="primary">上传</el-button>
            <el-button type="success">保存</el-button> -->
        </div>
        <div class="text_border">
            
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            selectIndex: 1,
            productList: [
                {id: 1, name: "国家智能网格预报"},
                {id: 2, name: "省台指导预报"},
                {id: 3, name: "市台指导产品"},
                {id: 4, name: "气候中心延伸期预报"},
                {id: 5, name: "国家气候中心中长期预测产品"},
                {id: 6, name: "国家级强对流天气预报指导产品"}                          
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