import request from '../utils/request'

export function requestConfirmCode(params){
    return request({
        url: '/{domain}/verification/sms/get',
        method: 'get',
        params
    })
}