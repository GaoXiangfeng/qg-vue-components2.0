import VueRouter from 'vue-router'

import home from './views/home'
import actionSheet from './views/actionSheet'
import dateActionSheet from './views/dateActionSheet'
import addressActionSheet from './views/addressActionSheet'
import jdAddressActionSheet from './views/jdAddressActionSheet'
import bankcardActionSheet from './views/bankcardActionSheet'
import goodsActionSheet from './views/goodsActionSheet'
import giftActionSheet from './views/giftActionSheet'
import modal from './views/modal'
import button from './views/button'
import header from './views/header'
import input from './views/input'
import toast from './views/toast'
import keyboard from './views/keyboard.vue'
import loading from './views/loading.vue'
import swipe from './views/swipe.vue'
import scrollList from './views/scrollList.vue'
import upTop from './views/upTop.vue'
import indexSection from './views/indexSection.vue'
import alertify from './views/alertify'
import picker from './views/picker.vue'
import uploadImage from './views/uploadImage.vue'
const routes = [{
  path: '/',
  name: 'home',
  component: home
},{
  path: '/actionSheet',
  name: 'actionSheet',
  component: actionSheet,
    meta: {
        title: 'actionSheet'
    }
}, {
  path: '/dateActionSheet',
  name: 'dateActionSheet',
  component: dateActionSheet,
    meta: {
        title: 'dateActionSheet'
    }
}, {
  path: '/addressActionSheet',
  name: 'addressActionSheet',
  component: addressActionSheet,
    meta: {
        title: 'addressActionSheet'
    }
},{
    path: '/jdAddressActionSheet',
    name: 'jdAddressActionSheet',
    component: jdAddressActionSheet,
      meta: {
          title: 'jdAddressActionSheet'
      }
  },{
  path: '/bankcardActionSheet',
  name: 'bankcardActionSheet',
  component: bankcardActionSheet,
    meta: {
        title: 'bankcardActionSheet'
    }
},{
    path: '/goodsActionSheet',
    name: 'goodsActionSheet',
    component: goodsActionSheet,
      meta: {
          title: 'goodsActionSheet'
      }
  },
  {
    path: '/giftActionSheet',
    name: 'giftActionSheet',
    component: giftActionSheet,
      meta: {
          title: 'giftActionSheet'
      }
  },{
    path: '/modal',
    name: 'modal',
    component: modal,
    meta: {
        title: 'modal'
    }
},{
    path: '/button',
    name: 'button',
    component: button,
    meta: {
        title: 'button'
    }
},{
    path: '/header',
    name: 'header',
    component: header,
    meta: {
        title: 'header'
    }
}, {
    path: '/input',
    name: 'input',
    component: input,
    meta: {
        title: 'input'
    }
},{
    path: '/toast',
    name: 'toast',
    component: toast,
    meta: {
        title: 'toast'
    }
},
    {
        path: '/keyboard',
        name: 'keyboard',
        component: keyboard,
        meta: {
            title: 'keyboard'
        }
    },{
        path: '/loading',
        name: 'loading',
        component: loading,
        meta: {
            title: 'loading'
        }
    },{
      path: '/swipe',
      name: '/swipe',
      component:swipe,
        meta: {
            title: 'swipe'
        }
    },{
      path: '/scrollList',
      name: 'scrollList',
      component:scrollList,
        meta: {
            title: 'scrollList'
        }
    },{
      path: '/upTop',
      name: 'upTop',
      component:upTop,
      meta: {
        title: 'upTop'
      }
    },{
      path: '/indexSection',
      name: 'indexSection',
      component:indexSection,
        meta: {
          title: 'indexSection'
        }
    },{
        path: '/alertify',
        name: 'alertify',
        component: alertify,
        meta: {
            title: 'alertify'
        }
    }, {
        path: '/picker',
        name: 'picker',
        component: picker,
        meta: {
            title: 'picker'
        }
    }, {
        path: '/uploadImage',
        name: 'uploadImage',
        component: uploadImage,
        meta: {
            title: 'uploadImage'
        }
    }]


export default routes
