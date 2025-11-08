<template>
  <div class="home">

    <el-container class="home-container">
      <el-aside width="200px">
        <div class="home-title">白马面经</div>
        <el-menu class="el-menu-vertical-demo" background-color="#333" text-color="#fff" active-text-color="#ffd04b"
          router>
          <el-menu-item index="dashboard">
            <template #title>
              <i class="el-icon-pie-chart"></i>
              <span>数据看板</span>
            </template>
          </el-menu-item>

          <el-menu-item index="interview">
            <template #title>
              <i class="el-icon-notebook-1"></i>
              <span>面经管理</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>


      <el-container>
        <el-header>
          <div class="main-header">
            <img src="../assets/logo.png" alt="" style="height: 32px; border-radius: 50%; margin-right: 20px;">
            <p style="margin-right: 20px;">Administrator</p>
            <i class="el-icon-switch-button" style="font-size: 32px;" title="退出" @click="logout"></i>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    logout() {
      this.$confirm('确定退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 退出登录逻辑
        this.$store.commit('/user/logout')
        this.$router.push({ name: 'login' })
      }).catch(() => {
        // 取消退出登录
      })
    }
  }
}
</script>

<style scoped lang="scss">
.home-container {
  height: 100vh;
}

.el-aside {
  background-color: #333;
  height: 100%;
}

.home-title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  padding: 20px;
}

.el-header {
  height: 60px;
}

.main-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin: 20px 0;
}
</style>
