/**
 * Created by jialiu on 16/12/20.
 */

import * as types from '../type'
import Vue from 'vue'

const state = {
    actionSheet:{
        open:false
    },
    picker: {
        open: false
    },
    modal:{
        open:false
    },
    toast:{
        open:false,
        message:'',
        styleObject:{}
    },
    input:{
        inputCallback:{

        }
    },
    loading:{
        open:false
    },
    indexSection:{
        open:false
    },
    alertify:{
        open:false,
        message:'',
        duration: 2000,
        styleObject:{}
    }
}

// getters
const getters = {

}

// actions
const actions = {
    closeActionSheet ({ commit },name) {
        commit(types.CLOSE_ACTIONSHEET,name)
    },
    openActionSheet ({ commit },name) {
        commit(types.OPEN_ACTIONSHEET,name)
    },
    closePicker ({ commit },name) {
        commit(types.CLOSE_PICKER,name)
    },
    openPicker ({ commit },name) {
        commit(types.OPEN_PICKER,name)
    },
    closeModal ({ commit },name) {
        commit(types.CLOSE_MODAL,name)
    },
    openModal ({ commit },name) {
        commit(types.OPEN_MODAL,name)
    },
    closeToast ({ commit },name) {
        commit(types.CLOSE_TOAST,name)
    },
    openToast ({ commit }, payload) {
        commit(types.OPEN_TOAST,payload)
    },
    closeLoading ({ commit }) {
        commit(types.CLOSE_LOADING)
    },
    openLoading ({ commit }) {
        commit(types.OPEN_LOADING)
    },
    addInputCallback({commit},callbackObj){
        commit(types.ADD_INPUTCALLBACK,callbackObj)
    },
    deleteInputCallback({commit},callbackObj){
        commit(types.DEL_INPUTCALLBACK,callbackObj)
    },
    callInputCallback({commit}){
        commit(types.CALL_INPUTCALLBACK)
    },
    closeIndexSection({commit}) {
        commit(types.CLOSE_INDEXSECTION)
    },
    openIndexSection({commit}) {
        commit(types.OPEN_INDEXSECTION)
    },
    closeAlertify ({ commit }) {
        commit(types.CLOSE_ALERTIFY)
    },
    openAlertify ({ commit }, payload) {
        commit(types.OPEN_ALERTIFY,payload)
    },

}

// mutations
const mutations = {
    //关闭actionsheet，接收name参数,默认open
    [types.CLOSE_ACTIONSHEET] (state,name) {
        name?Vue.delete(state.actionSheet,name):state.actionSheet.open = false
    },
    //打开actionsheet，接收name参数
    [types.OPEN_ACTIONSHEET] (state,name) {
        name?Vue.set(state.actionSheet,name,true):state.actionSheet.open = true
    },
    //关闭picker，接收name参数,默认open
    [types.CLOSE_PICKER] (state,name) {
        name?Vue.delete(state.picker,name):state.picker.open = false
    },
    //打开picker，接收name参数
    [types.OPEN_PICKER] (state,name) {
        name?Vue.set(state.picker,name,true):state.picker.open = true
    },
    //关闭modal，接收name参数
    [types.CLOSE_MODAL] (state,name) {
        name?Vue.delete(state.modal,name):state.modal.open = false
    },
    //打开modal，接收name参数
    [types.OPEN_MODAL] (state,name) {
        name?Vue.set(state.modal,name,true):state.modal.open = true
    },
    [types.CLOSE_TOAST](state,name){
        name?Vue.set(state.toast,name,true):state.toast.open = false
    },
    [types.OPEN_TOAST](state,payload){
        payload.name?Vue.set(state.toast,payload.name,true):state.toast.open = true;
        state.toast.message=payload.message
        state.toast.styleObject=payload.styleObject
    },
    [types.ADD_INPUTCALLBACK](state,callbackObj){
        if(callbackObj){
            state.input.inputCallback[callbackObj.uid]=callbackObj.callback
        }
    },
    [types.DEL_INPUTCALLBACK](state,callbackObj){
        if(callbackObj){
            delete state.input.inputCallback[callbackObj.uid]
        }
        else{
            delete state.input.inputCallback
        }
    },
    [types.CALL_INPUTCALLBACK](state){
        var callback=state.input.inputCallback;
        for(var i in callback){
            if(callback[i]){
                callback[i]()
                return
            }
        }
    },
    [types.OPEN_LOADING] (state) {
        state.loading.open=true;
    },
    [types.CLOSE_LOADING](state){
        state.loading.open=false;
    },
    [types.CLOSE_INDEXSECTION](state) {
        state.indexSection.open = false
    },
    [types.OPEN_INDEXSECTION](state) {
        state.indexSection.open = true
    },
    [types.CLOSE_ALERTIFY](state){
       state.alertify.open = false
    },
    [types.OPEN_ALERTIFY](state,payload){
        state.alertify.open = true;
        state.alertify.message=payload.message
        state.alertify.duration=payload.duration
        state.alertify.styleObject=payload.styleObject
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}