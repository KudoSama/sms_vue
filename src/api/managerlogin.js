import http from '@http/http'
export const stuGetClothByGender = (mng) => http.GET('/api/cloth/getClothByGender',mng)
