<template>
    <div>
        <el-container class="login-container">
            <el-header class="login-header">
                白马面经运营后台
            </el-header>
            <el-container class="login-content">
                <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                    <div class="butt">
                        <el-button type="primary" @click="loginFun" class="login-btn">登录</el-button>
                        <el-button type="link" @click="resetForm">重置</el-button>
                    </div>

                </el-form>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { login } from '@/api/auth'

export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { pattern: /^\w{5,11}$/, message: '请输入 5 到 11 位的账号', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^\w{5,11}$/, message: '请输入 5 到 11 位的密码', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods: {
        async loginFun() {
            // 先校验整个表单，通过了校验，才发请求
            // console.log('发请求')
            try {
                // validate 方法会得到一个 promise 对象，前面可以 await 处理
                await this.$refs.formRef.validate()
                // 调用api的login方法，发送请求
                const res = await login(this.form)
                // 公司里面实际规范：将token等个人信息，存入vuex，便于各个页面组件访问 => 存storage（持久化存储）
                // vuex中的数据，类似于data中的数据, 一旦刷新页面，就会重新初始化（vuex刷新会丢失数据）
                // 所有访问token，访问个人信息，一律找vuex。存本地就一个目的：保证刷新之后，vuex的数据还在
                // console.log(res.data.token)
                this.$store.commit('user/setToken', res.data.token)
                this.$message.success('登录成功！');
                // 注意：一定要等vuex token存好了，再跳首页
                this.$router.push({ name: 'dashboard' })
            } catch (e) {
                this.$message.error(e.response.data.message || '登录失败！');
            }

        },
        resetForm() {
            this.$refs.formRef.resetFields()
        }
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    min-height: 40vh;
    min-width: 500px;
    max-width: 30vw;
    border: 2px solid #ccc;
    border-radius: 0 0 10px 10px;
    margin: 20vh auto;
}

.login-header {
    background: #727cf5;
    color: #fff;
    padding: 20px;
    text-align: center;
}

.login-content {
    margin: 50px;

}

.butt {
    display: flex;
    justify-content: center;
}
</style>