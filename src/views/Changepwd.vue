<template>
    <div>
        <el-form 
        :model="form" 
        ref="formRef"  
        :rules="rules"
        label-position="top"
        class="min-w-screen-md"
        hide-required-asterisk
        label-width="120px">
            <el-form-item label="原密码" prop="oldPassword">
                <el-input v-model="form.oldPassword" type="password" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input  v-model="form.newPassword" type="password" show-password />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" type="password" show-password />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changePassword" :loading="loading">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {changed } from '@/api/user';
import { useTokenStore } from '@/stores/user';
import { ElMessage } from 'element-plus';

const tokenStore = useTokenStore();
const formRef = ref(null);
const loading = ref(false);

const form = ref({
    user:'',
    oldPassword: '',
    newPassword: '',
});

const validatePassword = (rule, value, callback) => {
    if (value !== form.value.newPassword) {
        // 两次输入的密码不一致
        callback(new Error('两次输入的密码不一致'));
    } else {
        // 校验通过
        callback();
    }
};

const rules = ref({
    oldPassword: [
        { required: true, message: '请输入原密码', trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在6到20个字符', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { validator: validatePassword, trigger: 'blur' }
    ]
})

form.value.user = tokenStore.user.account;

const changePassword = async () => {
    if(formRef.value){
        formRef.value.validate(async (valid)=>{
            if(valid) {
              try{
                loading.value = true;
                const res = await changed(form.value);
                if(res.code === 200){
                  ElMessage.success(res.msg)
                  // 成功后注销账户,重新登录
                  tokenStore.logout();
                  window.location.reload();
                  loading.value = false
                }
                if(res.code === 301){
                  ElMessage.error(res.msg)

                }
              }catch (err){
                ElMessage.error(err.message);
              }finally {
                loading.value = false;
              }
            }
        })
    }
}
</script>

<style  scoped>

</style>