<template>
    <div>
        <div class="bank-btn" @click="showDateSheet">点击testGOOds~</div>
        <div class="bank-btn" @click="showDateSheet2">点击test~</div>
        <div class="item">测试文字啊啊啊啊 啊啊啊啊啊啊 啊</div> 
        <div class="item">测试文字啊啊啊啊 啊啊啊啊啊啊 啊</div> 
        <div class="item">测试文字啊啊啊啊 啊啊啊啊啊啊 啊</div> 
        <div class="item">测试文字啊啊啊啊 啊啊啊啊啊啊 啊</div> 
        <div class="item">测试文字啊啊啊啊 啊啊啊啊啊啊 啊</div> 
        <div class="item">测试文字啊啊啊啊 啊啊啊啊啊啊 啊</div> 
        <goods-action-sheet name="bankActionSheet" :open="open" :isScroll="true">
            <div slot="title">
                <div>title111</div>
                 <div>title111</div>
                  <div>title111</div>
                   <div>title111</div>
            </div>
            <div slot="content" class="text-center">
               <p>111111111</p>
                <p>22222</p>
                 <p>3333333</p>
                 <p>4444444444</p>
                 <p>55555555555</p>
                 <p>6666666666</p>
                 <p>111111111</p>
                <p @click="ttt">2222www2</p>
                 <p>3333333</p>
                 <p>4444444444</p>
                 <p>55555555555</p>
                 <p>6666666666</p>
                 <p>111111111</p>
                <p>22222</p>
                 <p>3333333</p>
                 <p>4444444444</p>
                 <p>55555555555</p>
                 <p>6666666666</p>
                 <p>111111111</p>
                <p>22222</p>
                 <p>3333333</p>
                 <p>4444444444</p>
                 <p>55555555555</p>
                 <p>6666666666</p>
                 
            </div>
        </goods-action-sheet>
        
    </div>
    
</template>
<script>
    import { mapState } from 'vuex'
    module.exports = {
        data() {
            return {
                bankCards: [],
                isShowSelcted: true
            }
        },
        methods: {
            ttt () {
                console.log(1)
            },
            showDateSheet () {
                this.$store.dispatch("openActionSheet","bankActionSheet")
            },
            showDateSheet2 () {
                this.$store.dispatch("openActionSheet","bankActionSheet2")
            },
            back(){
                this.$router.push({name:'home'})
            },
            selectbank () {
                alert('22')
            }
        },
        computed: {
            ...mapState({
                open:state=>state.qg.actionSheet.bankActionSheet,
                open2:state=>state.qg.actionSheet.bankActionSheet2
            })
        },
        mounted() {
            let bankCards = [{
                bankCode: 'ICBC',
                bankName: '工商银行',
                bankDes: '工商银行',
                cardLast: '1244',
                isEnable: true,
                selected: true
            }, {
                bankCode: 'ABC',
                bankName: '农业银行',
                bankDes: '农业银行',
                cardLast: '1244',
                isEnable: true,
                selected: false
            }, {
                bankCode: 'SPDB',
                bankName: '浦发银行',
                cardLast: '1244',
                bankDes: '浦发银行',
                isEnable: true,
                selected: false
            }, {
                bankCode: 'SPDB',
                bankName: '浦发银行',
                bankDes: '浦发银行',
                cardLast: '1244',
                isEnable: true,
                selected: false
            }];
            bankCards.forEach((item) => {
                item.selected = true;
                item.bankImg = require('../../src/assets/' + 'delete@2x' + '.png');
            })
            this.bankCards = bankCards;
        }
    }
</script>
<style lang="less" scoped>
.item{
    height:200px;
}
   .text-center {
       text-align: center;
   }
   .bank-btn {
       line-height: 60px;
       background: #ccc;
       margin-bottom: 10px;
   }
   .pay_alert {
       padding: 0 20px;
   }
   .may-card {
       /*height: 120px;*/
       /*overflow-y: scroll;*/
   }
   .pay_kind {
       /*border-bottom: 1px solid #DDDDDD;*/
       height: 60px;
       box-pack: justify;
       -webkit-box-pack: justify;
   &:last-child {
        border-bottom: 0;
    }

   .paykd_add {
       background: url('../../src/assets/delete-white@2x.png') no-repeat;
       background-size: 100%;
       width: 16px;
       height: 16px;
   }

   .paykd_img {
       background: url('../../src/assets/delete@2x.png');
       background-size: 100%;
       width: 20px;
       height: 20px;
       background-repeat: no-repeat;
    
   }
   .paykd_text {
       font-size: 20px;
       margin-left: 20px;
       /*padding-left: 10px;*/
       /*background: url("../../../images/cashadvance/repay_rectangle.png") no-repeat left center;*/
    
   }
   .paykd_select {
       padding-right: 2px;
   .selected {
       background: url('../../src/assets/delete-white@2x.png') no-repeat;
       background-size: 100%;
       width: 18px;
       height: 19px;
   }

   .notSelected {
       /*background: url('../../../images/cashadvance/repay-not-selected@2x.png') no-repeat;*/
       background-size: 100%;
       width: 18px;
       height: 18px;
   }

   .go-more {
       /*background: url('../../../images/cashadvance/repay_search.png') no-repeat;*/
       background-size: 100%;
       width: 10px;
       height: 18px;
   }
    
   }
   .paykd_tj {
       font-size: 20px;
       margin-left: -140px;
   }

   .paykd_search {
       font-size: 20px;
   }
    
   }
</style>
