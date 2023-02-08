<template>
    <div class="empty">
       <el-empty :description="description"></el-empty>
    </div>
</template>

<script>
export default {
    name: "Empty",// 空页面
    props: {
        "description":{
            type: String,
            default: "暂无数据"
        }
    },
}
</script>

<style lang="scss" scoped>
.empty {
    height: 100%;
    position: relative;
    .el-empty{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>