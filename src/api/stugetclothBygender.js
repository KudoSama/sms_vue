import http from '@http/http'
export const login = (mng) => http.POST('/api//manager/login',mng)
