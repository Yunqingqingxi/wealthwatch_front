
<template>
  <el-row>
    <el-col :lg="5" md="8" class="min-h-screen">
      <el-container>
        <el-aside style="width: auto;">
          <el-menu :router="true">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><Wallet /></el-icon>账单
            </template>
            <el-menu-item-group>
              <template #title>添加记录</template>
              <el-menu-item index="/about">记账</el-menu-item>
            </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Tickets /></el-icon>分类
              </template>
              <el-menu-item-group>
                <template #title>添加分类</template>
                <el-menu-item index="/classify/income">收入</el-menu-item>
                <el-menu-item index="/classify/outcome">支出</el-menu-item>
                <el-menu-item index="/classify/datecome">日期收支</el-menu-item>
                <el-menu-item index="/classify/total">总账单</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><User /></el-icon>用户管理
              </template>
            <el-menu-item-group>
              <template #title>设置</template>
              <el-menu-item index="/user/userinfo" >个人资料</el-menu-item>
              <el-menu-item index="/user/changepwd">修改密码</el-menu-item>
              <el-menu-item @click="handleClick" >登出</el-menu-item>
            </el-menu-item-group>
            </el-sub-menu> 
          </el-menu>
        </el-aside>
      </el-container>
    </el-col>
  <el-col :lg="19" md="16" >
    <el-container>
      <el-main>
        <h1 class="bg-light-5 text-xl font-bold text-gray-800"> 个人记账系统 </h1>       
       <RouterView  class="transition" />
      </el-main>
    </el-container>
  </el-col>
  </el-row>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useTokenStore } from '@/stores/user'


const router = useRouter()
const store = useTokenStore()

const handleClick = () => {
  store.logout()
  window.location.reload()
}
</script>


<style scoped>
.transition {
    animation: fade-in-fwd 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes fade-in-fwd {
    0% {
        -webkit-transform: translateZ(-80px);
        transform: translateZ(-80px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: 1;
    }
}
</style>