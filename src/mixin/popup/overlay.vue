<template>
    <transition name="mu-overlay-fade">
        <div @click="handleClick" class="mu-overlay" v-if="show" @touchmove="prevent($event)" :style="overlayStyle"></div>
    </transition>
</template>
<script>
export default {
    name: 'mu-overlay',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        fixed: {
            type: Boolean,
            default: false
        },
        onClick: {
            type: Function
        },
        opacity: {
            type: Number,
            default: 0.4
        },
        color: {
            type: String,
            default: '#000'
        },
        zIndex: {
            type: Number
        }
    },
    computed: {
        overlayStyle() {
            return {
                'opacity': this.opacity,
                'background-color': this.color,
                'position': this.fixed ? 'fixed' : '',
                'z-index': this.zIndex
            }
        }
    },
    methods: {
        prevent(event) {
            event.preventDefault()
            event.stopPropagation()
        },
        handleClick() {
            if (this.onClick) {
                this.onClick()
            }
        }
    }
}
</script>
<style lang="less" scoped>
.mu-overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000;
    opacity: .3;
    z-index: 1000;
}

.mu-overlay-fade-enter-active,
.mu-overlay-fade-leave-active {
    transition: opacity .2s;
}


/*
.mu-overlay-fade-enter-active, .mu-overlay-fade-leave-active {
  transition: opacity .45s cubic-bezier(0.23, 1, 0.32, 1);
}*/

.mu-overlay-fade-enter,
.mu-overlay-fade-leave-active {
    opacity: 0 !important;
}
</style>
