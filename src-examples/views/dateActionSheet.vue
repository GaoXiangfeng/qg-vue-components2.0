<template>
    <div class="vc-page">
        <div>
            <span>Date Action Sheet</span>
        </div>
        <div class="center-block">
            <div>
                <button @click="showDateActionSheet()">点击弹出 Date Sheet</button>
            </div>
        </div>
        <date-action-sheet  name="testDateActionSheet" :actions="dateActionSheet.actions" :callback="dateActionSheet.callback" :title="dateActionSheet.title" :open="open"></date-action-sheet>
    </div>
</template>
<script>
import { mapState } from 'vuex'
module.exports = {
    data() {
        return {
            dateActionSheet: {
                title: '选择时间',
                actions: [],
                show: false,
                callback(result) {
                    alert(result[0].name + result[1].name + result[2].name)
                }
            }
        }
    },
    computed: {
        ...mapState({
            open:state=>state.qg.actionSheet.testDateActionSheet
        })
    },
    methods: {
        showDateActionSheet() {
            this.$store.dispatch("openActionSheet","testDateActionSheet")
        },
    },
    mounted() {
        let nowYear = new Date().getFullYear()

        let year = []
        for (let i = 0; i < 140; ++i) {
            year.push({
                name: nowYear - 70 + i + '年',
                value: nowYear - 70 + i,
                select: nowYear == nowYear - 70 + i
            })
        }

        this.dateActionSheet.actions = [{
            title: '年',
            data: year
        }, {
            title: '月',
            data: []
        }, {
            title: '日',
            data: []
        }]
    }
}
</script>
<style lang="css">
.center-block {
    display: flex;
    align-items: center;
}
</style>
