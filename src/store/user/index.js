import { setToken, getToken, removeToken } from '@/utils/storage'

export default {
    namespaced: true,
    state() {
        return {
            token: getToken() || ''
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        removeToken(state) {
            state.token = ''
            removeToken()
        },
        logout(state) {
            state.token = ''
            removeToken()
        }
    }
}