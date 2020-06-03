<template>
    <div class="qg-swipe">
    	<div class="qg-swipe-items-wrap">
    		<slot></slot>
    	</div>
    	<div class="qg-swipe-indicators" v-show='showIndicators'>
    		<div class="qg-swipe-indicator" v-for="(page,$index) in pages" :class="{'is-active' : $index === index}">
    		</div>
    	</div>
    </div>
</template>
<script>
import { once, addClass, removeClass } from '../../utils/index.js';
export default {
    name: 'qg-swipe',
    data() {
      return {
          index: 0,
          pages: [],
          timer: null,
          reInitTimer: null,
          dragState: {},
          noDrag: false,
          isDone: false,
          dragging: false,
          userScrolling: false,
          animating: false,
      };
    },

    props: {
      /* 动画执行速度 */
        speed: {
          type: Number,
          default: 300
        },

        /* 轮播间隔 */
        auto: {
          type: Number,
          default: 3000
        },

        /* 是否循环轮播 */
        continuous: {
          type: Boolean,
          default: true
        },

       /* 默认选中的索引值 */
        defaultIndex: {
          type: Number,
          default: 0
        },

        /* 是否显示指示小圆点 */
        showIndicators: {
          type: Boolean,
          default: true
        }
    },

    methods: {
      swipeItemCreated() {
        clearTimeout(this.reInitTimer);
        this.reInitTimer = setTimeout(() => {
          this.reInitPages();
        }, 100);
      },

      swipeItemDestroyed() {
        clearTimeout(this.reInitTimer);
        this.reInitTimer = setTimeout(() => {
          this.reInitPages();
        }, 100);
      },

      translate(element, offset, speed, callback) {
          if (speed) {
            this.animating = true;
            element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out';
            setTimeout(() => {
              element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`;
            }, 50);

            let called = false;
            let transitionEndCallback = () => {
              if (called) return;
              called = true;
              this.animating = false;
              element.style.webkitTransition = '';
              element.style.webkitTransform = '';
              if (callback) {
                callback.apply(this, arguments);
              }
            };
            once(element, 'webkitTransitionEnd', transitionEndCallback);
          } else {
            element.style.webkitTransition = '';
            element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`;
          }
        },


       reInitPages() {
          let children = this.$children;
          this.noDrag = children.length === 1;
          let pages = [];
          let intDefaultIndex = Math.floor(this.defaultIndex);
          let defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length) ? intDefaultIndex : 0;
          this.index = defaultIndex;
          children.forEach((child, index) => {
            pages.push(child.$el);
            removeClass(child.$el, 'is-active');
            if (index === defaultIndex) {
              addClass(child.$el, 'is-active');
            }
          })
          this.pages = pages;
        },

      doAnimate(towards, options) {
          if (this.$children.length === 0) return;
          if (!options && this.$children.length < 2) return;

          let prevPage, nextPage, currentPage, pageWidth, offsetLeft;
          let speed = this.speed || 300;
          let index = this.index;
          let pages = this.pages;
          let pageCount = pages.length;

          if (!options) {
            pageWidth = this.$el.clientWidth;
            currentPage = pages[index];
            prevPage = pages[index - 1];
            nextPage = pages[index + 1];
            if (this.continuous && pages.length > 1) {
              if (!prevPage) {
                prevPage = pages[pages.length - 1];
              }
              if (!nextPage) {
                nextPage = pages[0];
              }
            }
            if (prevPage) {
              prevPage.style.display = 'block';
              this.translate(prevPage, -pageWidth);
            }
            if (nextPage) {
              nextPage.style.display = 'block';
              this.translate(nextPage, pageWidth);
            }
          } else {
            prevPage = options.prevPage;
            currentPage = options.currentPage;
            nextPage = options.nextPage;
            pageWidth = options.pageWidth;
            offsetLeft = options.offsetLeft;
          }

          let newIndex;

          let oldPage = this.$children[index].$el;

          if (towards === 'prev') {
            if (index > 0) {
              newIndex = index - 1;
            }
            if (this.continuous && index === 0) {
              newIndex = pageCount - 1;
            }
          } else if (towards === 'next') {
            if (index < pageCount - 1) {
              newIndex = index + 1;
            }
            if (this.continuous && index === pageCount - 1) {
              newIndex = 0;
            }
          }

          var callback = () => {
            if (newIndex !== undefined) {
              var newPage = this.$children[newIndex].$el;
              removeClass(oldPage, 'is-active');
              addClass(newPage, 'is-active');

              this.index = newIndex;
            }

            if (prevPage) {
              prevPage.style.display = '';
            }

            if (nextPage) {
              nextPage.style.display = '';
            }
          };

          setTimeout(() => {
            if (towards === 'next') {
              this.isDone = true;
              this.translate(currentPage, -pageWidth, speed, callback);
              if (nextPage) {
                this.translate(nextPage, 0, speed);
              }
            } else if (towards === 'prev') {
              this.isDone = true;
              this.translate(currentPage, pageWidth, speed, callback);
              if (prevPage) {
                this.translate(prevPage, 0, speed);
              }
            } else {
              this.isDone = false;
              this.translate(currentPage, 0, speed, callback);
              if (typeof offsetLeft !== 'undefined') {
                if (prevPage && offsetLeft > 0) {
                  this.translate(prevPage, pageWidth * -1, speed);
                }
                if (nextPage && offsetLeft < 0) {
                  this.translate(nextPage, pageWidth, speed);
                }
              } else {
                if (prevPage) {
                  this.translate(prevPage, pageWidth * -1, speed);
                }
                if (nextPage) {
                  this.translate(nextPage, pageWidth, speed);
                }
              }
            }
          }, 10);
        },

        next() {
          this.doAnimate('next');
        },

        prev() {
          this.doAnimate('prev');
        },

      doOnTouchStart(event) {
          if (this.noDrag) return;

          let element = this.$el;
          let dragState = this.dragState;
          let touch = event.touches[0];

          dragState.startTime = new Date();
          dragState.startLeft = touch.pageX;
          dragState.startTop = touch.pageY;
          dragState.startTopAbsolute = touch.clientY;

          dragState.pageWidth = element.offsetWidth;
          dragState.pageHeight = element.offsetHeight;

          let prevPage = this.$children[this.index - 1];
          let dragPage = this.$children[this.index];
          let nextPage = this.$children[this.index + 1];

          if (this.continuous && this.pages.length > 1) {
            if (!prevPage) {
              prevPage = this.$children[this.$children.length - 1];
            }
            if (!nextPage) {
              nextPage = this.$children[0];
            }
          }

          dragState.prevPage = prevPage ? prevPage.$el : null;
          dragState.dragPage = dragPage ? dragPage.$el : null;
          dragState.nextPage = nextPage ? nextPage.$el : null;

          if (dragState.prevPage) {
            dragState.prevPage.style.display = 'block';
          }

          if (dragState.nextPage) {
            dragState.nextPage.style.display = 'block';
          }
        },

      doOnTouchMove(event) {
          if (this.noDrag) return;
          let dragState = this.dragState;
          let touch = event.touches[0];

          dragState.currentLeft = touch.pageX;
          dragState.currentTop = touch.pageY;
          dragState.currentTopAbsolute = touch.clientY;

          let offsetLeft = dragState.currentLeft - dragState.startLeft;
          let offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;

          let distanceX = Math.abs(offsetLeft);
          let distanceY = Math.abs(offsetTop);
          if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
            this.userScrolling = true;
            return;
          } else {
            this.userScrolling = false;
          }
          offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1);

          let towards = offsetLeft < 0 ? 'next' : 'prev';

          if (dragState.prevPage && towards === 'prev') {
            this.translate(dragState.prevPage, offsetLeft - dragState.pageWidth);
          }
          this.translate(dragState.dragPage, offsetLeft);
          if (dragState.nextPage && towards === 'next') {
            this.translate(dragState.nextPage, offsetLeft + dragState.pageWidth);
          }
        },

      doOnTouchEnd() {
          if (this.noDrag) return;

          let dragState = this.dragState;

          let dragDuration = new Date() - dragState.startTime;
          let towards = null;

          let offsetLeft = dragState.currentLeft - dragState.startLeft;
          let offsetTop = dragState.currentTop - dragState.startTop;
          let pageWidth = dragState.pageWidth;
          let index = this.index;
          let pageCount = this.pages.length;

          if (dragDuration < 300) {
            let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5;
            if (isNaN(offsetLeft) || isNaN(offsetTop)) {
              fireTap = true;
            }
            if (fireTap) {
              this.$children[this.index].$emit('tap');
            }
          }

          if (dragDuration < 300 && dragState.currentLeft === undefined) return;

          if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
            towards = offsetLeft < 0 ? 'next' : 'prev';
          }

          if (!this.continuous) {
            if ((index === 0 && towards === 'prev') || (index === pageCount - 1 && towards === 'next')) {
              towards = null;
            }
          }
          if (this.$children.length < 2) {
            towards = null;
          }

          this.doAnimate(towards, {
            offsetLeft: offsetLeft,
            pageWidth: dragState.pageWidth,
            prevPage: dragState.prevPage,
            currentPage: dragState.dragPage,
            nextPage: dragState.nextPage
          });

          this.dragState = {};
        },

       initTimer() {
          if (this.auto > 0) {
            this.timer = setInterval(() => {
              if (!this.continuous && (this.index >= this.pages.length - 1)) {
                return this.clearTimer();
              }
              if (!this.dragging && !this.animating) {
                this.next();
              }
            }, this.auto);
          }
        },
        clearTimer() {
          clearInterval(this.timer);
          this.timer = null;
        },
        swipeItemCreated() {
          clearTimeout(this.reInitTimer);
          this.reInitTimer = setTimeout(() => {
            this.reInitPages();
          }, 100);
        },

        swipeItemDestroyed() {
          clearTimeout(this.reInitTimer);
          this.reInitTimer = setTimeout(() => {
            this.reInitPages();
          }, 100);
        }
    },

    destroyed() {
      if (this.timer) {
        this.clearTimer();
      }
      if (this.reInitTimer) {
        clearTimeout(this.reInitTimer);
        this.reInitTimer = null;
      }
    },

    mounted() {

      this.initTimer();

      this.reInitPages();

      var element = this.$el;

      element.addEventListener('touchstart', (event) => {
        if (this.animating) return;
        this.dragging = true;
        this.userScrolling = false;
        if (this.timer) this.clearTimer();
        this.doOnTouchStart(event);
      });

      element.addEventListener('touchmove', (event) => {
        // event.preventDefault();
        if (!this.dragging) return;
        if (this.timer) this.clearTimer();
        this.doOnTouchMove(event);
      });

      element.addEventListener('touchend', (event) => {
        if (this.userScrolling) {
          this.dragging = false;
          this.dragState = {};
          return;
        }
        if (!this.dragging) return;
        this.initTimer();
        this.doOnTouchEnd(event);
        this.dragging = false;
      });
    }
  };
</script>
<style lang="less" scoped>
.qg-swipe {
     overflow:hidden;
     position:relative;
     height:100%;
     .qg-swipe-items-wrap {
     	position:relative;
     	overflow: hidden;
     	height:100%;
     	&>div {
     	    position:absolute;
     	    transform:translateX(-100%);
	     width:100%;
	     height:100%;
	     display:none;
	     &.is-active {
	     	display:block;
	     	transform:none;
	     }
     	}
     }
     .qg-swipe-indicators {
     	position:absolute;
     	left:50%;
     	bottom: 10px;
     	transform:translateX(-50%);
	     .qg-swipe-indicator {
        	    display:inline-block;
        	    width: 7px;
        	    height:7px;
        	    border-radius: 100%;
        	    background: #fff;
        	    opacity: 0.5;
        	    margin: 0 3px;
        	    &.is-active {
        	    	 opacity: 1;
        	    }
	     }
     }
}
</style>
