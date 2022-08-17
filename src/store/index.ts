import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

type StateProperty = {
    key: string,
    value: string
}

type State = {
    [key: string]: string | number | boolean
}

export default new Vuex.Store({
    state: {
        width: 1280,
        height: 720,
        loading: false
    },
    getters: {
        width: state => state.width,
        height: state => state.height,
        isLoading: state => state.loading
    },
    mutations: {
        setProperty: ((state: State, payload: StateProperty) => state[payload.key] = payload.value)
    },
    actions: {},
    modules: {}
})
