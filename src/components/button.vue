<template>
    <button :class="['qg-button',{'disabled': isDisabled || disabled}]" :disabled="disabled" :type="nativeType" :text="text" @click="handleClick">
        {{buttonText || text}}
    </button>
</template>
<script>
/**
 * qg-button
 * @module components/button
 * @desc 按钮
 * @param {boolean} [disabled=false] - 禁用
 * @param {string} [text]- 显示文本
 * @param {string} [nativeType] - 原生 type 属性
 * @param {function} [click] - 点击事件
 * @param {string} [waitingTime] 倒计时时间，倒计时模式必传
 * @param {string} [waitingText] 倒计时文字，空格代表倒计时秒数
 * @param TODO {string} [loadingTime] 加载时间，loading模式必传
 * @example
 * <qg-button :disabled='false'>按钮</qg-button>
 */
export default {
    name: 'button',
    data() {
        return {
            isDisabled: false,
            buttonText: ''
        }
    },
//    watch: {
//        text(val) {
//            this.buttonText = val
//        },
//        disabled(val) {
//            this.isDisabled = val
//        }
//    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        text: {
            type: String
        },

        nativeType: {
            type: String,
            default: 'button'
        },
        waitingTime: {
            type: String
        },
        waitingText: {
            type: String,
            default: "剩余 秒"
        }
    },
    methods: {
        handleClick() {
            if (!this.isDisabled) {
                this.$emit('click')
                if (this.waitingTime) {
                    this.isDisabled = true;
                    let printLoading = (n) => {
                        if (n) {
                            this.buttonText = this.waitingText.replace(' ', n);
                            setTimeout(() => {
                                printLoading(n - 1)
                            }, 1000);
                        } else {
                            this.buttonText = this.text;
                            this.isDisabled = false;
                        }
                    }
                    printLoading(parseInt(this.waitingTime, 10));
                }
            }
        },
        countDown() {
            if (this.waitingTime) {
                this.isDisabled = true;
                let printLoading = (n) => {
                    if (n) {
                        this.buttonText = this.waitingText.replace(' ', n);
                        setTimeout(() => {
                            printLoading(n - 1)
                        }, 1000);
                    } else {
                        this.buttonText = this.text;
                        this.isDisabled = false;
                    }
                }
                printLoading(parseInt(this.waitingTime, 10));
            }
        }
    },
    mounted() {
//        this.isDisabled = this.disabled;
//        this.buttonText = this.text;
    },
}
</script>
<style lang="less" scoped>
@import "../utils/_vars.less";
button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-touch-callout: none;
    /*系统默认菜单被禁用*/
    -webkit-user-select: none;
    /*webkit浏览器*/
    -khtml-user-select: none;
    /*早期浏览器*/
    -moz-user-select: none;
    /*火狐*/
    -ms-user-select: none;
    /*IE10*/
    user-select: none;
}

.qg-button {
    background-color: @button-default-bg-color;
    text-align: center;
    /*height:@button-default-height;*/
    width: 100%;
    line-height: @button-default-height;
    border-radius: @button-default-border-radius;
    color: #FFFFFF;
    font-size: @font-size-button;
    &:active {
        opacity: .8;
    }
    &.disabled {
        opacity: .5;
    }
}
</style>
