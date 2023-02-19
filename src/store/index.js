import { createStore } from 'vuex'


const store = createStore({
    state() {
        return {
            // 用户信息
            user: {}
        }
    },
    mutations: {
        SET_USERINFO(state, user) {
            state.user = user
        }
    }
})


export default store