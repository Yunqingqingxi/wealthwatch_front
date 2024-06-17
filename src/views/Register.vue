<template>
  <el-row class="min-h-screen bg-red-200">
    <transition name="slide">
      <el-col v-if="isLoginPage" :lg="16" :md="12" class="flex items-center justify-center login-form">
        <div>
          <div class="font-bold text-6xl text-light-50 mb-4">欢迎光临</div>
          <div class="font-bold text-2xl mb-4"></div>
        </div>
      </el-col>
    </transition>
    <transition name="slide">
      <el-col v-if="!isLoginPage" :lg="8" :md="12" class="bg-light-100 flex items-center justify-center -translate-x-6 transition duration-1000 register-form">
        <el-form
            ref="registerFormRef"
            :rules="rules"
            :model="registerForm"
            hide-required-asterisk="hide"
            style="width: 400px"
        >
          <h1 class="font-bold text-3xl text-gray-800 justify-items-center text-center">即将进入神奇海螺</h1>
          <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
            <span class="h-[1px] w-18 bg-gray-200"></span>
            <span>注册</span>
            <span class="h-[1px] w-18 bg-gray-200"></span>
          </div>
          <el-form-item
              label="账  号"
              prop="account"
          >
            <el-input
                prefix-icon="User"
                v-model="registerForm.account"
                placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item
              label="密  码"
              prop="password"
          >
            <el-input
                prefix-icon="Lock"
                type="password"
                v-model="registerForm.password"
                placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item
              label="确 认"
              prop="rePassword"
          >
            <el-input
                prefix-icon="Lock"
                type="password"
                v-model="registerForm.rePassword"
                placeholder="请确认密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                style="width: 100%;border-radius: 15px"
                @click="inregister"
                :loading="loading"
            >注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </transition>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import {register} from '@/api/user'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter()

const registerFormRef = ref(null)
const loading = ref(false)

const registerForm = ref({
  account:'',
  password:'',
  rePassword:''
})

const validatePassword = (rule, value, callback) => {
    if (value !== registerForm.value.password) {
        // 两次输入的密码不一致
        callback(new Error('两次输入的密码不一致'));
    } else {
        // 校验通过
        callback();
    }
};

const rules = ref({
  account:{required: true, message: '请输入账号', trigger: 'blur'},
  password:[
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min:6,message:"密码长度不能小于6位",trigger:"blur"}
  ],
  rePassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ]
})

const inregister = async () => {
  if(registerFormRef.value){
    registerFormRef.value.validate( async (valid) => {
    if (valid) {
      try{
        loading.value = true
      // 发送注册请求
      const res = await register(registerForm.value)
      if(res.code === 200){
        ElMessage.success(res.msg)

        // 注册成功后，跳转到登录页面
        loading.value = false
        router.push('/login')
      }

      if(res.code === 301){
        ElMessage.error(res.msg)
        loading.value = false
      }
      }catch (error) {
      // 处理错误
      loading.value = false
      }finally {
      loading.value = false
      }
    }
  })
  }else{
    ElMessage.error("请输入账号和密码")
  }

}


</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 1s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-active {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-out-left {
  transform: translateX(-100%);
  opacity: 0;
  transition: all 1s ease;
}
.slide-out-right {
  transform: translateX(100%);
  opacity: 0;
  transition: all 1s ease;
}
</style>