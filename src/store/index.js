import { createStore } from 'vuex'
import { login, getinfo } from '~/api/manager'
import { setToken, removeToken } from "~/utils/auth"

const store = createStore({
    state() {
        return {
            // 用户信息
            user: {},
            // 侧边栏
            asideWidth: "250px"
        }
    },
    mutations: {
        SET_USERINFO(state, user) {
            state.user = user
        },
        // 展开、缩起侧边栏
        handleAsideWidth(state){
            state.asideWidth = state.asideWidth == "250px" ? "64px": "250px"
        }
    },
    actions: {
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    setToken(res.token)
                    resolve(res)
                }).catch(err => reject(err))
            }
            )
        },
        getinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo().then(res => {
                    commit("SET_USERINFO", res)
                    resolve(res)
                }).catch(err => reject(err))

            })
        },
        logout({ commit }) {
            removeToken()
            commit("SET_USERINFO", {})
        }
    }
})


export default store