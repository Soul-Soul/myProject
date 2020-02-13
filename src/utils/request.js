import axios from 'axios'
import { Message } from 'view-design'
// import { getToken, removeToken, getSecret, removeSecret } from '@/utils/auth'


let apiUrl = ''
let HOST = process.env.HOST
HOST = HOST === 'prod' ? '' : '-test'
apiUrl = 'https://api' + HOST + '.weifengqi18.com'

const service = axios.create({
    baseURL: apiUrl, //填写域名
    // baseURL: 'http://192.168.31.199:8081', //局域网开发
    timeout: 30000, // 请求超时时间
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})


//http request 拦截器
service.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data);
        /*if (getSecret() && getSecret() !== undefined) {
            config.headers['pweb-login-secret-key'] = getSecret() // 让每个请求携带自定义请求头
        }
        if (getToken() && getToken() !== undefined) {
            config.headers['PWEB-TICKETID'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }*/
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    })

//响应拦截器即异常处理
service.interceptors.response.use(
    response => {
       /* /!**
         * code为03是登录失效 可结合自己业务进行修改
         *!/
        if (response.data.result === '03' || response.data.result === '04') {
            removeToken()
            removeSecret()
            vm.$router.push({ path: '/login' })
        }*/
        return response
    },
    error => {
        console.log('err' + error)
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })
export default service