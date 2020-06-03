<template>
    <div>
        <div @click="picker0(0)" class="show-picker">{{picker0Value}}</div>
        <picker @select="handleSelect" :open="open" :picker="picker"></picker>

        <div @click="picker0(2)" class="show-picker">{{picker3Value}}</div>
        <!-- <picker name="picker2" :open="open2" @select="handleSelect2" :picker="picker2" @valuechange="valueChange"></picker> -->
        <datePicker :open="open2" @select="handleSelect2"></datePicker>
    </div>
</template>
<script>
    let data1 = [{
        value: 1,
        name: '工人'
    }, {
        value: 2,
        name: '教师'
    }, {
        value: 3,
        name: '白领'
    }, {
        value: 5,
        name: '创业者'
    }, {
        value: 6,
        name: '个体户'
    }, {
        value: 7,
        name: '公司职员'
    }, {
        value: 8,
        name: '企业法人'
    }, {
        value: 9,
        name: '网店店主'
    }, {
        value: 10,
        name: '暂无职业'
    }, {
        value: 11,
        name: '其他'
    }]
    import picker from '../../src/components/picker/picker.vue'
    import datePicker from '../../src/components/picker/datePicker.vue'
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                show: false,
                picker0Value: '单选',
                picker3Value: '日期',
                picker: {
                    title: '选择用途',
                    data: [data1],
                    defaultIndex: []
                },
                picker2: {
                    title: '选择用途',
                    data: [],
                    defaultIndex: []
                }
            }
        },
        computed: {
            ...mapState({
                open: state => state.qg.picker.open,
                open2: state => state.qg.picker.datePicker
            })
        },
        methods: {
            picker0 (index) {
                index === 0 && this.$store.dispatch('openPicker')
                index === 2 && this.$store.dispatch('openPicker', 'datePicker')
            },
            handleSelect (result) {
                console.log(result)
                this.picker0Value = result.name
                this.picker.defaultIndex[0] = result
                // this.$set(this.initIndex, 0, result.value)
            },
            valueChange (a, b, c) {
                // console.log(a)
                // console.log(b)
                // console.log(c)
            },
            handleSelect2 (result) {
                console.log(result)
                this.picker3Value = ''
                result.forEach((ele, index) => {
                    this.picker3Value += ele.name + '-'
                    // this.$set(this.picker2.defaultIndex, 0, result.value)
                })
                this.picker3Value = this.picker3Value.slice(0, -1)
                this.picker2.defaultIndex = result
            }
        },
        mounted () {
        },
        components: {
            picker,
            datePicker
        }
    }
</script>
<style lang="less" scoped>
.show-picker {
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 18px;
}
</style>
