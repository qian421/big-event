import request from '@/utils/request.js'

export const userRegisterService = (registerData)=>{
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key, registerData[key])
    }
   return  request.post('/user/register',params)
}

export const userLoginService = (loginData)=>{
    const params = new URLSearchParams()
    for (let key in loginData) {
        params.append(key, loginData[key])
    }
   return  request.post('/user/login',params)
}
export const userInfoService = () => {
    return request.get('/user/userInfo')
}

//修改个人信息
export const userInfoUpdateService = (userInfo) => {
    return request.put('/user/update', userInfo)
}

//修改头像
export const userAvatarUpdateService = (avatarUrl) => {
    let params = new URLSearchParams();
    params.append('avatarUrl', avatarUrl)
    return request.patch('/user/updateAvatar', params)
}
//修改密码
export const userUpdatePasswordService = (pwdModel) => {
    const params = {
        old_pwd: pwdModel.oldPwd,
        new_pwd: pwdModel.newPwd,
        re_pwd: pwdModel.rePwd
    };
    return request.patch('/user/updatePwd', params)
}
