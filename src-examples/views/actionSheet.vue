<template>
    <div class="vc-page">
        <div v-for="item,index in items">
            <div>
                <span>Action Sheet</span>
            </div>
            <div class="center-block">
                <div>
                    <button @click="showDateSheet(index)">点击弹出 Action Sheet</button>
                </div>
            </div>
            <action-sheet :name="'action'+index" :actions="actionSheet.actions" :callback="actionSheet.callback" :title="actionSheet.title" :open="$store.state.qg.actionSheet['action'+index]" is-show-cancel="true"
                          :modellist='actionSheet.modellist'
                            :isScroll="true">
                <div slot="footer">
                    asasasd
                </div>
            </action-sheet>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
module.exports = {
    data() {
        return {
            items:[1,2,3],
            actionSheet: {
                title: '选择合同',
                modellist:[{
                    selectItem:3
                }],
                actions: [],
                callback(result) {
                    console.log(result)
                    // alert(result.name)
                }
            }
        }
    },
    methods: {
        showDateSheet(index) {
            this.$store.dispatch("openActionSheet","action"+index)
        },
        back(){
            this.$router.push({name:'home'})
        }
    /*    closeDateSheet(){
            this.actionSheet.show = false
        }*/
    },
    computed: {
        ...mapState({
            open:state=>state.qg.actionSheet.testActionSheet
        })
    },
    mounted() {
        this.actionSheet.modellist=[{
            selectItem: 2
        }];
        this.actionSheet.actions = [{
            data: [{
                name: '哇啦哇啦哇啦哇啦授权合同',
                value: '1'
            }, {
                name: '用卡拉卡拉卡拉卡拉信息合同',
                value: '2'
            }, {
                name: '挂拉呱拉呱拉呱啦用户合同',
                value: '3'
            },{
                name: '哇啦哇啦哇啦哇啦授权合同',
                value: '1'
            }, {
                name: '用卡拉卡拉卡拉卡拉信息合同',
                value: '2'
            }, {
                name: '挂拉呱拉呱拉呱啦用户合同',
                value: '3'
            },{
                name: '哇啦哇啦哇啦哇啦授权合同',
                value: '1'
            }, {
                name: '用卡拉卡拉卡拉卡拉信息合同',
                value: '2'
            }, {
                name: '挂拉呱拉呱拉呱啦用户合同',
                value: '3'
            },{
                name: '哇啦哇啦哇啦哇啦授权合同',
                value: '1'
            }, {
                name: '用卡拉卡拉卡拉卡拉信息合同',
                value: '2'
            }, {
                name: '挂拉呱拉呱拉呱啦用户合同',
                value: '3'
            },{
                name: '哇啦哇啦哇啦哇啦授权合同',
                value: '1'
            }, {
                name: '用卡拉卡拉卡拉卡拉信息合同',
                value: '2'
            }, {
                name: '挂拉呱拉呱拉呱啦用户合同',
                value: '3'
            },{
                name: '哇啦哇啦哇啦哇啦授权合同',
                value: '1'
            }, {
                name: '用卡拉卡拉卡拉卡拉信息合同',
                value: '2'
            }, {
                name: '挂拉呱拉呱拉呱啦用户合同',
                value: '3'
            }]
        }]

    }
}
</script>
<style lang="css" scoped>
.vc-page {
    /*background-color: #359df5;*/
    height:1000px
}
</style>
