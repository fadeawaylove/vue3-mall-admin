import { createStore } from 'vuex'
import { login, getinfo, logout } from '~/api/manager'
import { setToken, removeToken } from "~/utils/auth"

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
            return new Promise((resolve, reject) => {
                logout().then(res => {
                    removeToken()
                    commit("SET_USERINFO", {})
                    resolve(res)
                }).catch(err => reject(err))

            })
        }
    }
})


export default store