<template>
    <transition name="qg-slide">
        <div class="qg-toast-vuex" :class="{'header': header}" :style="styleObject" v-show="show" v-html="message">
        </div>
    </transition>
</template>
<script>
/**
 * qg-modal
 * @module components/modal
 * @desc 模态框
 * @param {boolean}[open] 是否打开toast
 * @param {string}[message] 内容
 * @param {number}[duration] 时间
 * @example
 * <qg-toast>头部modal</qg-toast>
 */
import {
    store
} from '../store'
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
        },
        duration: {
            type: Number,
            default: 2000
        },
        name: String,
        top: Number,
        styleObject : Object
    },
    data() {
        return {
            header: false
        }
    },
    computed: {
        show() {
            if (document.querySelector('header')) {
                this.header = true;
            }
            if (this.open) {
                setTimeout(() => {
                    this.close();
                }, this.duration);
            }
            return this.open
        }
    },
    methods: {
        close() {
            store.dispatch('closeToast', this.name)
        }
    }
}
</script>
<style lang="less" scoped>
@import "../utils/_mixins.less";
@import "../utils/_vars.less";
@import "../assets/qg.less";
.qg-toast-vuex {
    position: fixed;
    top: 0;
    z-index: 9999;
    width: 100%;
    background-color: @toast-default-bg-color;
    text-align: center;
    opacity: .8;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    line-height: 20px;
    padding: 10px 0;
}

.qg-slide-enter-active,
.qg-slide-leave-active {
    transition: top .5s, opacity 1s
}

.qg-slide-enter {
    /*transform: translate3d(0, -100%, 0);*/
    top: -@header-default-height;
}

.header {
    &.qg-toast-vuex {
        top: @header-default-height;
    }
    &.qg-slide-enter {
        top: 0px;
    }
}

.qg-slide-leave-active {
    opacity: 0;
}
</style>
