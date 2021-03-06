<template>
    <transition name="picker-fade">
        <div class="picker" v-show="show" @touchmove.prevent @click="cancel" qg-log="关闭">
            <transition name="picker-move">
                <div class="picker-panel" v-show="show" @click.stop>
                    <div class="picker-choose border-bottom-1px">
                        <span class="cancel" @click="cancel" qg-log="取消">{{cancelTxt}}</span>
                        <span class="confirm" @click="confirm" qg-log="确定">{{confirmTxt}}</span>
                        <!-- <h1 class="picker-title">{{picker.title}}</h1> -->
                    </div>
                    <div class="picker-content">
                        <div class="mask-top border-bottom-1px"></div>
                        <div class="mask-bottom border-top-1px"></div>
                        <div class="wheel-wrapper" ref="wheelWrapper">
                            <div class="wheel" v-for="data in pickerData">
                                <ul class="wheel-scroll">
                                    <li v-for="item in data" class="wheel-item">{{item.name}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="picker-footer"></div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'qg-scroll'
    import {mapState} from 'vuex'
    import {store} from '../../store'
    
    const COMPONENT_NAME = 'picker'
    const EVENT_SELECT = 'select'
    const EVENT_VALUE_CHANGE = 'valuechange'
    const EVENT_CANCEL = 'cancel'
    const EVENT_CHANGE = 'change'
    
    export default {
        name: COMPONENT_NAME,
        props: {
            picker: Object,
            open: {
                type: Boolean,
                default: false
            },
            name: String,
            cancelTxt: {
                type: String,
                default: '取消'
            },
            confirmTxt: {
                type: String,
                default: '确认'
            },
            selectedIndex: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                // state: STATE_HIDE,
                pickerData: this.picker.data.slice(),
                pickerSelectedIndex: this.selectedIndex,
                pickerSelectedVal: [],
                pickerSelectedText: []
            }
        },
        created() {
            if (!this.pickerSelectedIndex.length) {
                this.pickerSelectedIndex = []
                for (let i = 0; i < this.pickerData.length; i++) {
                    this.pickerSelectedIndex[i] = 0
                }
            }
        },
        computed: {
            // ...mapState({
            //     open: state => state.qg.picker.open
            // }),
            show() {
                if (!this.open) {
                    return
                }
                
                if (!this.wheels || this.dirty) {
                    this.$nextTick(() => {
                        this.wheels = []
                        let wheelWrapper = this.$refs.wheelWrapper
                        for (let i = 0; i < this.pickerData.length; i++) {
                            this._createWheel(wheelWrapper, i)
                        }
                        this.dirty = false
                    })
                } else {
                    for (let i = 0; i < this.pickerData.length; i++) {
                        this.wheels[i].enable()
                        this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
                    }
                }
                this.$nextTick(() => {  //  默认选中
                    for (let i = 0; i < this.pickerData.length; i++) {
                        let num = 2
                        if (this.picker.defaultIndex.length !== 0) {
                            this.pickerData[i].forEach((ele, index) => {
                                if (this.picker.defaultIndex[i].value === ele.value) {
                                    num = index
                                }
                            })
                        }
                        this.wheels[i] && this.wheels[i].wheelTo(num)
                    }
                })
                return this.open
            }
        },
        methods: {
            confirm() {
                if (!this._canConfirm()) {
                    return
                }
                this.hide()
                
                let changed = false
                let selectData = []
                for (let i = 0; i < this.pickerData.length; i++) {
                    let index = this.wheels[i].getSelectedIndex()
                    this.pickerSelectedIndex[i] = index
                    
                    let value = null
                    if (this.pickerData[i].length) {
                        value = this.pickerData[i][index].value
                    }
                    if (this.pickerSelectedVal[i] !== value) {
                        changed = true
                    }
                    this.pickerSelectedText[i] = this.pickerData[i][index].name
                    if (this.pickerSelectedIndex.length === 1) {
                        selectData = this.pickerData[i][index]
                    } else {
                        selectData.push(this.pickerData[i][index])
                    }
                }
                // if (this.pickerSelectedIndex.length === 1) {
                //     selectData = {name: this.pickerSelectedText[0], value: this.pickerSelectedIndex[0]}
                // } else {
                //     this.pickerSelectedIndex.forEach((ele, index) => {
                //         let result = {name: this.pickerSelectedText[index], value: ele}
                //         selectData.push(result)
                //     })
                // }
                
                this.$emit(EVENT_SELECT, selectData)
                if (changed) {
                    this.$emit(EVENT_VALUE_CHANGE, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)
                }
            },
            cancel() {
                this.hide()
                this.$emit(EVENT_CANCEL)
            },
            hide() {
                // this.state = STATE_HIDE
                store.dispatch('closePicker', this.name)
                for (let i = 0; i < this.pickerData.length; i++) {
                    this.wheels[i].disable()
                }
            },
            setData(data) {
                this.pickerData = data.slice()
                this.dirty = true
            },
            // setSelectedIndex(index) {
            //     this.pickerSelectedIndex = index
            // },
            refill(datas) {
                let ret = []
                if (!datas.length) {
                    return ret
                }
                datas.forEach((data, index) => {
                    ret[index] = this.refillColumn(index, data)
                })
                return ret
            },
            refillColumn(index, data) {
                if (!this.show) {
                    console.error('can not use refillColumn when picker is not show')
                    return
                }
                const wheelWrapper = this.$refs.wheelWrapper
                let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
                let wheel = this.wheels[index]
                if (scroll && wheel) {
                    let oldData = this.pickerData[index]
                    this.$set(this.pickerData, index, data)
                    let selectedIndex = wheel.getSelectedIndex()
                    let dist = 0
                    if (oldData.length) {
                        let oldValue = oldData[selectedIndex].value
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].value === oldValue) {
                                dist = i
                                break
                            }
                        }
                    }
                    this.pickerSelectedIndex[index] = dist
                    this.$nextTick(() => {
                        // recreate wheel so that the wrapperHeight will be correct.
                        wheel = this._createWheel(wheelWrapper, index)
                        wheel.wheelTo(dist)
                    })
                    return dist
                }
            },
            scrollTo(index, dist) {
                const wheel = this.wheels[index]
                this.pickerSelectedIndex[index] = dist
                wheel.wheelTo(dist)
            },
            refresh() {
                setTimeout(() => {
                    this.wheels.forEach((wheel, index) => {
                        wheel.refresh()
                    })
                }, 50)
            },
            _createWheel(wheelWrapper, i) {
                if (!this.wheels[i]) {
                    this.wheels[i] = new BScroll(wheelWrapper.children[i], {
                        wheel: {
                            selectedIndex: this.pickerSelectedIndex[i],
                            rotate: 15
                        },
                        probeType: 3
                    })
                    
                    this.wheels[i].on('scrollEnd', () => {
                        this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex())
                    })
                } else {
                    this.wheels[i].refresh()
                }
                
                return this.wheels[i]
            },
            _canConfirm() {
                return this.wheels.filter((wheel) => {
                    return !wheel.isInTransition
                })
            }
        },
        watch: {
            picker: {
                handler (newData) {
                    this.setData(newData.data)
                },
                deep: true
            }
        },
        destroyed () {
            store.dispatch('closePicker', this.name)
        }
    }
</script>

<style lang="less" scoped>
    
    .picker {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-align: center;
        font-size: 14px;
        background-color: rgba(37, 38, 45, .4);
    &.picker-fade-enter, &.picker-fade-leave-active {
                              opacity: 0;
                          }
    &.picker-fade-enter-active, &.picker-fade-leave-active {
                                     transition: all .3s ease-in-out;
                                 }
    .picker-panel {
        position: absolute;
        z-index: 600;
        bottom: 0;
        width: 100%;
        height: 273px;
        background: #fff;
    &.picker-move-enter, &.picker-move-leave-active {
                              transform: translate3d(0, 273px, 0);
                          }
    &.picker-move-enter-active, &.picker-move-leave-active {
                                     transition: all .3s ease-in-out;
                                 }
    }
    .picker-footer {
        height: 20px;
    }
    .picker-choose {
        position: relative;
        height: 60px;
        color: #fcfcfc;
    .picker-title {
        margin: 0;
        line-height: 60px;
        font-weight: normal;
        text-align: center;
        font-size: 18px;
        color: #333333;
    }
    .confirm, .cancel {
        position: absolute;
        // top: 6px;
        padding: 12px 20px;
        font-size: 14px;
    }
    .confirm {
        right: 0;
        color: #B44B4D;
    &:active {
         color: #F1F1F1;
     }
    }
    .cancel {
        left: 0;
        color:#999;
    &:active {
         color: #F1F1F1;
     }
    }
    }
    .picker-content {
        position: relative;
        top: 20px;
    .mask-top, .mask-bottom {
        z-index: 10;
        width: 100%;
        height: 68px;
        pointer-events: none;
        transform: translateZ(0);
    }
    .mask-top {
        position: absolute;
        top: 0;
        background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    }
    .mask-bottom {
        position: absolute;
        bottom: 1px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    }
    }
    .wheel-wrapper {
        display: flex;
        display: -webkit-flex;
        padding: 0 16px;
    .wheel {
        flex: 1;
        -ms-flex: 1 1 0.000000001px;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex-basis: 0.000000001px;
        -webkit-flex-basis: 0.000000001px;
        width: 1%;
        height: 173px;
        overflow: hidden;
        font-size: 20px;
    .wheel-scroll {
        padding: 0;
        margin-top: 68px;
        line-height: 36px;
        list-style: none;
    .wheel-item {
        list-style: none;
        height: 36px;
        overflow: hidden;
        white-space: nowrap;
        color: #333;
    }
    }
    }
    }
        
    }
</style>