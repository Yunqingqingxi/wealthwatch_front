<template>
     <el-button type="primary" @Click="Logout">Primary</el-button>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/user'


const router = useRouter()
const store = useTokenStore()

const Logout = () => {
    store.logout()
}
</script>

<style lang="scss" scoped>

</style>