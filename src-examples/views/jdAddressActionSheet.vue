<template>
  <div class="vc-page">
    <div>
      <span>Address Action Sheet</span>
    </div>
    <div class="center-block">
      <div>
        <button @click="showAddressActionSheet()">点击弹出 Address Action Sheet</button>
      </div>
      <div>
        <button @click="showAddressActionSheet2()">点击弹出 Address Action Sheet2</button>
      </div>
    </div>
    <div class="item" @click="test">
      {{actionAddress2.province}} {{actionAddress2.city}}{{actionAddress2.district}}
    </div>
    <div class="item">
      测试测试测试测试啊啊啊啊啊 大大大大2
    </div>
    <div class="item">
      测试测试测试测试啊啊啊啊啊 大大大大3
    </div>
    <div class="item">
      测试测试测试测试啊啊啊啊啊 大大大大4
    </div>
    <div class="center-block">
      <div>
        <button @click="showAddressActionSheet2()">清空省市区</button>
      </div>
    </div>
    <jd-address-action-sheet :addressApi="addressActionSheet.api" name="test1AddressActionSheet" :callback="addressActionSheet.callback" :chooseCallback="addressActionSheet.chooseCallback" :title="addressActionSheet.title" :open="open" :modellist='addressActionSheet.modellist' :showList="addressActionSheet.showList" :className="addressActionSheet.className"></jd-address-action-sheet>
     <jd-address-action-sheet :addressApi="addressActionSheet2.api" name="test2AddressActionSheet" :callback="action2Callback" :chooseCallback="addressActionSheet2.chooseCallback" :title="addressActionSheet2.title" :open="open2" :modellist='addressActionSheet2.modellist' :showList="addressActionSheet2.showList" :className="addressActionSheet2.className"></jd-address-action-sheet>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import api from '../../src/api'
export default {
  data() {
    return {
        actionAddress2: {
          province: '',
          city: '',
          district: ''
        },
        addressActionSheet: {
          title: '所在省市区',
          show: false,
          api:'http://192.168.4.12:7054/mall/other/ex/goods/address?id=',
          modellist:[],
          showList:[],
          className:'test-Class1',
          callback(result) {
             console.log('结果是:')
             console.log(result)
          },
          chooseCallback(result) {
             console.log('选择结果是:')
             console.log(result)
          }
        },
        addressActionSheet2: {
          title: '所在省市区',
          show: false,
          api:'http://192.168.4.12:7054/mall/other/ex/goods/address?id=',
          modellist:[],
          showList:[],
          className:'test-Class2',
          callback(result) {
             console.log('结果是:')
             console.log(result)
          },
          chooseCallback(result) {
             console.log('选择结果是:')
             console.log(result)
          }
        }
      }
    },
    computed: {
        ...mapState({
            open:state=>state.qg.actionSheet.test1AddressActionSheet,
            open2:state=>state.qg.actionSheet.test2AddressActionSheet
        })
    },
    methods: {
      test () {
      },
      action2Callback (result) {
         this.actionAddress2={
          province: result[0].name,
          city: result[1].name,
          district: result[2].name
        }
      },
      showAddressActionSheet() {
          this.$store.dispatch("openActionSheet","test1AddressActionSheet")
      },
      showAddressActionSheet2() {
          this.$store.dispatch("openActionSheet","test2AddressActionSheet")
      },
      delActionSheet () {
        this.addressActionSheet.showList =[]
        console.log('测试哦')
      }
    },
    mounted() {
        this.addressActionSheet.showList =[
          {
          province:{
            name:'北京市',
            code:'1'
          },
          city:{
            name:'海淀区',
            code:'2800'
          },
          county:{
            name:'三环以内dadadadasdwdwadwadwadlahwdalwhdlawhdhwdlhwakhdlk传的是是是是测试三四十',
            code:'2838'
          }
        },
        {
          province:{
            name:'上海市',
            code:'2'
          },
          city:{
            name:'静安区',
            code:'2100'
          },
          county:{
            name:'测试啊啊啊',
            code:'111'
          }
        },
        {
          province:{
            name:'广州市',
            code:'2'
          },
          city:{
            name:'广州1',
            code:'2100'
          },
          county:{
            name:'广州3',
            code:'111'
          }
        },{
          province:{
            name:'湖北市',
            code:'2'
          },
          city:{
            name:'广州1',
            code:'2100'
          },
          county:{
            name:'广州3',
            code:'111'
          }
        }
        ];
        //this.addressActionSheet.showList =[];
        //this.addressActionSheet.modellist = []
        this.addressActionSheet.modellist =[];

         this.addressActionSheet2.showList =[];
        this.addressActionSheet2.modellist =[];
    }
}
</script>
<style lang="css">
.center-block {
  display: flex;
  align-items: center;
}
.item{
  height:300px;
}
</style>
