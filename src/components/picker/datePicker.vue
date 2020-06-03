<template>
    <picker :name="name" ref="picker" :open="open" @select="handleResult" :picker="picker" @change="valueChange"></picker>
</template>
<script>
    import picker from './picker.vue'
    export default {
        props: {
            name: {
                type: String,
                default: 'datePicker'
            },
            open: Boolean
        },
        data () {
            return {
                picker: {
                    title: '选择日期',
                    data: [],
                    defaultIndex: []
                },
                days: [],
                dateIndex: [60, 2, 2],
                mouthArr: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            }
        },
        methods: {
            handleResult () {
                this.picker.defaultIndex = arguments[0]
                this.$emit('select', arguments[0])
            },
            valueChange (i, index) {
                this.dateIndex[i] = index   // 保存年月日索引 
                let nowYear = new Date().getFullYear()
                let leapYeay = (nowYear - 70 + this.dateIndex[0]) % 4 === 0
                if (i === 0 || i == 1) {
                    if (this.dateIndex[1] === 1 && leapYeay) {
                        this.picker.data[2] = this.days.slice(0, 29)
                    } else {
                        this.picker.data[2] = this.days.slice(0, this.mouthArr[this.dateIndex[1]])
                    }
                    this.$refs.picker.setData(this.picker.data)
                }
                if (i === 0 || i === 1) {
                    this.$refs.picker.scrollTo(2, 0)
                    this.$refs.picker.refresh()
                }
                // this.$emit('valuechange', arguments[0])
            }
        },
        created () {
            let nowYear = new Date().getFullYear()
            let year = []
            for (let i = 0; i < 140; ++i) {
                year.push({
                    name: nowYear - 70 + i + '年',
                    value: i
                })
            }
            let months = []
            for (let i = 0; i < 12; ++i) {
                months.push({
                    name: i + 1 + '月',
                    value: i
                })
            }
            let days = []
            for (let i = 0; i < 31; ++i) {
                days.push({
                    name: i + 1,
                    value: i
                })
            }
            this.days = days
            this.picker.data[0] = year
            this.picker.data[1] = months
            this.picker.data[2] = days
        },
        components: {
            picker
        }
    }
</script>
<style lang="less" scoped>

</style>

