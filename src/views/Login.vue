<template>
<el-row class="min-h-screen bg-red-200">
  <el-col :lg="16":md="12" class="flex items-center justify-center">
    <div>
      <div class="font-bold text-6xl text-light-50 mb-4">
      欢迎光临
      </div>
      <div class="font-bold text-2xl mb-4">
      </div>
    </div>
  </el-col>
  <el-col :lg="8" :md="12" class="bg-light-100 flex items-center justify-center ">
    <el-form
        :rules="rules"
        ref="loginFormRef"
        :model="ruleForm"
        :hide-required-asterisk="hide"
        style="width: 400px"
    >
      <h1 class="font-bold text-3xl text-gray-800 justify-items-center text-center">进入神奇海螺</h1>
      <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
        <span class="h-[1px] w-18 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-18 bg-gray-200"></span>
      </div>
      <el-form-item
          label="账号"
          prop="account"
      >
        <el-input
            prefix-icon="User"
            v-model="ruleForm.account"
            placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item
          label="密码"
          prop="password"
      >
        <el-input
            prefix-icon="Lock"
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
          <router-link to="register">还没有账号？去注册</router-link>
      </el-form-item>
      <el-form-item>
        <el-button
            type="primary"
            style="width: 100%;border-radius: 15px"
            @click="toLogin"
            :loading="loading"
        >登录</el-button>
      </el-form-item>

    </el-form>
  </el-col>
</el-row>
</template>

<script setup>
import {ref} from "vue";
import {login,getUserInfo} from "@/api/user.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {useTokenStore} from "@/stores/user.js";

const hide = ref(true);
const loginFormRef = ref(null);
const loading = ref(false);
const router = useRouter();
const store = useTokenStore();

const ruleForm = ref({
  account:'',
  password:'',
});

const rules = ref({
  account:{required: true, message: '请输入账号', trigger: 'blur'},
  password:{required: true, message: '请输入密码', trigger: 'blur'},
})

const toLogin = async () =>{
  if(loginFormRef.value){
    await loginFormRef.value.validate(async (valid) => {
      if(!valid){
        return;
      }
      try{
        loading.value = true;
        // 开始请求
      const res = await login(ruleForm.value);

      console.log(res);
      if(res.code === 200){
        store.setToken(res.data.token);
        ElMessage.success('登录成功');

          // 获取用户信息
          const userInfoRes = await getUserInfo();
          if (userInfoRes.code === 200) {
            store.setUser(userInfoRes.data);
          } else {
            ElMessage.error('获取用户信息失败');
          }

        loading.value = false;
        router.push('/');
      }else{
        ElMessage.error(res.msg);
        loading.value = false;
      }
      }catch (e) {
        console.log(e);
        ElMessage.error("请求超时")
        loading.value = false;
      }
    })
  }
}
</script>


<style scoped>

</style>