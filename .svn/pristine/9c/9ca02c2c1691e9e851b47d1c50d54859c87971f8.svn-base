<template>
    <div
        class="mylegend"
        :style="`height:${height} + px`"
    >
        <div class="title">图例</div>
        <div
            v-if="unit"
            class="title"
        >{{ unit }}</div>
        <div class="content">
            <div
                v-for="(item, i) in list"
                :key="i"
                class="item"
            >
                <div
                    class="item-color"
                    :style="`background:rgb(${item.r},${item.g},${item.b})`"
                ></div>
                <div class="item-label">{{ item.value}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyLegend",
    props: {
        width: {
            type: Number,
            default: 180,
        },
        height: {
            type: Number,
            default: 220,
        },
        itemWidth: {
            type: Number,
            default: 90,
        },
        title: {
            type: String,
        },
        unit: {
            type: String,
        },
        flog: {
            type: Boolean,
        },
        list: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            number: null,
            disabled: false,
            disabledMore: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.tableBottomHide {
    .mylegend {
        bottom: 50px;
    }
}
.mylegend {
    /*  width: 88px; */
    /*  height: 240px; */
    background: rgba(241, 243, 248, 0.8);
    border: 1px solid #ececec;
    border-radius: 4px;
    position: absolute;
    right: 15px;
    bottom: 15px;
    z-index: 1001;
}
.title {
    margin: 5px;
    white-space: nowrap;
    text-align: center;
     font-size: 14px !important;
        color: #333333;
}
.content {
    /* flex-wrap: wrap; */
}
.item {
    align-items: center;
    padding: 0 5px;
    width: 100%;
    height: 18px;
    &-color {
        width: 30px;
        height: 18px;
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
    }
    &-label {
        white-space: nowrap;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px !important;
        color: #333333;
    }
}
.active,
.activeMore {
    background: rgba(255, 0, 0, 0.3);
}
</style>