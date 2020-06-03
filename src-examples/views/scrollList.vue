<template>
    <div class="page">
        <div class="page-content">
        <scroll ref="scroll"
                :ending="ending"
                :scrollbar="scrollbar"
                :loadingEnd="loadingEnd"
                :pullUpLoad="pullUpLoad"
                @pullingUp="onPullingUp">
            <div slot="content" class="content-warp">
                <div v-for="item in data" @click="go(item)">我是第{{item}}行</div>
            </div>
            
        </scroll >
        </div>
    </div>
</template>
<script>
    let data = [1,2,3,4,5,6,7,8,9,10,11,6,7,8,9,10,11]
    import Vue from 'vue'
    import BScroll from 'qg-scroll'
    let Scroll
    import scroll from '../../src/components/scrollList/scroll.vue'
    export default {
        data () {
            return {
                time: 2000,
                data: data,
                dataLen: data.length,
                scrollbar: {fade: true},
                pullDownRefresh: {threshold: 90, stop: 40},
                pullUpLoad: {threshold: 0, txt: {more: '加载更多', noMore: '没有更多数据了'}},
                ending: false,
                upEnding:true,
                listenScroll:true,
                bscrollPos: 0,
                loadingEnd: false,
                count: 0,
                startY: 10,
                direction: 'vertical'
            }
        },
        methods: {
            go (i) {
                console.log(i)
            },
            onPullingDown() {
//                debugger
//                this.loading = true
                setTimeout(() => {
//                    debugger
//                    this.loading = false
                    if (this.count > 2) {
                        this.$refs.scroll.forceUpdate()
                        return
                    }
                    this.data.unshift(`${+new Date()}`)
                    this.ending = !this.ending
                    this.count++
                }, 1000)
            },
            onPullingUp() {
                let newData = [++this.dataLen,++this.dataLen,++this.dataLen,++this.dataLen]
                setTimeout(() => {
                    if (this.count > 2) {
                        return
                    }
                    this.ending = !this.ending
                    this.data = this.data.concat(newData)
                    this.count++
                    if (this.count > 2) {
                        this.pullUpLoad = false
                        this.loadingEnd = true
                    }
                }, 1000)
            },
            scrollPos (pos) {
                console.log(pos)
                this.bscrollPos = pos.y
            }
        },
        components: {
            scroll
        },
        mounted () {
        }
    }
</script>
<style lang="less" scoped>
    .page {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    .page-content {
        position: absolute;
        top: 44px;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        -webkit-overflow-scrolling: auto;
    .content-padded {}
    }
    }
    
.content-warp {
    position: relative;
    z-index: 10;
    background: #fff;
    div {
        height: 50px;
    }
}
</style>