<template>
    <div class="vc-page">
        <div>
            <span>modal</span>
        </div>
        <div class="center-block">
            <div>
                <qg-button @click="showModal()" text="点击弹出 modal"></qg-button>
                <div @click="showModal1()">点击弹出 modal1</div>
            </div>
        </div>
        <div class="center-block">
            <div>
                <qg-button @click="showModal3()" text="点击弹出 modal3"></qg-button>
            </div>
        </div>
        <div class="test">11111</div>
        <div class="test">22222</div>
        <div class="test">33333</div>
        <div class="test">44444</div>
        <modal :open="open" :button="button" title="仅差最后一步即可完成激活">
            <div slot="body" class="test1">  
                <p>1.您预留的姓名和身份证号不匹配，请联系信用钱包客服进行修改</p>
                <p>2.您尚未开通芝麻信用分，请在支付宝内进行开通</p>
                <p>3.您尚未开通芝麻信用分，请在支付宝内进行开通</p>
                <p>4.您尚未开通芝麻信用分，请在支付宝内进行开通</p>
                <p>5.您尚未开通芝麻信用分，请在支付宝内进行开通</p>
                <p>6.您尚未开通芝麻信用分，请在支付宝内进行开通</p>
            </div>
        </modal>
        <modal :open="open1" name="test">
            <div slot="title">仅差最后一步即可完成激活</div>
            <div slot="body">  1.您预留的进行修改<br>
                2.您尚未开通芝麻信用分，请在支付宝内进行开通</div>
        </modal>
        <modal :open="open3" name="test3" title="第一" :button="button1">
            <div slot="body">  1.您预留的进行修改<br>
                2.您尚未开通芝麻信用分，请在支付宝内进行开通</div>
        </modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'
module.exports = {
    data() {
        return {
            title: '选择合同',
            msg: "测试",
            button:[{
                text:'123',
                func:function(){
                    console.log('test')
                }
            },{
                text:'取消',
                func:function(){
                    console.log('test')
                }
            }],
            button1: [{text: '知道了'}]
        }
    },
    methods: {
        showModal() {
            this.$store.dispatch("openModal")
        },
        showModal1(){
            this.$store.dispatch("openModal",'test')
        },
        showModal3(){
            this.$store.dispatch("openModal",'test3')
        }
    /*    closeDateSheet(){
            this.actionSheet.show = false
        }*/
    },
    computed: {
        ...mapState({
            open:state=>state.qg.modal.open,
            open1:state=>state.qg.modal.test,
            open3:state=>state.qg.modal.test3
        })
    },
    mounted() {
        console.log(this.$store)
    }
}
</script>
<style lang="css">
.center-block {
    display: flex;
    align-items: center;
}
.test {
    height: 200px;
    width: 100%;
}
.test1 {
    height: 120px;
    overflow-y: scroll;
}
</style>
