import { createRouter,createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import UserInfo from "@/views/UserInfo.vue";
import Paymes from "@/views/Paymes.vue";
import NotFound from "@/components/NotFound.vue";
import Changepwd from "@/views/Changepwd.vue";
import Total from '@/views/Total.vue';
import Income from '@/views/Income.vue';
import Outcome from '@/views/Outcome.vue';

const routes = [
    {
        path:'/',
        name:"主页",
        component: Home,
        children:[{
            path:'about',
            name:'关于',
            component:Paymes,
            meta:{
                requiresAuth:true // 需要登录
                }
        }, 
        {
            path:'user/userinfo',
            name:'个人信息',
            component:UserInfo,
            meta:{
                requiresAuth:true // 需要登录
                }
        },
        {
            path:'user/changepwd',
            name:'修改信息',
            component:Changepwd,
            meta:{
                requiresAuth:true // 需要登录
                }
        },
        {
            path:'classify/total',
            name:'总览',
            component:Total,
            meta:{
                requiresAuth:true // 需要登录
                }
        },
        {
            path:'classify/income',
            name:'收入',
            component:Income,
            meta:{
                requiresAuth:true // 需要登录
                }
        },
        {
            path:'classify/outcome',
            name:'支出',
            component:Outcome,
            meta:{
                requiresAuth:true // 需要登录
                }
        }
        ],
        meta:{
        requiresAuth:true // 需要登录
        },
    },
    {
        path:'/login',
        name:'登录',
        component:Login,
    },
    {
        path:'/register',
        name:'注册',
        component:Register,
    },
    {
        path:'/:pathMatch(.*)*',
        name:'404',
        component:NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to,from,next)=>{
    if(to.meta.requiresAuth){
        if(localStorage.getItem('token')){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})

export default router;