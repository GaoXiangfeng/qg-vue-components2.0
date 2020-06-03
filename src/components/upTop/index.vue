<template>
    <div class="qg-top" @click="backToTop()" qg-log="回到顶部" v-show="show" :style="btnPosition">
        <!--<img src="../../assets/top.png">-->
        <div class="qg-top-warp" :style="warpColor">
            <!-- <span class="qg-top-pic" :style="borderStyle"></span> -->
            <img class="qg-top-img" src="../../assets/back-top-tips.png">
            <span class="qg-top-tip" :style="tipColor">{{text}}</span>
        </div>
    </div>
</template>

<script>
    import init from './init'
    export default {
        name:'up-top',
        props:{
            text: { // 文本提示
                type: String,
                default: '顶部'
            },
            pageY: { // 滚动条高度 显示按钮
                type: Number,
                default: 1334
            },
            transitionName: { // 过渡动画名称
                type: String,
                default: 'linear'
            },
            transitionTime: {   // 过渡时间
                type: Number,
                default: 1500
            },
            btnPosition: Object, // 按钮位置
            tipColor: Object,   // 箭头颜色
            bgColor: Object,     // 背景填充色
            bscrollPos: Number,     // bscroll
            bsBackTo: Function      // bscroll
        },
        data() {
            return {
                showTooltips: false,
                show: false
            }
        },
        computed: {
            borderStyle() {
                if (this.tipColor && this.tipColor.color) {
                    return {
                        'border-color': `${this.tipColor.color}`
                    }
                }
            },
            warpColor() {
                if (this.bgColor) {
                    if (this.borderStyle) {
                        return Object.assign(this.bgColor, this.borderStyle)
                    }
                    return this.bgColor
                }
            }
        },
        watch: {
            bscrollPos() {
                this.currentPageYOffset(this.bscrollPos)
            }
        },
        methods: {
            currentPageYOffset (val) {
                // 判断滚动区域大于多少的时候显示返回顶部的按钮
                if (typeof val === 'number') {
                    this.show = Math.abs(val) > this.pageY
                } else {
                    this.show = window.pageYOffset > this.pageY
                }
            },
            backToTop () {
                if (this.bscrollPos) {
                    this.bsBackTo()
                } else {
                    init.scrollIt(0, this.transitionTime, this.transitionName, this.currentPageYOffset);
                }
            }
        },
        created () {
            window.addEventListener('scroll', this.currentPageYOffset);
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.currentPageYOffset)
        }
    }
</script>
<style lang="less" scoped>
    @import "../../utils/_vars.less";
    .qg-top {
        transition: all 3s ease;
        width: 40px;
        height: 40px;
        position: fixed;
        right: 15px;
        bottom: 80px;
        &-warp {
             width: 38px;
             height: 38px;
            border: solid 1px @font-color-white;
            border-radius: 50%;
            background-color: rgba(153,153,153,.07);
         }
         &-pic {
            display: block;
            width:10px;
            height:10px;
            border-top:solid 1px @font-color-gray;
            border-right:solid 1px @font-color-gray;
            transform: rotateZ(-45deg);
            margin: 8px auto 0;
          }
          &-tip {
            /*display: block;*/
            font-size: 10px;
            color: @font-color-gray;
           position: absolute;
           left: 8px;
           bottom: 8px;
           }
          &-img {
            width: 16px;
            height:8px;
            position: absolute;
            left: 11px;
            top: 6px;
        }
    }

</style>
