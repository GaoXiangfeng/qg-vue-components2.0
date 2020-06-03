<template>
    <div ref="qglist" class="qg-list" :style="{height: qgHeight + 'px'}">
        <div>
    <div ref="wrapper" class="list-wrapper">
        <div class="scroll-content">
            <div ref="scrollCon">
                <slot name="content">
                    <ul ref="list" class="list-content">
                        <li @click="clickItem($event,item)" class="list-item" v-for="item in data">{{item}}</li>
                    </ul>
                </slot>
            </div>
            <slot name="pullup"
                  :pullUpLoad="pullUpLoad"
                  :isPullUpLoad="isPullUpLoad"
            >
                <div class="pullup-wrapper" v-if="pullUpLoad">
                    <div class="before-trigger" v-if="!isPullUpLoad">
                        <span>{{pullUpTxt}}</span>
                    </div>
                    <div class="after-trigger" v-else>
                        <loading></loading>
                    </div>
                </div>
                <div class="pullup-wrapper" v-if="!pullUpLoad && loadingEnd">
                    <div class="before-trigger ddd">
                        <span>已经到底咯~</span>
                    </div>
                </div>
            </slot>
        </div>
        <slot name="pulldown"
              :pullDownRefresh="pullDownRefresh"
              :pullDownStyle="pullDownStyle"
              :beforePullDown="beforePullDown"
              :pulling="pulling"
              :bubbleY="bubbleY"
        >
            <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
                <div class="before-trigger" v-if="beforePullDown">
                    <bubble :y="bubbleY"></bubble>
                </div>
                <div class="after-trigger" v-else>
                    <div v-if="pulling" class="loading">
                        <loading></loading>
                    </div>
                    <div v-else><span>{{refreshTxt}}</span></div>
                </div>
            </div>
        </slot>
    </div>
        </div>
    <upTop ref="uptop" :bscrollPos="bscrollPos" :bsBackTo="bsBackTo" :pageY="bscrollY"></upTop>
        
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import Loading from './loading.vue'
    import Bubble from './bubble.vue'
    import upTop from '../upTop'
    function getRect(el) {
        if (el instanceof window.SVGElement) {
            let rect = el.getBoundingClientRect()
            return {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            }
        } else {
            return {
                top: el.offsetTop,
                left: el.offsetLeft,
                width: el.offsetWidth,
                height: el.offsetHeight
            }
        }
    }
    const COMPONENT_NAME = 'scroll'
    const DIRECTION_H = 'horizontal'
    const DIRECTION_V = 'vertical'
    const DEFAULT_LOAD_TXT_MORE = '加载更多'
    const DEFAULT_LOAD_TXT_NO_MORE = '已经到底了'
    const DEFAULT_REFRESH_TXT = '刷新成功'
    
    export default {
        name: COMPONENT_NAME,
        props: {
            data: {
                type: Array,
                default: function () {
                    return []
                }
            },
            ending: Boolean,
            probeType: {
                type: Number,
                default: 3
            },
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: true
            },
            listenBeforeScroll: {
                type: Boolean,
                default: false
            },
            direction: {
                type: String,
                default: DIRECTION_V
            },
            scrollbar: {
                type: null,
                default: false
            },
            pullDownRefresh: {
                type: null,
                default: false
            },
            pullUpLoad: {
                type: null,
                default: false
            },
            startY: {
                type: Number,
                default: 0
            },
            refreshDelay: {
                type: Number,
                default: 20
            },
            freeScroll: {
                type: Boolean,
                default: false
            },
            bounce: {       //  开启弹性效果
                type: Boolean,
                default: true
            },
            loadingEnd: {   // 是否显示到底了
                type: Boolean,
                default: false
            },
            eventPassthrough: {   //
                type: String,
                default: 'horizontal'
            }
        },
        data() {
            return {
                beforePullDown: true,
                isRebounding: false,
                isPullingDown: false,
                pulling: false,
                isPullUpLoad: false,
                pullUpDirty: true,
                pullDownStyle: '',
                bubbleY: 0,
                qgHeight: 0,
//                wrapperTop: 0,
                bscrollPos: 0,
                bscrollY: 0,
//                resetpullUpLoad: true
            }
        },
        computed: {
            pullUpTxt() {
                const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || DEFAULT_LOAD_TXT_MORE
                
                const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || DEFAULT_LOAD_TXT_NO_MORE
                
                return this.pullUpDirty ? moreTxt : noMoreTxt
            },
            refreshTxt() {
                return this.pullDownRefresh && this.pullDownRefresh.txt || DEFAULT_REFRESH_TXT
            }
        },
        created() {
            this.pullDownInitTop = -50
        },
        mounted() {
            setTimeout(() => {
                this.initScroll()
            }, 20)
        },
        methods: {
            initScroll() {
                let clientH = document.documentElement.clientHeight
                if (this.$refs.qglist) {
                    let listTop = this.$refs.qglist.getBoundingClientRect().top
                    this.qgHeight = clientH - listTop
                }
                this.bscrollY = clientH * 2
                
                if (!this.$refs.wrapper) {
                    return
                }
                setTimeout(() => {
                    this.forceUpdate()
                }, 20)
                this.$refs.uptop.show = false
//                this.wrapperTop = this.$refs.scrollCon.getBoundingClientRect().height
                
                if (this.$refs.list && (this.pullDownRefresh || this.pullUpLoad)) {
                    this.$refs.list.style.minHeight = getRect(this.$refs.wrapper).height + 'px'
                }
                
                let options = {
                    probeType: this.probeType,
                    click: this.click,
                    scrollY: this.freeScroll || this.direction === DIRECTION_V,
                    scrollX: this.freeScroll || this.direction === DIRECTION_H,
                    scrollbar: this.scrollbar,
                    pullDownRefresh: this.pullDownRefresh,
                    pullUpLoad: this.pullUpLoad,
                    startY: this.startY,
                    freeScroll: this.freeScroll,
                    eventPassthrough: this.eventPassthrough,
                    bounce: this.bounce
                }
                
                this.scroll = new BScroll(this.$refs.wrapper, options)
                
                if (this.listenScroll) {
                    this.scroll.on('scroll', (pos) => {
                        this.bscrollPos = pos.y
                        this.$emit('scroll', pos)
                    })
                }
                
                if (this.listenBeforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScrollStart')
                    })
                }
                
                if (this.pullDownRefresh) {
                    this._initPullDownRefresh()
                }
                
                if (this.pullUpLoad) {
                    this._initPullUpLoad()
                }
            },
            bsBackTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, [0, 0, 1500])
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            },
            clickItem(e, item) {
                this.$emit('click', item)
            },
            destroy() {
                this.scroll.destroy()
            },
            forceUpdate(dirty) {
//                this.wrapperTop = this.$refs.scrollCon.getBoundingClientRect().height
                if (this.pullDownRefresh && this.isPullingDown) {
                    this.pulling = false
                    this._reboundPullDown().then(() => {
                        this._afterPullDown()
                    })
                } else if (this.pullUpLoad && this.isPullUpLoad) {
                    this.isPullUpLoad = false
                    this.scroll.finishPullUp()
                    this.pullUpDirty = dirty
                    this.refresh()
                } else {
                    this.refresh()
                }
            },
            _initPullDownRefresh() {
                this.scroll.on('pullingDown', () => {
                    this.beforePullDown = false
                    this.isPullingDown = true
                    this.pulling = true
                    this.$emit('pullingDown')
                })
                
                this.scroll.on('scroll', (pos) => {
                    if (this.beforePullDown) {
                        this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
                        this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
                    } else {
                        this.bubbleY = 0
                    }
                    
                    if (this.isRebounding) {
                        this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
                    }
                })
            },
            _initPullUpLoad() {
                this.scroll.on('pullingUp', () => {
                    this.isPullUpLoad = true
                    this.$emit('pullingUp')
                })
            },
            _reboundPullDown() {
                const {stopTime = 600} = this.pullDownRefresh
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.isRebounding = true
                        this.scroll.finishPullDown()
                        this.isPullingDown = false
                        resolve()
                    }, stopTime)
                })
            },
            _afterPullDown() {
                setTimeout(() => {
                    this.pullDownStyle = `top:${this.pullDownInitTop}px`
                    this.beforePullDown = true
                    this.isRebounding = false
                    this.refresh()
                }, this.scroll.options.bounceTime)
            }
        },
        watch: {
            ending() {
                setTimeout(() => {
                    this.forceUpdate(true)
                }, this.refreshDelay)
            }
        },
        components: {
            Loading,
            Bubble,
            upTop
        }
    }

</script>

<style lang="less" scoped>
    .qg-list {
        position: relative;
        transform: rotate(0deg); /*fix 子元素超出边框圆角部分不隐藏的问题*/
        overflow: hidden;
        width: 100%;
    }
    .list-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        background: #fff;
        .list-content {
            position: relative;
            z-index: 10;
            background: #fff;
            .list-item {
                height: 60px;
                line-height: 60px;
                font-size: 18px;
                padding-left: 20px;
                border-bottom: 1px solid #e5e5e5;
            }
        }
    }
        
    .pulldown-wrapper {
        position: absolute;
        width: 100%;
        left: 0;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        transition: all;
        .after-trigger {
            margin-top: 10px;
        }
    }
    
    .pullup-wrapper {
        width: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        padding: 16px 0;
    }
</style>
