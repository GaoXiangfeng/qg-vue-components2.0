<template>
    <div class="vc-page">
        <div>
            <span>keyboard</span>
        </div>
        <div class="center-block">
            <div style="width: 300px">
                <qg-input @click="showKeyboard" :divMode="true" :value="password" type="password"></qg-input>
            </div>
        </div>
        <qg-keyboard :isShuffle='false' name="keyboard" :open="open" @click="click($event,'ads')" theme="white"></qg-keyboard>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                password:''
            }
        },
        computed: {
            ...mapState({
                open:state=>state.qg.actionSheet.keyboard
            })
        },
        methods: {
            showKeyboard() {
                this.$store.dispatch("openActionSheet","keyboard")
            },
            click(e){
                if(e==='delete'){
                    this.password=this.password.substring(0,this.password.length-1)
                    return
                }
                this.password=this.password+e
            }
        },
        mounted() {

        }
    }
</script>
<style lang="css" scoped>
    .vc-page {
        /*height:1000px*/
    }
</style>
