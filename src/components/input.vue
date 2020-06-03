<template>
    <div class="form-align">
        <div class="form-row qg-box">
            <div class="leftItem" @click="handleLeftClick">
                <slot name="left">

                </slot>
            </div>

            <div class="qg-svbox qg-flex-1 center"  @click="focus($event)">
                <label v-if="tooltip">{{tooltip}}</label>
                <div class="field-control">
                    <div contenteditable="true" class="multiLine" :disabled="disabled" @blur="blur" :value="value" @input="updateValue($event)" :type="type" :placeholder="placeholder" v-if="multiLine"></div>
                    <div class="divMode" v-else-if='divMode' @click="handleClick">
                        <div v-if="value!=='' || cursor">
                            <span v-if="value.length===0" class="cursor">|</span>
                            <span v-else v-for="i,index in type==='password'?repeat():value">{{i}}<span v-if="cursor && index===value.length-1" class="cursor">|</span></span>
                        </div>
                        <span v-else class="placeholder">{{placeholder}}</span>
                    </div>
                    <input :maxlength="maxlength" :disabled="disabled" @blur="blur" :value="value" @input="updateValue($event)" :type="type" :placeholder="placeholder" @keyup="onkeyup" v-else/>
                </div>
            </div>
            <slot name="right">
                <img v-if="captchaUrl" class="captcha-img" :src="captchaUrl" @click="getCaptcha && getCaptcha()" qg-log="获取图片验证码"/>
                <div v-if="sendVcode" class="code-button qg-box">
                    <!--<div class="left"></div>-->
                    <qg-button :text="codeTitle" @click="sendVcode" :disabled="codeDisabled" :waitingTime="waitingTime"></qg-button>
                </div>
            </slot>
        </div>
    </div>
</template>
<script>
import Toast from './toast'
import {
    store
} from '../store'
const telRegex = /^1[0-9]{10}$/,
    chineseNameRegex = /^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$/,
    IDCardRegex = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
    nameRegex = /^.{2,20}$/,
    bankCardRegex = /^.{1,}$/,
    vcodeRegex = /^[0-9]{4,6}$/,
    qqRegex = /^[0-9]{1,20}$/;

export default {
    name: 'input',
    props: {
        tooltip: { /*input标题*/
            type: String,
            default: ''
        },
        value: {
            type: null,
            required: true,
            twoWay: true,
            default: ""
        },
        valuetype: { /*校验 获取输入类型*/
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        maxlength: {
            type: String
        },
        minLength: {
            type: Number,
            default:0
        },
        captchaUrl: { /*图形验证码 url*/
            type: String,
            default: ''
        },
        getCaptcha: { /*获取图形验证码*/
            type: Function
        },
        blurFn: {
            type: Function
        },
        disabled: {
            type: Boolean
        },
        /*按钮不可用*/
        codeDisabled: {
            type: Boolean
        },
        /*开启多行模式*/
        multiLine: {
            type: Boolean
        },
        /*是否开启div模式*/
        divMode: {
            type: Boolean
        },
        sendVcode: { /*获取短信验证码*/
            type: Function
        },
        codeTitle: { /*button 文案*/
            type: String,
            default: '获取验证码'
        },
        tips: {
            type: String,
        },
        waitingTime: {
            type: String,
            default: '60'
        },
        /*自动对焦*/
        leftFocus:{
            type:Boolean,
            default:false
        },
        /*自动呼出键盘*/
        autoFocus:{
            type:Boolean,
            default:false
        },
        /*键盘的模拟光标，应该已废弃*/
        cursor:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            cursorIndex:0
        }
    },
    methods: {
        handleLeftClick(){
           if(this.leftFocus){
               this.focus()
           }
        },
        focus(){
            if(this.divMode){
                this.handleClick()
                return
            }
            if(this.multiLine){
                var multiLine=this.$el.getElementsByClassName('multiLine')
                if(multiLine.length==1){
                    multiLine[0].focus()
                }
                return
            }
            var input=this.$el.getElementsByTagName('input');
            if(input.length==1){
                input[0].focus()
            }
        },
        onkeyup(event) {
            let value = event.target.value || event.target.innerText;
            if (this.minLength > 0) {
                if (value.length >= this.minLength) {
                    this.deleteInputCallback();
                }
            }
            /*const regexArray = [telRegex, nameRegex, chineseNameRegex, IDCardRegex, qqRegex,bankCardRegex,vcodeRegex];
            ['phone', 'name', 'chineseName', 'IDCard', 'qq','bankCard','vcode'].forEach((item, index) => {
                if (this.valuetype.indexOf(item) !== -1) {
                    if (!regexArray[index].test(value.replace(/\s+/g,'')) && value != '') {
                        this.addInputCallback()
                    } else {
                        this.deleteInputCallback()
                    }
                }
            });*/
            this.$emit('keyup', event)
        },
        updateValue(event) {
            let value = event.target.value || event.target.innerText;
            if (!this.valuetype && this.minLength ==0) {
                this.deleteInputCallback()
                this.$emit('input', value)
                return
            }

            if (this.minLength > 0) {
                 event.target.onblur = ()=>{
                    if (value.length < this.minLength) {
                        this.addInputCallback();
                    } else {
                        this.deleteInputCallback();
                    }
                 }
            }

            const regexArray = [telRegex, nameRegex, chineseNameRegex, IDCardRegex, qqRegex,bankCardRegex,vcodeRegex];
            const preventCopyBug = ['phone', 'qq', 'bankCard','vcode']; // ios11复制bug
            ['phone', 'name', 'chineseName', 'IDCard', 'qq', 'bankCard','vcode'].forEach((item, index) => {
                if (this.valuetype.indexOf(item) !== -1) {
                    event.target.onblur = () => {
                        let valueTrim = value.replace(/\s+/g,'')
                        if (preventCopyBug.indexOf(item) > -1) {
                            valueTrim = valueTrim.replace(/[^\d]/g,'')
                        }
                        if (!regexArray[index].test(valueTrim) && valueTrim != '') {
                            this.addInputCallback()
                        } else {
                            this.deleteInputCallback()
                        }
                    }
                }
            })
            this.$emit('input', value)
        },
        addInputCallback() {
            Toast((this.tips || this.tooltip) + '格式错误', undefined, {backgroundColor: '#B92F00'})
            store.dispatch('addInputCallback', {
                uid: this._uid,
                callback: () => {
                    Toast((this.tips || this.tooltip) + '格式错误', undefined, {backgroundColor: '#B92F00'})
                }
            })
        },
        deleteInputCallback() {
            store.dispatch('deleteInputCallback', {
                uid: this._uid,
            })
        },
        blur() {
            this.blurFn && this.blurFn();
        },
        handleClick() {
            this.$emit('click')
        },
        repeat() {
            let arr = this.value.split('')
            for (let i = 0; i < this.value.length; i++) {
                if (arr[i] !== '|') {
                    arr[i] = '•'
                }
            }
            return arr.join('')
        }
    },
    mounted() {
        /*store.dispatch('addInputCallback',{
            uid:this._uid,
            callback:()=>{
                Toast({
                    message: (this.tips || this.tooltip) + '不能为空'
                })
            }
        })*/
        if(this.autoFocus){
          this.focus()
        }
    },
    beforeDestroy() {
          this.deleteInputCallback();
    }
}
</script>
<style lang="less" scoped>
@import "../assets/qg.less";
@import "../utils/_vars.less";
.form-align {
    /* padding: 0 20px;*/
    text-align: left;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    .form-row {
        /*padding: 13px 0;*/
        .leftItem,.center{
            padding: 13px 0
        }
        border-bottom: 1px solid @font-color-border;
        label {
            color: @font-color-gray;
            font-size: @font-size-small;
        }
        .field-control {
            width: 100%;
            input {
                width: 100%;
                height: @input-height;
                margin-top: 4px;
                font-size: @font-size-big;
                color: @font-color-black;

            }
            ::-webkit-input-placeholder {
                /* WebKit browsers */
                color: @font-color-white;

            }
            input:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: @font-color-white;

            }
            ::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: @font-color-white;

            }
            input:-ms-input-placeholder {
                /* Internet Explorer 10+ */
                color: @font-color-white;

            }
            .divMode {
                width: 100%;
                margin-top: 5px;
                font-size: @font-size-big;
                line-height: @input-height ;
                height: 28px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                color:#333333;

                .placeholder {
                    color: @font-color-white;
                }
            }
            .multiLine {
                width: 100%;
                margin-top: 5px;
                font-size: @font-size-big;
                line-height: @input-height ;
                user-modify: read-write-plaintext-only;
                -webkit-user-modify: read-write-plaintext-only;
                -webkit-user-select: auto;
            }
            [contenteditable=true]:empty:before {
                content: attr(placeholder);
                color: @font-color-white;
                text-align: left;
                display: block;

                /* For Firefox */
            }
        }
    }
    /* &:first-child {
            .form-row{
                border-top: 1px solid @font-color-border;
            }
        }*/
}

.captcha-img {
    padding-left: 20px;
    height: @input-height;
    border: 0;
}

.code-button {
    width: 98px;

    .left{
        border-left: 1px solid @font-color-border;
        height: 30px;
    }
    .qg-button {
        padding-left: 20px;
        background: transparent;
        line-height: @input-button-height;
        color: @font-color-black;
        font-size: @font-size-normal;
        border-radius:0;
        border-left: 1px solid @font-color-border
    }
}
.cursor{
    animation:cursor-animation 0.9s infinite;
    -webkit-animation:cursor-animation 0.9s infinite;
}
@keyframes cursor-animation
{
    0%   {opacity: 1}
    50%  {opacity: 0}
    100% {opacity: 1}
}
</style>
