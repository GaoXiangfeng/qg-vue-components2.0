<template>
    <div class="vc-page">
       <qg-header :title="title" :back="handleBack" :close="handleClose">

       </qg-header>
        <div>
            <button @click="showModal()">点击弹出 modal</button>`
            <modal :open="open">
                <div slot="title">仅差最后一步即可完成激活</div>
                <div slot="body">  1.您预留的姓名和身份证号不匹配，请联系信用钱包客服进行修改<br>
                    2.您尚未开通芝麻信用分，请在支付宝内进行开通</div>
            </modal>
        </div>
    </div>

</template>
<script>
    import { mapState } from 'vuex'
    module.exports = {
        data() {
            return {
                title: '选择合同',
                msg: "测试"
            }
        },
        methods: {
            handleClick() {
               this.title='测试'
            },
            handleBack() {
                this.title='返回'
            },
            handleClose() {
                this.title='关闭'
            },
            showModal() {
                this.$store.dispatch("openModal")
            },
        },
        computed: {
            ...mapState({
                open:state=>state.qg.modal.open,
            })
        },
        mounted() {
            console.log(this.$store)
        }
    }
</script>
<style lang="less">
.vc-page {

}
</style>
