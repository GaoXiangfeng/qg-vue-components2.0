import actionSheet from './components/actionSheet'
import modal from './components/modal'
import dateActionSheet from './components/dateActionSheet'
import addressActionSheet from './components/addressActionSheet'
import jdActionSheet from './components/jdActionSheet'
import jdAddressActionSheet from './components/jdAddressActionSheet'
import bankcardActionSheet from './components/bankcardActionSheet'
import goodsActionSheet from './components/goodsActionSheet'
import giftActionSheet from './components/giftActionSheet'
import button from './components/button'
import header from './components/header'
import input from './components/input'
import toast from './components/toast.vue'
import Toast from './components/toast.js'
import keyboard from './components/keyboard.vue'
import loading from './components/loading.vue'
import store from './store'
import swipe from './components/swipe/swipe.vue'
import swipeItem from './components/swipe/swipe-item.vue'
import scrollList from './components/scrollList/scroll.vue'
import upTop from './components/upTop'
import indexSection from './components/indexSection'
import indexList from './components/indexList'
import alertify from './components/alertify.vue'
import Alertify from './components/alertify.js'
import picker from './components/picker/picker.vue'
import datePicker from './components/picker/datePicker.vue'
import uploadImage from './components/uploadImage'
// require('assets/qg.less')

var components = {
	'action-sheet': actionSheet,
	'date-action-sheet': dateActionSheet,
	'address-action-sheet': addressActionSheet,
	'jd-action-sheet': jdActionSheet,
	'jd-address-action-sheet': jdAddressActionSheet,
	'bankcard-action-sheet': bankcardActionSheet,
	modal,
    'qg-button':button,
	'qg-header':header,
	'qg-input':input,
	'qg-toast':toast,
	'qg-keyboard':keyboard,
	'qg-loading':loading,
	'qg-swipe':swipe,
	'qg-swipe-item':swipeItem,
	'qg-scroll-list':scrollList,
	'qg-top': upTop,
	'qg-index-section': indexSection,
	'qg-index-list': indexList,
	'goods-action-sheet': goodsActionSheet,
	'gift-action-sheet': giftActionSheet,
	'qg-alertify':alertify,
	'qg-picker':picker,
	'qg-date-picker':datePicker,
	'qg-upload-image': uploadImage
}

module.exports= {
	install(Vue) {
		Object.keys(components).forEach((key) => Vue.component(key, components[key]))
	},
	Toast,
	Alertify,
	store
}
