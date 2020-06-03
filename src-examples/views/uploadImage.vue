<template>
    <div>
        <div class="ocr">
            <img class="ocr-img" src="../../src/assets/top.png" alt="">
            <qg-upload-image @changeinput="imgChange1" @resizeend="resizeEnd1"></qg-upload-image>
        </div>
        <img class="preview-img" :src="src" alt="">
    </div>
</template>
<script>
// import ocr from '../../src/components/ocr'
    export default {
        data () {
            return {
                src: ''
            }
        },
        methods: {
            imgChange1 (e) {
                console.log('change:', e);
            },
            resizeEnd1 (v) {
                console.log('resize');
                this.src = "data:image/jpeg;base64," + v
            }
        }
    }
</script>
<style lang="less" scoped>
.ocr {
    width: 200px;
    height: 200px;
    position: relative;
}
.ocr-img {
    width: 100%;
    height: 100%;
}
.preview-img {
    width: 300px;
    height: 300px;
    margin-top: 50px;
}
</style>

