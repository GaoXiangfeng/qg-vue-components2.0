/**
 * Created by jialiu on 17/3/29.
 */
import {store} from '../store'

module.exports=function (message,name,styleObject) {
    store.commit("qg/OPEN_TOAST",{
    	message:message,
    	name:name,
    	styleObject:styleObject
    })

}