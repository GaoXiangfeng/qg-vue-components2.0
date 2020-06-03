<template>
    <action-sheet :actions="actions" :showSelected='true' :callback="actionClick" :title="title" multiterm="true" :open="open" :name="name" :modellist='modellist'></action-sheet>
</template>
<script>
import $script from 'scriptjs'
import Config from '../config'

module.exports = {
    data() {
        return {
            actions: []
        }
    },
    methods: {
        actionClick(result, currentNav) {
            // 选择省
            if (currentNav == 0) {
                return new Promise((resovle, reject) => {
                    resovle(this.actions[0].data)
                })
            }
            // 选择市
            else if (currentNav == 1) {
                return new Promise((resovle, reject) => {
                        let city = [];
                        let resobj =result[0] ? result[0] : this.modellist[0];
                        if(!distrctJson.city[resobj.value]){
                            resovle(city)
                            if (this.callback) {
                                this.callback([resobj])
                            }
                        }else{
                            distrctJson.city[resobj.value].map((item) => {
                                city.push({
                                    name: item.name,
                                    value: item.code
                                })
                            })
                            resovle(city)
                        }
                    })
                    // 选择区
            } else if (currentNav == 2) {
                return new Promise((resovle, reject) => {
                        let district = []
                        distrctJson.district[result[1].value].map((item) => {
                            district.push({
                                name: item.name,
                                value: item.code
                            })
                        })
                        resovle(district)
                    })
                    // 返回业务方
            } else if (currentNav == 'end') {
                if (this.callback) {
                    this.callback(result)
                }
            }
        }
    },
    props: {
        callback: Function,
        title: String,
        name:String,
        modellist:{
            type:Array,
            default: ()=>[]
        },
        open: {
            type: Boolean
        }
    },
    mounted() {
        $script(Config.location, () => {
            let province = []
            distrctJson.province.map((item,index) => {
                province.push({
                    name: item.name,
                    value: item.code
                })
            })
           let city=[];
           let district = [];
            if (this.modellist.length >0) {
                distrctJson.city[this.modellist[0].value].map((item,index) => {
                         city.push({
                                    name: item.name,
                                    value: item.code
                                })
                            })
                 distrctJson.district[this.modellist[1].value].map((item,index) => {
                        district.push({
                                name: item.name,
                                value: item.code
                            })
                        })
            }
            this.actions = [{
                title: '省',
                data: province
            }, {
                title: '市',
                data: city
            }, {
                title: '区',
                data:district
            }]
        });
    }
}
</script>
<style lang="less" scoped>
.center-block {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
}
</style>
