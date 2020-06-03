<template>
    <div class="gift-action-sheet" v-show="show" @click="close" qg-log="关闭ActionSheet">
        <div class="action-sheet">
            <div @click.stop class="action-sheet-wrap qg-vbox" :class="{'slideInUp':showAnimate}">
                <slot name="title">
                </slot>
                
                <div ref="warp" class="action-sheet-content qg-flex-1 gift-sheet-content" :class="{'gift-group': isScroll}">
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
            /*是否滚动*/
            isScroll: {
                type: Boolean,
                default: false
            },
            className: {
                type:String,
                default:()=>'gift-sheet-content'
            }
        },
        data () {
            return {
                showAnimate: false
//                Scroll: {},
//                warp: []
            }
        },
        computed: {
            show () {
                setTimeout(() => {
                    this.showAnimate = this.show
                }, 0)
                this.$nextTick(() => {
//                    this.show = true
                    this.$nextTick(() => {
                        this.show && this.initScroll()
                    })
                })
                return this.open
            }
        },
        methods: {
            initScroll() {
                this.scroll = new BScroll('.gift-sheet-content', {
                    scrollX: false,
                    scrollY: true,
                    click: true
                })
            },
            close () {
                this.showAnimate = false;
                this.scroll && this.scroll.destroy()
                setTimeout(() => {
                    store.dispatch('closeActionSheet', this.name)
                }, 200);
            }
        },
        mounted() {
            this.$el.addEventListener('touchmove', (e) => {
                e.preventDefault()
            })
            setTimeout(() => {
                this.$nextTick(() => {
//                    this.initScroll()
                })
            }, 30)
//            this.warp = this.$el.getElementsByClassName('action-sheet-content')
        },
        beforeDestroy() {
            this.scroll && this.scroll.destroy()
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
    
    .gift-action-sheet {
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
                line-height: 50px;
                height:50px;
                text-align: center;
                color: #808080;
            }
            .action-sheet-content {
                width: 100%;
            }
            .gift-group {
                overflow: hidden;
                // height: 250px;
                max-height:350px;
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