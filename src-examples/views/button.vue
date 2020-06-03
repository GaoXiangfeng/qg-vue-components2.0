<template>
    <div class="vc-page">
       <qg-button @click="handleClick($event,'222')" :disabled="disabled" :text="title" waitingTime="60">
       </qg-button>
    </div>
</template>
<script>
    module.exports = {
        data() {
            return {
                title: '选择合同',
                disabled: false
            }
        },
        methods: {
            handleClick() {
                console.log('edasdas',arguments)
            },
            test(){

            }
        },
        mounted() {
            console.log(this.$children[0].countDown())
            console.log(this.$store)
        }
    }
</script>

<style lang="less">
    .vc-page {
      padding:20px;
    }

</style>

</style>
