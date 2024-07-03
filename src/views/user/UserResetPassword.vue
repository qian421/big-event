<template>

        <el-card >
            <el-form style="max-width: 600px" :model="pwdModel" status-icon :rules="rules" label-width="auto"
                class="demo-ruleForm">
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input v-model="pwdModel.oldPwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input v-model="pwdModel.newPwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="确认新密码" prop="rePwd">
                    <el-input v-model="pwdModel.rePwd" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()" style="margin-left: 30%;">
                        确认
                    </el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>


</template>

<script lang="ts" setup>
import {ref } from 'vue'




const validateRePwd = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入新密码'))
    } else if (value !== pwdModel.value.newPwd) {
        callback(new Error("确认密码与新密码不匹配"))
    } else {
        callback()
    }
}

const pwdModel= ref({
    oldPwd: '',
    newPwd: '',
    rePwd: '',
})

const rules = {
    oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' },
        { pattern: /^\S{6,16}$/, message: '密码长度必须是6-16位的非空字符串', trigger: 'blur' }
      
    ],
    newPwd: [{ required: true, message: '请输入新密码', trigger: 'blur' },
        { pattern: /^\S{6,16}$/, message: '密码长度必须是6-16位的非空字符串', trigger: 'blur' }
    ],
    rePwd: [{ validator: validateRePwd, trigger: 'blur' },
    { pattern: /^\S{6,16}$/, message: '密码长度必须是6-16位的非空字符串', trigger: 'blur' }
    ],
}

import { ElMessage } from 'element-plus'
import { useUserInfoStore } from '@/stores/userInfo.js'
import { useRouter } from 'vue-router';
const router = useRouter()
const userInfoStore = useUserInfoStore()
import { userUpdatePasswordService } from '@/api/user.js'
const submitForm = async () => {
    
    let result = await userUpdatePasswordService(pwdModel.value)
    ElMessage.success('修改成功,即将跳转登录页')
    //修改pinia用户信息
    userInfoStore.setInfo(pwdModel.value)
    resetForm()
    setTimeout(() => {
        router.push('/login')
    }, 2000);
 

}
const resetForm = () => {
    pwdModel.value = {
        oldPwd: '',
        newPwd: '',
        rePwd: ''
    }
}


</script>
