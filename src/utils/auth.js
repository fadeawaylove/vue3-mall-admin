import { useCookies } from '@vueuse/integrations/useCookies'
const cookies = useCookies()
const TokenKey = "admin-token"


export function getToken() {
    return cookies.get(TokenKey)
}


export function setToken(value) {
    return cookies.set(TokenKey, value)
}

export function removeToken() {
    return cookies.remove(TokenKey)
}