<template>
    <div>
        <ul class="qg-indexsection" v-if="show">
            <li v-if="firstText" class="qg-indexsection-item" @click="selectAll" :class="{'active-item': firstSelect}">
                {{firstText.text}}
                <span v-show="firstSelect" class="qg-indexsection-select"></span>
            </li>
            <li v-for="list, index1 in data">
                <p class="qg-indexsection-itemtip">{{list.key}}</p>
                <ul class="qg-indexsection-warp">
                    <li class="qg-indexsection-item" v-for="item, index2 in list.value" @click="selectItem(index1, index2)" :class="{'active-item': item.selected}">
                        <span>{{item.brandName}}</span>
                        <span v-show="item.selected" class="qg-indexsection-select"></span>
                    </li>
                </ul>
            </li>
        </ul>
        <fixBottom :button="fixBottom" @reset="resetSelect" @confirm="confirmSelect"></fixBottom>
    </div>
</template>

<script>
    import fixBottom from './fix-bottom.vue'
    import {store} from '../../store'
    export default {
        name: 'qg-index-section',
        props: {
            open: Boolean,
            data: Array,
            firstText: { /* 第一项 */
                type: Object,
                default: () => { return {text: '全部', selected: true}}
            },
            fixBottom: {/* 底部按钮 */
                type: Array,
                default: () => ['确定', '重置']
            }
        },
        data() {
            return {
                firstSelect: false,
                selectData: []
            }
        },
        methods: {
            selectItem(index1, index2) {
                let flag = this.data[index1].value[index2]
                this.data[index1].value[index2].selected = !flag.selected
                let result = this.screen()
                this.firstSelect = result.length === 0
                if (this.itemLen === result.length) {
                    this.selectAll()
                }
            },
            selectAll() {
                if (this.firstSelect) return
                this.firstSelect = !this.firstSelect
                if (this.firstSelect) {
                    this.noSelectItem()
                }
            },
            noSelectItem() {
                let data = this.data
                data.forEach((ele) => {
                    ele.value.forEach(ele2 => {
                        ele2.selected = false
                    })
                })
                this.data = data
            },
            resetSelect() {
//                this.close()
                this.firstSelect = true
                this.noSelectItem()
                this.$emit('resultFunc', 'reset')
            },
            confirmSelect() {
                this.close()
                if (this.firstSelect) {
                    this.$emit('resultFunc', 'all')
                    return
                }
                let result = this.screen()
                this.$emit('resultFunc', result)
            },
            screen () {
                let data = this.data
                let result = []
                data.forEach((ele) => {
                    ele.value.forEach(ele2 => {
                        ele2.selected && result.push(ele2)
                    })
                })
                return result
            },
            close() {
                store.dispatch('closeIndexSection')
            }
        },
        computed: {
            show() {
                if (!this.open) {
                    return
                }
                return this.open
            },
            itemLen () {
                let data = this.data
                let count = 0
                data.forEach((ele) => {
                    ele.value.forEach(ele2 => {
                        count++
                    })
                })
                return count
            }
        },
        components: {
            fixBottom
        },
        mounted() {
            this.firstSelect = this.firstText.selected
        }
    };
</script>

<style lang="less" scoped>
    @import "../../utils/_vars.less";
@import "../../assets/qg.less";
.qg-indexsection {
    padding-left:20px;
    padding-right:20px;
    padding-bottom:70px;
    -webkit-overflow-scrolling:touch;
    /*height: 667px;*/
    /*overflow-y: scroll;*/
    /*overflow-x: hidden;*/
    &-warp {
        /*overflow-y: scroll;*/
     }
     &-itemtip {
        font-size: 0;
      }
    &-item {
         height:36px;
        line-height: 36px;
        font-size: @font-size-small;
        color: @font-color-black;
        border-bottom:1px solid @font-color-border;
         position: relative;
        &.active-item {
            color: @modal-default-confirm-color;
         }
     }
     &>ul {
       }
     .qg-indexsection-select:after {
         content: " ";
         /*display: inline-block;*/
         width: 21px;
         height: 21px;
         background-image: url("../../assets/actionsheet-selected@2X.png");
         background-repeat: no-repeat;
         background-position: center right;
         background-size: 9px 6px;
         /*margin-left: 8px;*/
         /*text-align: right;*/
         vertical-align: middle;
         /*margin-bottom: 2px;*/
         position: absolute;
         right:0;
         top:7px;
     }
}
</style>
