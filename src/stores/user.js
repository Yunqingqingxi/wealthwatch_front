import {defineStore} from "pinia";


export const useTokenStore = defineStore({
    id: 'user',
    state: () => ({
        token: '', // 用于存储token
        isAuthenticated: false, // 用于判断用户是否已登录
        user: null, // 用于存储用户信息
    }),
    getters: {
        getToken(state) {
            return state.token;
        },
        getUser(state) {
            return state.user;
        },
        isLoggedIn(state) {
            return state.isAuthenticated;
        },
    },
    actions: {
        setToken(newToken) {
            this.token = newToken;
            this.isAuthenticated = !!newToken;
            if(newToken){
                localStorage.setItem("token", newToken);
            }else{
             localStorage.removeItem('token')   
            }
        },
        setUser(user) {
            this.user = user;
        },
        logout() {
            // 清除本地存储中的token
            localStorage.removeItem("token");
            localStorage.removeItem("user")
            this.token = null;
            this.isAuthenticated = false;
            this.user = null;
        },
    },
    persist:{
        enabled: true,
        strategies: [
            {
                key: 'user',
                storage: localStorage,
                path:['token','isAuthenticated','user']
                
            }
        ]
    }

})