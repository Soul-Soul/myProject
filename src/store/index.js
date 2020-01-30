import Vue from 'vue'
import Vuex from 'vuex'
import module1 from './module/module1'
import module2 from './module/module2'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getter:{

    },
    modules: {
        a:module1,
        b:module2
    }
})
