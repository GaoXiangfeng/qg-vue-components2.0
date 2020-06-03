<template>
<div>
    <div>
        <div class="index-select-top">
            <div class="qg-box">
                <div class="qg-flex-1" @click="indexList">销量</div>
                <div class="qg-flex-1" @click="new1">新品</div>
                <div class="qg-flex-1" @click="select1">筛选</div>
            </div>
        </div>
        <div class="index-select-top-static"></div>
    </div>
    
    <!--<div>2323232<br>123123123</div>-->
    
    <!--<div>
        <qg-index-section :open="open" :firstText="firstText" :data="data1" @resultFunc="resultFunc"></qg-index-section>
    </div>-->
    <div class="index-content">
        <qg-index-list :data="data1" @resultFunc="resultFunc"></qg-index-list>
    </div>
</div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                data: [],
                data1: [],
                firstText: {text: '全部', selected: true},
            }
        },
        methods: {
            indexList() {
                
            },
            resultFunc(v) {
                if (v === 'reset' || v === 'all') {
                }
                console.log(v)
            },
            new1() {
                this.$store.dispatch('closeIndexSection')
            },
            select1() {
                /*this.data = [{
                    name: '第几行?1',
                    selected: true
                }, {
                    name: '第几行?2',
                    selected: false
                }, {
                    name: '第几行?3',
                    selected: true
                }]*/
                this.$store.dispatch('openIndexSection')
            }
        },
        computed: {
            ...mapState({
                open: state => state.qg.indexSection.open
            })
        },
        mounted () {
            this.data1 = [
                {key: 'a', value: [{brandName: 'ahihi'}, {brandName: 'adefefe'}, {brandName: 'awerwerw'}]},
                {key: 'a', value: [{brandName: 'ahihi'}, {brandName: 'adefefe'}, {brandName: 'awerwerw'}]},
                {key: 'a', value: [{brandName: 'ahihi'}, {brandName: 'adefefe'}, {brandName: 'awerwerw'}]}
            ]
        }
    }
</script>
<style lang="less" scoped>
.index-select-top {
    width:100%;
    height: 40px;
    background-color: #fff;
    /*border:1px solid red;*/
    box-shadow: 0px 2px 6px 0px #000;
    line-height: 40px;
    position: fixed;
    top:40px;
    z-index:9999;
    &-static {
        height: 39px;
     }
}
.index-content {
    width:100%;
}
</style>