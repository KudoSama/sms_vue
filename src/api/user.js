import http from '@http/http'
export const _getUserInfo = (errMsg) => http.GET('/api/user/getCurUserInfo')
// 得到后端返回的数据res.data(Jsonresponse)
