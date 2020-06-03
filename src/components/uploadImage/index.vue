<template>
    <div>
        <form v-if="again">
            <input class="form-warp" type="file" accept="image/*" @change="imgChange($event)">
        </form>
        <canvas v-show="false" id="canvas"></canvas>
    </div>
</template>

<script>
    export default {
        props: {
            quality: {  // 压缩比例
                type: Number,
                default: 0.9
            },
            wh: {       // 压缩的宽高
                type: Object,
                default: () => { return {width: 760, height: 480}}
            }
        },
        data () {
            return {
                showCanvas: true,
                again: true     // input只触发一次change
            }
        },
        methods: {
            imgChange (e) {
                let input = e.target.files
                if (input && input[0] && input[0].type.indexOf('image') > -1) {
                    console.log(input)
                    this.$emit('changeinput')
                    this.resizeImg(e.target)
				} else {
                    this.again = false
                    this.$emit('changeinput', 'not image')
                    this.againInput()
                }
            },
            resizeImg (input) {
                let fileType = input.files[0].type
                /* eslint-disable */
                let reader = new FileReader();
                reader.onload = (e) => {
                    let image = new Image()
                    image.src = e.target.result
                    image.onload = () => {
                        let canvas = document.getElementById('canvas')
                        canvas.width = this.wh.width
                        canvas.height = this.wh.height
                        let ctx = canvas.getContext('2d')
                        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
                        let newImageData = canvas.toDataURL('image/jpeg', this.quality)
                        let sendData = newImageData.replace("data:image/jpeg;base64,", '')
                        this.again = false
                        this.$emit('resizeend', sendData)
                        this.againInput()
                    }

                }
                reader.readAsDataURL(input.files[0]);
                /* eslint-enable */
            },
            againInput () {
                this.$nextTick(() => {
                    this.again = true
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.form-warp {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    z-index: 999;
    opacity: 0;
    &>div {
        width: 100%;
        height: 100%;
    }
}
</style>

