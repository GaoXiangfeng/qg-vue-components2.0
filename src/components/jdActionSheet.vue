<style lang="less" scoped>
@import "../utils/_vars.less";
@import "../assets/qg.less";
.actionsheet-enter-active,
.actionsheet-leave-active {
  transition: transform 0.2s;
}

.actionsheet-enter,
.actionsheet-leave-active {
  transform: translate3d(0, 50%, 0);
}

.jd-action-sheet {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  .jdGroupList {
    .address-item {
      padding: 10px 10px 10px 28px;
      font-size: 13px;
    }
    .choose-selected {
      color: #b44b4d;
    }
    .choose-icon {
      display: inline-block;
      background: url("../assets/actionsheet-selected@2X.png") no-repeat;
      background-size: 100%;
      width: 11px;
      height: 9px;
    }
    .choose-address-text {
      padding-left: 6px;
      padding-right: 10px;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
  }
  /*多选项的处理*/
  &.multiterm {
    .action-sheet-wrap {
      height: 370px;
      .jd-group {
        a {
          padding-left: 14px;
          padding-bottom: 15px;
          text-align: left;
        }
        a:nth-child(1) {
          padding-top: 30px;
        }
      }
    }
    .action-sheet-wrap185 {
      height: 185px;
    }
  }
  /*滑动银行卡的样式*/
  &.banktiterm {
    .action-sheet-wrap {
      height: 370px;
      .jd-group {
        a {
          text-align: center;
        }
      }
    }
    .action-sheet-wrap185 {
      height: 185px;
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .action-sheet-wrap {
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    transition: transform 0.2s;
    transform: translate3d(0, 100%, 0);
    &.slideInUp {
      transform: translate3d(0, 0, 0);
    }
    .title {
      font-size: 13px;
      line-height: 35px;
      height: 50px;
      text-align: center;
      color: #808080;
      border-bottom: none !important;
      .title-text {
        display: inline-block;
        margin-top: 4px;
        font-size: 15px;
      }
      .close-icon {
        position: absolute;
        width: 34px;
        height: 34px;
        background: url("../assets/close.png") no-repeat;
        background-position: 15px 10px;
        background-size: 40%;
        top: 10px;
        right: 14px;
      }
    }
    .listTitle {
      position: absolute;
      width: 100%;
      top: 0;
      font-size: 13px;
      line-height: 55px;
      height: 74px;
      border-bottom: 1px solid #dcdcdc;
      text-align: center;
      color: #808080;
      .list-title-text {
        font-size: 15px;
      }
      .close-icon {
        position: absolute;
        width: 34px;
        height: 34px;
        background: url("../assets/close.png") no-repeat;
        background-size: 40%;
        background-position: 15px 8px;
        top: 10px;
        right: 16px;
      }
    }
    .list-content {
      position: absolute;
      top: 92px;
    }
    .list-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #b44b4d;
      color: #ffffff;
      text-align: center;
    }
    .nav {
      border-bottom: 1px solid #e6e6e6;
      text-align: left;
      label {
        display: inline-block;
        line-height: 30px;
        padding: 0 15px;
        font-size: 15px;
        &.selected {
          border-bottom: 2px solid @modal-default-confirm-color;
        }
      }
    }
    .jd-group {
      overflow: hidden;
      width: 100%;
      a {
        line-height: 30px;
        font-size: 13px;
        text-align: center;
        display: block;
        color: #000;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-user-select: none;
        -moz-user-focus: none;
        -moz-user-select: none;
        &.active {
          color: @modal-default-confirm-color;
        }
        .actionsheet-selected {
          margin-left: 10px;
          display: inline-block;
          background: url("../assets/actionsheet-selected@2X.png") no-repeat;
          background-size: 100%;
          width: 11px;
          height: 9px;
        }
      }
    }
  }
}
</style>
<template>
    <div class="jd-action-sheet" :class="{'multiterm': multiterm,'banktiterm': isScroll }" v-show="show" @click="close" qg-log="关闭ActionSheet">
        <div class="action-sheet">
            <div @click.stop class="action-sheet-wrap qg-vbox" :class="{'slideInUp':showAnimate,'action-sheet-wrap185':height185}" v-show="!showAddressList">
                <slot name="title">
                    <div class="title">
                        <span class="title-text">{{title}}</span>
                        <div class="close-icon" @click="close"></div>
                    </div>
                </slot>
                <slot name="content">
                    <div v-if="multiterm" class="nav">
                        <label v-for="(item, index) in navTitle" :class="{selected: currentNav==index}" @click="navChange(index)">
                            {{item.title}}
                        </label>
                    </div>
                    <div class="jd-group qg-flex-1 jdGroup" :class="className">
                        <div>
                            <a href="javascript:;" :class="{active:selectedIndex[currentNavPage]==index}" v-for="(item, index) in data" @click="itemClick(index)">
                                            {{item.name}} <div v-if="showSelected && selectedIndex[currentNavPage] == index" class="actionsheet-selected"></div>
                                    </a>
                            <a v-if="isShowCancel" href="javascript:;" @click="close('close')">取消</a>
                        </div>
                    </div>
                </slot>
                <slot name="footer">

                </slot>
            </div>
            <div @click.stop class="action-sheet-wrap qg-vbox" :class="{'slideInUp':showAnimate,'action-sheet-wrap185':height185}" v-show="showAddressList">
                <div class="listTitle">
                    <span class="list-title-text">配送至</span>
                    <div class="close-icon" @click="close"></div>
                </div>
                <div class="list-content">
                    <div class="jd-group qg-flex-1 jdGroupList">
                            <div class="address-item qg-box" :class="{'choose-selected':chooseIndex===index}" v-for="(item, index) in addressList" @click="addressClick(index,item)"><div class="choose-icon qg-box" v-if="chooseIndex===index"></div><div class="choose-address-text qg-box">{{item.province.name}}{{item.city.name}}{{item.county.name}}{{item.town && item.town.name || ''}}{{item.address || ''}}</div></div>
                    </div>
                </div>
                <div class="list-footer" @click="initChooseAddress">
                   选择其他地址
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Popup from "../mixin/popup";
import { store } from "../store";
//import IScroll from 'iscroll'
import BScroll from "better-scroll";
let Scroll;
module.exports = {
  mixins: [Popup],
  data() {
    return {
      tempShowList: [],
      data: [],
      addressList: [],
      chooseIndex: 0,
      result: {},
      showAnimate: false,
      animateLeave: false,
      currentNav: 0,
      currentNavPage: "proviceIndex",
      selectIndex: [],
      selectedIndex: {
        proviceIndex: -1,
        cityIndex: -1,
        district: -1,
        town: -1
      },
      navTitle: [],
      isFirst: true,
      btDouble: false,
      hasAddressList: false,
      isFirstValue: true
    };
  },
  props: {
    // actionSheet 的标题
    title: String,
    /*
        this.actionSheet.actions = [{
          title: '导航名字',
          data: [{
            name: '条目显示的名字'
            value: '条目的值'
          }]
        }]
         */
    actions: {
      type: Array,
      default: () => []
    },
    /*
        param
          arg1 下一个导航栏目的下标
          arg2 所有选择的对象，并且以导航下标做key值
         */
    callback: Function,
    chooseCallback: Function,
    multiterm: {
      default: false
    },
    height185: {
      default: false
    },
    /*
        预先选中的数组，接受两种模式，一种是长度为1的actionsheet，接受selectedIndex:index,另一种是长度为3的地址数组，参见例子
        */
    modellist: {
      type: Array,
      default: () => []
    },
    showList: {
      type: Array,
      default: () => []
    },
    /*
        是否开启滚动模式，适用于单选项较多的情况
        */
    isScroll: {
      default: false
    },
    isShowCancel: {
      default: false
    },
    openCallback: Function,
    name: String,
    className: {
      type: String,
      default: () => "jdGroup"
    },
    /*是否展示对勾*/
    showSelected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    show() {
      if (this.modellist.length > 0 && this.isFirst) {
        this.renderExistMessage();
      }
      setTimeout(() => {
        this.showAnimate = this.show;
      }, 0);
      if (this.open && this.actions.length != 0) {
        this.data = this.actions[this.currentNav].data;
        if (this.navTitle.length === 0) {
          this.actions.map(item => {
            this.navTitle.push({
              title: item.title
            });
          });
        }
      }
      if (!this.open && this.showList.length > 0) {
        this.tempShowList = this.showList;
      }
      this.$nextTick(() => {
        this.scroll && this.scroll.refresh();
      });
      return this.open;
    },
    showAddressList() {
      this.addressList = this.showList;
      if (this.isFirstValue) {
        this.tempShowList = this.showList;
      }
      if (this.tempShowList.length > 0) {
        this.hasAddressList = true;
        return true;
      } else {
        this.tempShowList = [];
        this.hasAddressList = false;
        return false;
      }
    }
  },
  methods: {
    initChooseAddress() {
      this.isFirstValue = false;
      this.tempShowList = [];
      this.navChange(0);
      this.$nextTick(() => {
        this.scroll && this.scroll.refresh();
      });
    },
    addressClick(index, item) {
      this.chooseIndex = index;
      if (this.chooseCallback) {
        this.chooseCallback(item);
      }
      this.close();
    },
    itemClick(index) {
      this.result[this.currentNav] = this.data[index];
      if (this.navTitle[this.currentNav]) {
        this.navTitle[this.currentNav].title = this.data[index].name;
      }
      this.selectedIndex[this.currentNavPage] = index;
      if (this.currentNav + 1 == this.actions.length) {
        this.selectedIndex.town = index;
        setTimeout(() => {
          this.close();
        }, 200);
        if (this.multiterm) {
          this.chooseIndex = "";
          this.callback(this.result, "end");
        } else {
          this.callback(this.result[0]);
        }
      } else {
        setTimeout(() => {
          ++this.currentNav;
          this.currentNavPage = "cityIndex";
          if (this.currentNav == 3) {
            this.selectedIndex.district = index;
            this.currentNavPage = "town";
          }
          if (this.currentNav == 2) {
            this.selectedIndex.cityIndex = index;
            this.currentNavPage = "district";
          }
          if (this.currentNav == 1) {
            this.selectedIndex.proviceIndex = index;
            this.currentNavPage = "cityIndex";
          }
          if (this.callback) {
            this.callback(this.result, this.currentNav).then(data => {
              if (data.length == 0) {
                delete this.result[3];
                this.actions[3].data = [];
                this.chooseIndex = "";
                this.callback(this.result, "end");
                this.close("close");
                this.navChange(2);
                return;
              }
              this.data = data;
              this.actions[this.currentNav].data = data;
              this.$nextTick(() => {
                this.scroll && this.scroll.refresh();
              });
            });
          }
          this.data = [];
        }, 10);
      }
    },
    navChange(index) {
      if (index < this.currentNav) {
        this.navTitle.map((item, i) => {
          if (i >= index) {
            item.title = this.actions[i].title;
          }
          if (i > index) {
            this.actions[i].data = [];
          }
        });
        this.data = [];
        this.currentNav = index;
        if (index == 0) {
          this.currentNavPage = "proviceIndex";
          this.selectedIndex.cityIndex = -1;
          this.selectedIndex.district = -1;
          this.selectedIndex.town = -1;
        } else if (index == 1) {
          this.currentNavPage = "cityIndex";
          this.selectedIndex.district = -1;
          this.selectedIndex.town = -1;
        } else if (index == 2) {
          this.currentNavPage = "district";
          this.selectedIndex.town = -1;
        } else if (index == 3) {
          this.currentNavPage = "town";
        }
        this.callback(this.result, index).then(data => {
          this.data = data;
          this.$nextTick(() => {
            this.scroll && this.scroll.refresh();
          });
        });
      }
    },
    close(e) {
      this.showAnimate = false;
      setTimeout(() => {
        store.dispatch("closeActionSheet", this.name);
      }, 200);
    },
    stop(e) {
      return false;
    },
    renderExistMessage() {
      this.isFirst = false;
      if (this.modellist.length > 1) {
        this.currentNav = this.modellist.length - 1;
        //this.currentNavPage =  this.currentNav===2?'district':'cityIndex';
        if (this.currentNav === 2) {
          this.currentNavPage = "district";
        } else if (this.currentNav === 3) {
          this.currentNavPage = "town";
        } else if (this.currentNav === 1) {
          this.currentNavPage = "cityIndex";
        } else if (this.currentNav === 0) {
          this.currentNavPage = "proviceIndex";
        }
        if (this.navTitle.length == 0) {
          this.modellist.map((item, index) => {
            this.navTitle.push({ title: item.name });
          });
        }
      } else if (this.modellist.length === 1) {
        this.currentNav = 0;
        this.selectedIndex["proviceIndex"] = this.modellist[0].selectItem;
      }
    }
  },
  mounted() {
    this.scroll = new BScroll("." + this.className, {
      scrollY: true,
      click: true
    });
    this.$el.addEventListener("touchmove", e => {
      e.preventDefault();
    });
  }
};
</script>
