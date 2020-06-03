<template>
    <div>
        <div class="up-top" v-for="item in [1,2,3,4,5,6,7,8,9]">
            我是第{{item}}行
        </div>
        <div class="up-top" v-for="item in [1,2,3,4,5,6,7,8,9]">
            我是第{{item}}行
        </div>
        <div class="up-top" v-for="item in [1,2,3,4,5,6,7,8,9]">
            我是第{{item}}行
        </div>
        <qg-top :transitionTime="time"></qg-top>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                show: false,
                time: 4000,
                btnPosition: {bottom: '50px'},
                tipColor: {color: '#B44B4D'},
                bgColor: {'background-color': 'rgba(100,100,100,.5)'}
            }
        },
        methods: {
        },
        mounted () {
        }
    }
</script>
<style lang="less" scoped>
.up-top {
    height: 150px;
}
</style>