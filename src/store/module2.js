import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default{
    state: {
        // 屏幕设备窗口数据
        fullHeight: document.documentElement.clientHeight, // 设备高度
        fullWidth:  document.documentElement.clientWidth,  // 设备宽度
    },
    getter:{

    },
    mutations: {
        setFullHeight(state,setFullHeight){
            state.setFullHeight = setFullHeight
        },
        setFullWidth(state,setFullWidth){
            state.setFullWidth = setFullWidth
        },
    },
    actions: {

    }
}
