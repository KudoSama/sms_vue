import http from '@http/http'
export const _getUserInfo = (errMsg) => http.GET('/api/user/getCurUserInfo')
