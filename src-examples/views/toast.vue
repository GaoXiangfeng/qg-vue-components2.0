<template>
    <div>
        <div>
            <span>toast</span>
            <div>
                <button @click="showToast">点击弹出 toast</button>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'
import {
    Toast
} from '../../src'
module.exports = {
    data() {
        return {
            phone1: ''
        }
    },
    methods: {
        showToast() {
            //this.$store.dispatch("openToast")
            var a = {backgroundColor : 'yellow', color : 'green'}
            Toast('没有用户', undefined, a);
            // Toast('没有用户')
        },
        go() {
            this.$router.push({
                path: 'actionSheet'
            })
        }
        /*    closeDateSheet(){
                this.actionSheet.show = false
            }*/
    },
    computed: {
        ...mapState({
            open: state => state.qg.toast.open,
            message: state => state.qg.toast.message,
            styleObject: state => state.qg.toast.styleObject
        })
    },
    mounted() {
        console.log(this.$store)
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
