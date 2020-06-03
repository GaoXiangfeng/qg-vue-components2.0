/**
 * Created by jialiu on 16/12/20.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import qg from './modules/module'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let modules={...qg}

let store  =  new Vuex.Store({
    modules:{
        qg:qg
    }
})

module.exports= {
    store,
    modules
}
