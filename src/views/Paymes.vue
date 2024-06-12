<template>
    <el-form
        label-width="100px"
        style="max-width: 700px"
        :model="payForm"
        ref="payFormRef"
        
    >
        <el-form-item label="支付方式" prop="payMethod">
            <el-select v-model="payForm.payMethod">
                <el-option label="支付宝" value="1"></el-option>
                <el-option label="微信" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="amount">
            <el-input v-model="payForm.amount" placeholder="请输入金额"/>
        </el-form-item>
        <el-form-item>
            <el-radio-group v-model="payForm.type">
                <el-radio label="0">支出</el-radio>
                <el-radio label="1">收入</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="日期" prop="date">
            <el-date-picker
                v-model="payForm.date"
                type="datetime"
                placeholder="Pick a Date"
                format="YYYY/MM/DD HH:mm:ss"
            />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="payForm.remarks"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">记录</el-button>
            <el-button @click="resetForm">取消</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref } from 'vue';
import {PayMes} from '@/api/paymes.js';
import { ElNotification,ElMessage } from 'element-plus';
const payForm = ref({
    payMethod: '',
    amount: '',
    type: '',
    date: '',
    remarks: ''
});

const payFormRef = ref(null);

const open1 = () => {
  ElNotification({
    title: '操作成功',
    message: '成功添加一条记录',
    type: 'success',
  })
}


const submitForm = () => {
    payFormRef.value.validate( async (valid) => {
        if (valid) {
            try {
                console.log(payForm.value);
                const res = await PayMes(payForm.value)
                if(res.code === 200){
                    open1();
                    // 表单验证通过后的逻辑
                    resetForm();
                }else{
                   ElMessage.error(res.msg);
                   return false;
                }
                // 提交表单的逻辑
            } catch (error) {
                console.error(error);
            }
          
        } else {
            alert('请完成表单');
            return false;
        }
    });
};

const resetForm = () => {
    payFormRef.value.resetFields();
};
</script>

<style scoped>
.el-form {
    margin: 0;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background-color: #ffffff;
}
</style>
