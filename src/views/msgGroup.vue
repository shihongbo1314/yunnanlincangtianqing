<template>
  <div class="leftRight">
      <div class="left">
          <treeGroup/>
      </div>
      <div class="right">
          <peopleGroup/>
      </div>
  </div>
</template>

<script>
import treeGroup from "../components/msgGroup/treeGroup.vue"
import peopleGroup from "../components/msgGroup/peopleGroup.vue"
export default {
    components:{ treeGroup,peopleGroup},
}
</script>

<style lang="less" scoped>
.leftRight{
    display: flex;
    height: 100%;
    &>div{
        height: 100%;
    }
    .left{
        width: 300px;
        padding: 10px;
        background:#fff;
    }
    .right{
        flex: 1;
        background: #f5f6f7;
        padding: 16px;
    }
}
</style>>