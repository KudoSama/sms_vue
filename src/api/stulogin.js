import http from '@http/http'
export const login = (stu) => http.POST('/api/student/login', stu)
