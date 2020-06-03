<template>
  <div class="vc-page">
    <div>
      <span>Address Action Sheet</span>
    </div>
    <div class="center-block">
      <div>
        <button @click="showAddressActionSheet()">点击弹出 Address Action Sheet</button>
      </div>
    </div>
    <address-action-sheet name="testAddressActionSheet" :callback="addressActionSheet.callback" :title="addressActionSheet.title"
                          :open="open" :modellist='addressActionSheet.modellist'></address-action-sheet>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
        addressActionSheet: {
          title: '选择地区',
          show: false,
          modellist:[],
          callback(result) {
             console.log(result)
          },
        }
      }
    },
    computed: {
        ...mapState({
            open:state=>state.qg.actionSheet.testAddressActionSheet
        })
    },
    methods: {
      showAddressActionSheet() {
          this.$store.dispatch("openActionSheet","testAddressActionSheet")
      },
    },
    mounted() {
        this.addressActionSheet.modellist =[];
    }
}
</script>
<style lang="css">
.center-block {
  display: flex;
  align-items: center;
}
</style>
