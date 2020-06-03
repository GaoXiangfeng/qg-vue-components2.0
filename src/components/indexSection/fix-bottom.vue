<template>
    <div class="qg-btn-fix qg-box text-center">
        <div slot="left" class="qg-flex-1 fbtn-reset" @click="handleBtn1">
            {{button[1]}}
        </div>
        <div class="qg-flex-1 fbtn-confirm" @click="handleBtn0">
            {{button[0]}}
        </div>
    </div>
</template>
<script>
    import {store} from '../../store'
    export default {
        props: {
            button: Array
        },
        data () {
            return {}
        },
        methods: {
            handleBtn1() {
//                this.close()
                this.$emit('reset')
            },
            handleBtn0() {
//                this.close()
                this.$emit('confirm')
            },
            close() {
                store.dispatch('closeIndexSection')
            }
        },
        mounted () {
        }
    }
</script>
<style lang="less" scoped>
    @import "../../utils/_vars.less";
@import "../../assets/qg.less";
.qg-btn-fix {
    width:100%;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    z-index: 9999;
    height:@modal-default-footer-height;
    line-height: @modal-default-footer-height;
    font-size:@font-size-button;
    .fbtn-reset {
        color:@modal-default-confirm-color;
        background-color: #f1f1f1;
    }
    .fbtn-confirm {
        color: #ffffff;
        background-color: @modal-default-confirm-color;
    }
}
</style>