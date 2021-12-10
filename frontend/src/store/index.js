import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mno: '',
        name: ''
    },
    mutations: {
        SET_USER(state, info){
            state.mno = info.mno,
            state.name = info.name;
        },
        RESET_USER(state){
            state.mno = '',
            state.name = '';
        }
    },
    actions: {
        async LOGIN({commit}, info){
            commit('SET_USER', info);
        },
        async LOGOUT({commit}){
            commit('RESET_USER');
        }
    },
    getters: {}
})