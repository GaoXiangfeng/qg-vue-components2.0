<template>
    <div class="action-sheet" v-show="show" @click="close" qg-log="关闭ActionSheet">
        <div class="action-sheet">
            <div @click.stop class="action-sheet-wrap qg-vbox" :class="{'slideInUp':showAnimate}">
                <slot name="title" v-if="title">
                    <div class="title">{{title}}</div>
                </slot>
                
                <div ref="warp" class="action-sheet-content qg-flex-1" :class="{group: isScroll,'action-sheet-content-bar':showScrollBar,'height240':height240}">
                    <slot name="content">
                        
                    </slot>
                </div>
                <slot name="footer">
                
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
    import Popup from '../mixin/popup';
    import {store} from '../store'
    import BScroll from 'better-scroll'
//    let Scroll
    export default {
        mixins: [Popup],
        props: {
            name: String,
            title: String,
            /*是否滚动*/
            isScroll: {
                type: Boolean,
                default: false
            },
            showScrollBar: {
                type: Boolean,
                default: false
            },
            height240: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                showAnimate: false
            }
        },
        computed: {
            show () {
                setTimeout(() => {
                    this.showAnimate = this.show
                }, 0)
                this.$nextTick(() => {
                    this.scroll && this.scroll.refresh()
                })
                return this.open
            }
        },
        methods: {
            initScroll() {
                let scrollBar = this.isScroll ? {fade: false} : false
                this.scroll = new BScroll('.action-sheet-content', {
                    scrollX: false,
                    scrollY: true,
                    click: true,
                    scrollbar: scrollBar
                })
            },
            close () {
                this.showAnimate = false;
                setTimeout(() => {
                    store.dispatch('closeActionSheet', this.name)
                }, 200);
            }
        },
        mounted() {
            this.initScroll()
        }
    }
</script>
<style lang="less" scoped>
    @import "../utils/_vars.less";
@import "../assets/qg.less";
    .actionsheet-enter-active,
    .actionsheet-leave-active {
        transition: transform .2s
    }
    
    .actionsheet-enter,
    .actionsheet-leave-active {
        transform: translate3d(0, 50%, 0);
    }
    
    .action-sheet {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 9999;
        .action-sheet-wrap {
            position: fixed;
            width: 100%;
            left: 0;
            right: 0;
            bottom: 0;
            background: #FFF;
            transition: transform .2s;
            transform: translate3d(0, 100%, 0);
            &.slideInUp {
                 transform: translate3d(0, 0, 0);
             }
            .title {
                font-size: 13px;
                line-height: 35px;
                text-align: center;
                color: #808080;
            }
            .action-sheet-content {
                width: 100%;
            }
            .action-sheet-content-bar{
                width:136px;
                position:relative;
            }
            .group {
                overflow: hidden;
                height: 120px;
            }
            .height240{
                height:240px;
            }
        }
    }
    .iScrollVerticalScrollbar .iScrollIndicator {
        height: 50px !important;
    }
    .scroll-bar {
        height: 50px !important;
    }
   
</style>