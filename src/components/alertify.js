import {store} from '../store'

module.exports=function (message,duration,styleObject) {
    store.commit("qg/OPEN_ALERTIFY",{
        message:message,
        duration:duration,
        styleObject:styleObject
    })

}