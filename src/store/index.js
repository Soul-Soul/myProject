import Vue from 'vue'
import Vuex from 'vuex'
import module1 from './module1'
import module2 from './module2'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    getters:{

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        module1,
        module2
    }
})
