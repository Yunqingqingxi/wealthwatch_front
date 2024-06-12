<template>
    <div :lg="24" md="12">
        <el-descriptions 
            title="个人信息"
            border
            :column="1"
            style="width: 600px;"
        >
            <template #extra>
                <el-button type="primary" @click="showEditDialog">修改信息</el-button>
            </template>
            <el-descriptions-item min-width="200px">
                <template #label>
                    <div class="cell-item">
                        <el-icon><User /></el-icon>
                        User
                    </div>
                </template>
                {{ Username }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon><ReadingLamp /></el-icon>
                        邮箱
                    </div>
                </template>
                {{ Email }}
            </el-descriptions-item>    
        </el-descriptions>
    </div>
    <el-dialog
            title="修改个人信息"
            v-model="editDialogVisible"
            width="100%"
        >
            <el-form :model="editForm" label-width="100px">
                <el-form-item label="用户名" prop="Username">
                    <el-input v-model="editForm.Username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="Email">
                    <el-input v-model="editForm.Email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateUser">保存</el-button>
                    <el-button @click="editDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
</template>

<script setup>
import { getUserInfo, updateUserInfo } from '@/api/user'
import { ElMessage,ElMessageBox } from 'element-plus';
import { ref, onMounted } from 'vue'
import {useTokenStore} from '@/stores/user'
import { useRouter } from 'vue-router'

const tokenStore = useTokenStore()
const router = useRouter()

const Username = ref('')
const Email = ref('')
const editDialogVisible = ref(false)

const editForm = ref({
    Username: '',
    Email: ''
})

onMounted(async () => {
    const res = await getUserInfo()
    Username.value = res.data.account
    Email.value = res.data.email
})

const showEditDialog = () => {
    editForm.value.Username = Username.value
    editForm.value.Email = Email.value
    editDialogVisible.value = true
}


const updateUser = async () => {
    try {
        if (editForm.value.Username !== Username.value) {
                // 弹出确认框提示用户一旦修改了用户名就会丢失之前的用户信息
                const confirmMessage = '一旦修改了用户名，之前的用户信息将会丢失，是否继续？'
                const confirmResult = await ElMessageBox.confirm(confirmMessage, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                if (confirmResult === 'confirm') {
                    // 如果用户点击了确定，则执行重新登录的操作
                    // 修改用户信息
                    const res = await updateUserInfo(editForm.value)

                    if (res.code === 200) {
                    ElMessage.success(res.msg)
                    
                    Username.value = editForm.value.Username
                    Email.value = editForm.value.Email
                    editDialogVisible.value = false

                    tokenStore.logout()
                    window.location.reload()
                    router.push('/login')
                    }
                    // 禁用按钮三秒钟
                    setTimeout(() => {
                        router.push('/login')
                    }, 3000)
                }
            }

            const res = await updateUserInfo(editForm.value)
                    if (res.code === 200) {
                    ElMessage.success(res.msg)
                    
                    Username.value = editForm.value.Username
                    Email.value = editForm.value.Email
                    editDialogVisible.value = false

                    }
    } catch (error) {
        console.error('修改失败:', error)
    }
}

</script>

<style scoped>
.cell-item {
    display: flex;
    align-items: center;
}
.cell-item el-icon {
    margin-right: 5px;
}
</style>
