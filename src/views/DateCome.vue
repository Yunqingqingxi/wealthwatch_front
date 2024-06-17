<template>
  <div>
    <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        :size="size"
        @change="fetchTableData"
    />
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {PayMesDelete, PayMesListDatecome} from '@/api/paymes'
import { ElMessage } from 'element-plus'
import {useRouter} from 'vue-router'
import { useTokenStore } from '@/stores/user'

const router = useRouter()
const tokenStore = useTokenStore()
const loading = ref(false)
const dateRange = ref([new Date(), new Date()])

const tableData = ref([])


// 获取数据的方法
const fetchTableData = async () => {
  if (!dateRange.value || dateRange.value.length !== 2) {
    return
  }

  try {
    loading.value = true
    const [start, end] = dateRange.value
    const startTime = start.toISOString().slice(0, 19).replace('T', ' ')
    const endTime = end.toISOString().slice(0, 19).replace('T', ' ')

    console.log({startTime,endTime})
    const res = await PayMesListDatecome({startTime,endTime}) // 传入
    if (res.code === 200) {
      tableData.value = res.data.transactions
    } else if (res.code === 401) {
      ElMessage.error('请先登录')
      tokenStore.logout()
      router.push('/login')
    } else {
      ElMessage.error('获取数据失败')
    }
  } catch (error) {
    console.error('获取数据失败', error)
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
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

</script>


<style scoped>

</style>