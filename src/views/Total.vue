<template>
    <h1>Total</h1>
    <el-table 
      style="width: 100%" 
      max-height="400"
      :data="tableData"
      :loading="loading"
    >
      <el-table-column fixed prop="datetime" label="时间" width="330" />
      <el-table-column prop="transactionid" label="记录" width="120" />
      <el-table-column prop="username" label="用户" width="120" />
      <el-table-column prop="category" label="类型" width="120" :formatter="formatCategory" />
      <el-table-column prop="amount" label="金额" width="120" />
      <el-table-column prop="description" label="描述" width="250" />
      <el-table-column fixed="right" label="删除记录" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="deleteRow(scope.$index, scope.row.transactionid)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { PayMesList,PayMesDelete} from '@/api/paymes'
  import { ElMessage } from 'element-plus'
  import {useRouter} from 'vue-router'
  import { useTokenStore } from '@/stores/user'
  
  const router = useRouter()
  const tokenStore = useTokenStore()
  const loading = ref(false)

  const tableData = ref([])
  
  // 获取数据的方法
  const fetchTableData = async () => {
    try {
        loading.value = true
        const res = await PayMesList() 
        if(res.code === 200){
            tableData.value = res.data.transactions
            loading.value = false
        }
        if(res.code === 301){
            ElMessage.error(res.msg)
        }
        if(res.code === 401){
            ElMessage.error('请先登录')
            tokenStore.logout()
            router.push('/login')
            return
        }
    } catch (error) {
        loading.value = false
        ElMessage.error('获取数据失败')
    }
  }

  // 格式化类型
const formatCategory = (row, column, cellValue) => {
  return cellValue === "0" ? '支出' : '收入'
}



// 删除记录的方法
const deleteRow = async (index, transactionid) => {
  try {
    const res = await PayMesDelete({transactionid}) // 确保以对象形式传递id

    if(res.code === 200){
        ElMessage.success('删除成功')
        tableData.value.splice(index, 1)
    }
    if(res.code === 301){
        ElMessage.error(res.msg)
    }
    if(res.code === 401){
        ElMessage.error('请先登录')
        tokenStore.logout()
        router.push('/login')
        return
    }
  } catch (error) {
    ElMessage.error('删除失败')
    console.error('删除失败', error)
  }
}
  
  // 在组件挂载时获取数据
  onMounted(async () => {
    fetchTableData()
  })
  </script>
  
  <style scoped>
  </style>
  