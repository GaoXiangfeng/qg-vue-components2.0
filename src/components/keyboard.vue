<template>
    <action-sheet :title="title" :open="open" :name="name" :isShowCancel="isShowCancel" :openCallback="openCallback">
        <div slot="title" class="keyboard-title qg-box" :class="{dark:theme==='dark',white:theme==='white'}">
            <slot name="title">
                <div class="tip qg-box">
                    <div v-if="theme==='dark'" class="keyboard-icon">

                    </div>
                    信用钱包安全键盘
                </div>
                <div @click="close" class="complete" qg-log="关闭键盘">
                    完成
                </div>
            </slot>
        </div>
        <div slot="content" class="keyboard" :class="{dark:theme==='dark',white:theme==='white'}">
            <div v-for="n in 4" class="qg-box line">
                <div @click="handelClick(number)" v-if="kind === 'number' " v-for="number in singleLine(numbers,n)" class="item" :qg-log="`键盘输入数字:${number}`">
                    <div class="number" :class="{selectedDark:selectedIndex===number && theme==='dark',selectedWhite:selectedIndex===number && theme==='white',}">{{number}}</div>
                </div>

                <div @click="handelClick(number)" v-if="kind ==='idCard' " v-for="number in singleLine(numbers1,n)" class="item" :qg-log="`键盘输入数字:${number}`">
                    <div class="number" :class="{selectedDark:selectedIndex===number && theme==='dark',selectedWhite:selectedIndex===number && theme==='white',}">{{number}}</div>
                </div>
                <div @click="handelClick('delete')" v-if="n == 4" class="item" :class="{selected:selectedIndex==='delete'}" qg-log="键盘删除">
                    <div class="number">
                        <div class="back-wrapper">
                            <div :class="{back:theme==='dark',backWhite:theme==='white'}">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </action-sheet>
</template>
<script>
import {
    store
} from '../store'
export default {
    name: 'keyboard',
    data() {
        return {
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0],
            numbers1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0],
            selectedIndex: '10',
        }
    },
    methods: {
        singleLine(numbers, line) {
            return numbers.filter(function(number, index) {
                return index >= (line - 1) * 3 && index < (line - 1) * 3 + 3
            })
        },
        handelClick(number) {
            this.selectedIndex = number
            this.$emit('click', number)
        },
        openCallback() {
            function shuffle(a) {
                var length = a.length;
                var shuffled = Array(length);

                for (var index = 0, rand; index < length; index++) {
                    rand = ~~(Math.random() * (index + 1));
                    if (rand !== index)
                        shuffled[index] = shuffled[rand];
                    shuffled[rand] = a[index];
                }

                return shuffled;
            }

            if (this.isShuffle) {
                this.numbers = shuffle(this.numbers);
            }
        },
        close() {
            store.dispatch('closeActionSheet', this.name)
        },

    },
    props: {
        title: String,
        name: String,
        open: {
            type: Boolean
        },
        isShuffle: {
            type: Boolean,
            default: true
        },
        isShowCancel: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: 'dark'
        },
        kind:{
            type:String,
            default:'number'
        }
    },
    computed: {

    },
    mounted() {

    }
}
</script>
<style lang="less" scoped>
    @import "../utils/_vars.less";
@import "../assets/qg.less";
.keyboard-title {
    /*font-weight:100;*/
    padding: 0px 20px 16px 20px;
    // box-pack: justify;
        justify-content: space-between;

    .tip {
        font-size: 13px;
        line-height: 18px;
        .keyboard-icon{
            background: url('../assets/keyboard-icon@2x.png') no-repeat;
            background-size: 100%;
            width: 16px;
            height: 19px;
            margin-right: 6px;
        }
    }
    .complete {
        color: #C4A74B;
        font-size: 15px;
        line-height: 21px;
    }
    &.dark {
        background-color: #23252D;
        color: #FFFFFF;
    }
    &.white {
        background-color: #FFFFFF;
        color: #333333;
    }
}

.keyboard {
        -webkit-touch-callout:none;  /*系统默认菜单被禁用*/
        -webkit-user-select:none; /*webkit浏览器*/
        -khtml-user-select:none; /*早期浏览器*/
        -moz-user-select:none;/*火狐*/
        -ms-user-select:none; /*IE10*/
        user-select:none;
    input,textarea {
        -webkit-user-select:auto; /*webkit浏览器*/
        margin: 0px;
        padding: 0px;
        outline: none;
    }
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    width: 100%;
    &.dark {
        background-color: #23252D;
        color: #FFFFFF;
    }
    &.white {
        background-color: #FFFFFF;
        color: #333333;
    }
    .line {
        // box-pack: justify;
        justify-content: space-between;
        width: 100%;

        height: 50px;
        .item {
            width: 125px;
            .number {
                font-size: 24px;
                line-height: 50px;
                text-align: center;
                width: 50px;
                height: 50px;
                margin: 0 auto;

                &.selectedDark {
                    border-radius: 100%;
                    background: rgba(255, 255, 255, 0.1);
                }
                /*&.selectedWhite {*/
                    /*border-radius: 17px;*/
                    /*background: rgba(220, 220, 220, 1);*/
                /*}*/
                 &:active{
                      border-radius: 100%;
                      background: rgba(220, 220, 220, 1);
                  }
            }
            .back {
                background: url('../assets/delete@2x.png') no-repeat;
                background-size: 100%;
                width: 24px;
                height: 18px;
                margin: 12px auto;
            }
            .back-wrapper{
                margin-left:10px;
                padding:14px 0;
                .backWhite {
                    background: url('../assets/delete-white@2x.png') no-repeat;
                    background-size: 100%;
                    width: 24px;
                    height: 18px;

                }
            }

        }
    }
    .line:last-child {
        margin-bottom: 24px;
    }
}
</style>
