<template>
    <div class="qg-indexlist">
        <div class="qg-indexlist-content" ref="content" :style="{'height': currentHeight + 'px'}">
            <slot>
                <indexSection :open="open" :firstText="firstText" :data="contentData" @resultFunc="resultFunc"></indexSection>
            </slot>
        </div>
        
        <div class="qg-indexlist-nav" ref="nav" @touchstart="handleTouchStart">
            <ul class="qg-indexlist-navlist qg-cvbox">
                <li class="qg-indexlist-navitem" v-for="item in items">
                    {{item}}
                </li>
            </ul>
        </div>
    
        <div class="qg-indexlist-indicator" v-if="showIndicator && moving">{{ currentIndicator }}</div>
    </div>
</template>

<script>
    import indexSection from '../indexSection'
    export default {
        name: 'qg-index-list',
        props: {
            data: Array,
            selectValue: {
                type: String,
                default: ''
            },
            showIndicator:{
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
//                items: [],
                contentData: [],
//                firstSection: null,
                open: true,
                navTop: 0,  // 距顶部距离
                navOffsetX: 0,  //  触摸点坐标
                indicatorTime: null,
                moving: false,
                currentIndicator: '',   // 当前字母
                currentHeight: 0 ,   // 内容区高度
                firstText: {text: '全部', selected: true}
            }
        },
        methods: {
            resultFunc(v) {
                this.$emit('resultFunc', v)
            },
            handleTouchStart(e) {
                if (e.target.tagName !== 'LI') return
    
                this.navOffsetX = e.changedTouches[0].clientX;
                this.scrollList(e.changedTouches[0].clientY);
                
                if (this.indicatorTime) {
                    clearTimeout(this.indicatorTime);
                }
                this.moving = true;
                window.addEventListener('touchmove', this.handleTouchMove);
                window.addEventListener('touchend', this.handleTouchEnd);
            },
            handleTouchMove(e) {
                e.preventDefault();
                this.scrollList(e.changedTouches[0].clientY);
            },
            handleTouchEnd() {
                this.indicatorTime = setTimeout(() => {
                    this.moving = false;
                    this.currentIndicator = '';
                }, 500);
                window.removeEventListener('touchmove', this.handleTouchMove);
                window.removeEventListener('touchend', this.handleTouchEnd);
            },
            scrollList(y) {
                let currentItem = document.elementFromPoint(this.navOffsetX, y); //处于指定坐标位置最顶层的元素
                if (!currentItem || !currentItem.classList.contains('qg-indexlist-navitem')) {
                    return;
                }
                this.currentIndicator = currentItem.innerText; // 选中的字母
                if (currentItem.innerText === '#') {
                    this.$refs.content.scrollTop = 0
                    return
                }
                let targets = this.$refs.content.getElementsByClassName('qg-indexsection-itemtip')
                let target
                for (let key in targets) {
                    if (targets[key].innerText === currentItem.innerText) {
                        target = targets[key]
                    }
                }
                if (target) {
                    this.$refs.content.scrollTop += target.getBoundingClientRect().top - this.navTop;
                }
            }
        },
        computed: {
            items() {
                let data = this.data
                let items = []
                let already = this.selectValue ? this.selectValue.split(',') : []
                this.firstText.selected = already.length === 0
                data.forEach(ele => {
                    items.push(ele.key)
                    ele.value.forEach(ele1 => {
                        let flag = already.indexOf(`${ele1.brandId}`) > -1
                        this.$set(ele1, 'selected', flag)
                    })
                })
                this.contentData = data
                if (items[0] !== '#') {
                    items.unshift('#')
                }
                return items
            }
        },
        mounted() {
            setTimeout(() => {
                this.navTop = this.$refs.content.getBoundingClientRect().top
                this.currentHeight = document.documentElement.clientHeight - this.navTop
            },20)
        },
        components: {
            indexSection
        }
    }
</script>

<style lang="less" scoped>
@import "../../assets/qg.less";
    .qg-indexlist {
        width: 100%;
        position: relative;
        overflow: hidden;
        &-content {
             margin:0;
             padding:0;
             /*overflow: auto;*/
             overflow-y: scroll;
             -webkit-overflow-scrolling:touch;
            padding-right: 10px;
         }
         &-nav {
              position: absolute;
              top: 0;
              // bottom: 0;
              right: 0;
              margin: 0;
              background-color: #fff;
              /*border-left: solid 1px #ddd;*/
              text-align: center;
              max-height: 100%;
              display: flex;
              display: -webkit-flex;
              flex-direction: column;
              -webkit-flex-direction: column;
              /*justify-content: center;*/
          }
        &-navlist {
            padding: 0;
            margin: 0;
            list-style: none;
            max-height: 100%;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            -webkit-flex-direction: column;
        }
        &-navitem {
            padding: 2px 6px;
            font-size: 12px;
            user-select: none;
            -webkit-touch-callout: none;
        }
         &-indicator {
              position: absolute;
              width: 50px;
              height: 50px;
              top: 35%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
              line-height: 50px;
              background-color: rgba(0, 0, 0, .7);
              border-radius: 5px;
              color: #fff;
              font-size: 22px;
          }
    }
</style>
