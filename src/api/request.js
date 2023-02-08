import axios from 'axios'
import qs from 'qs'//引入 qs ，这个库是 axios 里面包含的，不需要再下载了
var tokenData = localStorage.getItem('lcqxfzjzToken');
var token = ""
if (tokenData) {
    token = tokenData.accessToken
}

let baseURL = process.env.NODE_ENV === 'development' ? "http://61.153.185.211:8082" : 'http://172.24.97.251:8082';
// let baseURL = process.env.NODE_ENV === 'development' ? "http://192.168.0.37:8082" : 'http://172.24.97.251:8082';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: baseURL,
    timeout: 50000
})
//请求拦截器（接口请求之前）
service.interceptors.request.use(
    config => {
        if(config.method === 'post'||config.method === 'put'||config.method === 'patch') { // post请求时，处理数据
            if(config.headers['Content-Type'] !== 'multipart/form-data'){
                config.data = qs.stringify({
                    ...config.data //后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用
                  })
              }else{
                // 上传图片，不能拦截
                config.data = config.data;
              }
        } 
    //    config.headers.Authorization="agf1a9aeta4ga41g96a8g4a6e1t8b1ajh48r4rtr"
        return config
    },
    error => {
        console.log(error)
        return Promise.reject()
    }
)
//响应拦截器（接口请求之后）
service.interceptors.response.use(
    response => {
        if (response.data.state == 1) {
            Message({
                message: '登录失败',
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            return response
        }

    },
    error => {
        // Do something with request error
        // console.log({ error }) // for debug
        return Promise.reject(error)
    }
)
export default service
