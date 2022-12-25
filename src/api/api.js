import http from '@http/http'
export const exportCheckState = () => http.EXPORT('/api/stuApply/exportState')
export const exportResult = () => http.EXPORT('api/stuApply/exportResult')
