<style lang="less" scoped>
@import "../assets/qg.less";
    .alertify{
        position:fixed;
        top:0;
        left:0;
        z-index:999999;
        width:100%;
        height:100%;
        /*background:red;*/

        &.show{
            .inner{
                opacity:1;
                -webkit-transform: scale(1);
                -o-transform: scale(1);
                -moz-transform: scale(1);
                transform: scale(1);
            }
        }
        /*aaa*/
        ._inner{
            position:absolute;
            top:50%;
            left:0;
            -webkit-transform: translateY(-50%) ;
            -o-transform: translateY(-50%) ;
            -moz-transform: translateY(-50%) ;
            transform: translateY(-50%);
            width:100%;
            text-align: center;;
        }
        .inner{

            padding:20px;
            background:rgba(0,0,0,0.7);
            display: inline-block;
            color:#fff;
            font-size:20px;
            border-radius: 10px;
            opacity:0.0;
            max-width:90%;
            -ms-word-wrap: break-word;
            word-wrap: break-word;
            -ms-word-break: break-all;
            word-break: break-all;

            @transition:all 300ms cubic-bezier(0.175,.885,.32,1.275) ;

            -webkit-transition:@transition;
            -moz-transition:@transition;
            -o-transition: @transition;
            transition:@transition; /* custom */

            -webkit-transform: scale(0.01);
            -o-transform: scale(0.01);
            -moz-transform: scale(0.01);
            transform: scale(0.01);
        }
    }
</style>
<template>
    <div>
        <div v-show="show" class="alertify" @click="close" :class="{'show':open}">
            <div class="_inner">
                <div class="inner" :style="styleObject">
                  {{message}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    store
} from '../store'
    var t1 = null
   export default {
        name: 'alertify',
        props: {
          open: {
            type: Boolean,
            default: false
          },
          message: {
              type: String
          },
          duration: {
              type: Number,
              default: 2000
          },
          styleObject : Object
        },
        data () {
            return {
            }
        },
        methods: {
            close () {
                store.dispatch('closeAlertify')
                clearTimeout(t1)
            }
        },
        computed: {
          show () {
            if (this.open) {
                setTimeout(() => {
                    this.close()
                }, this.duration)
            }
            return this.open
          }
        },
        mounted () {
        }
    }

</script>
