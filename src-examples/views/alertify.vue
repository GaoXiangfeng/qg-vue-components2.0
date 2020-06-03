<template>
    <div>
            <qg-alertify :open="open" :message="message" :duration="duration" :styleObject="styleObject">
            </qg-alertify>
        <div>
            <span>toast</span>

          
                <button @click="showToast()">点击弹出 toast</button>
        </div>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'
import {
    Alertify
} from '../../src'
module.exports = {
    data() {
        return {
            phone1: ''
        }
    },
    methods: {
        showToast() {
            let obj = {fontSize: '10px',padding: '2px'}
            Alertify('测试是是是',1000)
            console.log(this.$store)
        }
    },
    computed: {
        ...mapState({
            open: state => state.qg.alertify.open,
            message: state => state.qg.alertify.message,
            duration: state => state.qg.alertify.duration,
            styleObject: state => state.qg.alertify.styleObject
        })
    },
    mounted() {
        //console.log(this.$store)
    }
}
</script>
<style lang="less">
/*.vc-page{
    .qg-toast{
        top:200px;
    }
}*/
</style>
