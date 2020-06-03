<template>
    <div>
        <header :class="['qg-header','qg-box']">
            <div class="qg-header-left qg-box qg-flex-1">
                <slot name="left">
                    <img @click="handleBack" qg-log="返回" class="qg-header-back" src='../assets/arrow-left@2X.png' v-if="this.back">
                    </img>
                    <div @click="handleBack" class="qg-header-back-text" v-if="this.back">
                        返回
                    </div>
                    <div @click="handleClose" class="qg-header-close" v-if="this.close">
                        关闭
                    </div>
                </slot>
            </div>
            <span class="qg-header-title" v-text="title"></span>
            <div class="qg-header-button qg-flex-1">
                <slot name="right"></slot>
            </div>
        </header>
        <div class="static-header"></div>
    </div>
</template>
<script>
/**
 * qg-header
 * @module components/header
 * @desc 按钮
 * @param {string} [title] - 标题
 * @param {function} [back] - 返回事件(on)
 * @param {function} [close] - 关闭事件()
 * @param {slot}[left] - 左侧
 * @param {slot}[right] - 右侧
 * @example
 * <qg-header back='' close=''>头部</qg-header>
 */
export default {
    name: 'header',
    props: {
        title: String,
        close: Function,
        back: Function
    },
    methods: {
        handleBack() {
            this.back && this.back();
        },
        handleClose() {
            this.close && this.close();
        }
    }
}
</script>
<style lang="less" scoped>
@import "../utils/_vars.less";
@import "../assets/qg.less";
.static-header {
    height: @header-default-height;
}

.qg-header {
    position: fixed;
    background-color: #ffffff;
    text-align: center;
    height: @header-default-height;
    width: 100%;
    line-height: @header-default-height;
    border-bottom: 1px solid #B2B2B2;
    z-index: 99999;
    .qg-header-title {
        color: #333333;
        font-size: @font-size-button;
    }
    .qg-header-left {
        .qg-header-back {
            margin-left: 15px;
            height: 13px;
            width: 9px;
        }
        .qg-header-back-text {
            margin-left: 5px;
        }
        .qg-header-close {
            margin-left: 10px;
        }
    }
}
</style>
