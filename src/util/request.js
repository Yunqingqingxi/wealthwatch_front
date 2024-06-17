import axios from 'axios'
import { useTokenStore } from '../stores/user';
import { ElMessage } from 'element-plus';

const server = axios.create({
    baseURL:'/api', 
    timeout: 15000, // 请求超时时间
    setHeaders: {
        'Content-Type': 'application/json',
    },
})

// 请求拦截器 
server.interceptors.request.use(
    config => {

        const store = useTokenStore();
        const token = store.token;

        if (token) {
            config.headers.Authorization = token;
        }
        return config;
},
error => {
    console.log("请求错误"+error);
    return Promise.reject(error);
}
)

// 响应拦截器
server.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.response) {
            switch (error.response.status) { 
                case 400:
                    ElMessage.error('请求无效');
                    break;
                case 401:
                    ElMessage.error('尚未登录，请重新登录');
                    router.push('/login').then(r => {
                        localStorage.removeItem('token');
                    });
                    break;
                case 403:
                    ElMessage.error('您没有权限，请联系管理员');
                    break;
                case 404:
                    ElMessage.error('请求未找到');
                    break;
                case 500:
                    ElMessage.error('系统异常');
                    break;
                case 504:
                    ElMessage.error('请求超时，请稍后再试');
                    break;
                case 301:
                    ElMessage.error('用户名或密码错误');
                    break;
                default:
                    ElMessage.error('系统异常');
                    break;
            }
        }
        return Promise.reject(error);
    }
);


export default server