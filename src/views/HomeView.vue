<template>
  <div class="home">
    <el-container class="home-page">
      <el-aside class="home-aside" width="200px">
        <div class="home-title">白马面经</div>
        <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
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

      <el-container class="home-content">
        <el-header class="home-header">
          <img src="../assets/logo.png" alt="">
          <p>Administrator</p>
          <i class="el-icon-switch-button" style="font-size: 30px;" title="退出"></i>
        </el-header>
        <router-view />
      </el-container>

    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
  }
}
</script>

<style scoped lang="scss">
.home-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
  }

  p {
    margin-right: 10px;
  }
}

.home-page {
  height: 100vh;
}

.home-aside {
  background: #545c64;
}

.home-title {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin: 20px 0;
  margin-left: 40px;
}
</style>
