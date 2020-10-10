import axios from 'axios'
const CancelToken = axios.CancelToken
//  检测开发环境
const isDve = process.env.NODE_ENV === 'development'
//  根据开发环境定义base url
const service = axios.create({
  baseURL: isDve ? 'http://localhost:3000' : '',
})
//  对请求添加拦截器
service.interceptors.request.use((config) => {
  //  对请求加上token 进行请求合法性验证
  config.data = Object.assign({}, config.data, {
    // authToken:">>>>>"
  })
  return config
})
//  对响应数据进行拦截处理错误
// service.interceptors.response.use(res=>{
//   if(res.status===200) {
//     return res.data
//   }else {
//     return 'error'
//   }
// })

//  注册请求并添加CancelToken
export const register = (data) => {
  return service.post(
    '/register',
    { ...data },
    {
      cancelToken: new CancelToken(function executor(c) {
        window.p.push(c)
      }),
    }
  )
}
//  登录请求
export const login = (data) => {
  return service.post(
    '/login',
    {
      ...data,
    },
    {
      cancelToken: new CancelToken(function executor(c) {
        window.p.push(c)
      }),
    }
  )
}
//  完善信息
export const detail = (data) => {
  return service.post(
    '/detail',
    {
      ...data,
    },
    {
      cancelToken: new CancelToken(function executor(c) {
        window.p.push(c)
      }),
    }
  )
}
//  请求用户列表
export const getUserList = (data) => {
  return service.post(
    '/getuser/list',
    { ...data },
    {
      cancelToken: new CancelToken(function executor(c) {
        window.p.push(c)
      }),
    }
  )
}
//  请求用户个人信息
export const getUserCenter = (data) => {
  return service.post(
    '/getuser/center',
    { ...data },
    {
      cancelToken: new CancelToken(function executor(c) {
        window.p.push(c)
      }),
    }
  )
}
