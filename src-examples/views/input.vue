<template>
    <div class="vc-page">
        <qg-input tooltip="图形验证码" v-model="phone" type="num" :captcha-url="captchaUrl" :get-captcha="getCaptcha" placeholder="请输入图形验证码"  :autoFocus="true"></qg-input>
        <qg-input tips="手机号" v-model="phone2" type="num" placeholder="请输入手机号"  :leftFocus="true" valuetype="phone">
            <div slot="left" class="left">手机号</div>
        </qg-input>
        <qg-input tooltip="身份证" :value='phone4' valuetype='IDCard'  placeholder="请输入身份证号">
        </qg-input>
        <!-- <qg-input tooltip="短信验证码" v-model="phone1" type="num" placeholder="请输入短信验证码" :send-vcode="sendVcode" :waitingTime="waitingTime"></qg-input>
        
        <qg-input tooltip="密码" v-model="phone3" :blur-fn="get" type="password" placeholder="请输入登录密码" @keyup="get"></qg-input>
        <qg-input tooltip="姓名" v-model="phone5" placeholder="请输入真实姓名" valuetype="chineseName"  maxlength="30"></qg-input>
        
        <qg-input tooltip="详细地址" placeholder="请输入详细地址" :minLength=3  v-model="address" :multiLine="true" :wholeLine="true"></qg-input>
        <input type="number" maxlength="6" placeholder="测试"> -->
        <!-- <div @click="test">点击测试</div> -->
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    module.exports = {
        data () {
            return {
                phone: '',
                phone1: '',
                phone2: '',
                phone3: '',
                phone4: '',
                phone5: '我的@',
                waitingTime:'60',
                address:'',
                cursor:false,
                captchaUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAcCAIAAAB56a/tAAAC20lEQVR42u1XW2gTURDNvyAigoggUrSU4vuBKGKxlOqHP6VWrSChlPjEWBQpKv6IUqT0Qy3BD5Uigm+xJUpofeALpRSkiOSjTbJJk2w2bZPaZPPe1BNW1jUE905bpOC9XMIm3JmdM3PmzI1p6j9bJg6YA+aAOWAOeI4Dzo1K4YunAo27ha0rgk11kRtt+VSS5CU3Phq92SEebfRWrYKfiK2dGkek82r43An9hkMWw+TA55DV7K1e46/fKZ1uzgguY8CJLx9CLU2xnkfx3h6gHS6bJ52xkMIda7sgWhpizx/AQ/j8SXgY77hE8uCqWAgr/QYMQ6sfD7twEm/HexG/1HpMfv2STGmAd1UuIoWbT8j6r77aDf59Nezm2VBAzbL81qHt9JDTwCo4gjRR2VQCsHT2iLCtfCZ9IuyoBL3Zz6M+AGxYnOIuuHZleOV8RY7PgmhNPr47bbTy+1eIfvLpPULotnaYxF48Q6nZrYLN9b5dm9Q2RjfhvQTAqe+D6BkSD0uujM/t2VLG0n5/NJHVrLUuyMWYbs/GZYFDe6Ad/r3VIBTacKSuSpmIMgHOSWLM/mTiTqfGsWmghfh5Ni8fu9xKNUw7v8E27ujGjFBhswTgXr0YJ6Fbv5wMOV3lCzBu6KJlNcMSkkAKGslCykHLGXIEA4ZRojFEMQX1v4jHD7rXLiEDjvfZ1Y4i89loBrKswIFaRsCFsV+zrkhuDeeLqaRiFUjVZ//31yDQCsJbIOr924aHo7eu4zDuPL9TYGlAvowBozKpwQGtE4TtFRCefCZNDRcqoO6s30vohS4buhcBYCyhYkALEZpSFENDDCRIhnh4v3ovxOgu1MnRbQwY7MVRDHH3+qV4wFsh2ozh4g6oPWtKS2IHug4mqjligOYVXWP+dq/82o/yQHEQOT6RO9axhHomPr5hud/M+srnsrqqKWR7RUn2f5Lf9fJ/SxwwB8wBc8AcMAc859dP6lAnf4gmYGYAAAAASUVORK5CYII='
            }
        },
        methods: {
            test () {
                console.log(this.inputCallback,this)
                if(Object.keys(this.inputCallback).length!==0){
                    this.$store.dispatch('callInputCallback')
                }
                else{
                    alert('提交')
                }

            },
            get (e) {
                //alert('blur')
                if(this.phone3.length>6) this.phone3=this.phone3.slice(0,6)
                console.log(e)
                //this.waitingTime='60'
            },
            getCaptcha () {
                alert('getCaptcha')
            },
            sendVcode () {
                /*if (this.phone) {
                    this.code = false
                }*/
                console.log('send')
            },
            cursorClick() {
                this.cursor=true
            }
        },
        computed:{
            ...mapState({
                inputCallback:state=>state.qg.input.inputCallback
            }),
            code () {
                return !this.phone
            }
        },
        mounted () {
            this.$on('input',function(e){
                console.log(e)
            })
        }
    }
</script>
<style lang="less" scoped>
    .vc-page {
        margin: 0 auto;
        padding-top: 40px;
        .multiline {
            width: 100%;
            border: 1px solid;
            font-size: 20px;
        }
        [contenteditable=true]:empty:before{
            content: attr(placeholder);
            display: block; /* For Firefox */
        }
    }
</style>
