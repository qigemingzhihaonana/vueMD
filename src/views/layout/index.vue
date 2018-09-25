<template>
  <el-container class="layout">
    <el-header class="main-head" :style="{ width: '100%'}">
      <sidebar></sidebar>
    </el-header>
      <div>
        <el-card shadow="always">
          <el-main :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
            gggg
          </el-main>
        </el-card>
      </div>
    <el-footer class="layout-footer-center">
      Copyright &copy; 2018-2019 <a href="https://fdfdfsfdsfsd">湖北信通</a>. All rights reserved.
    </el-footer>
  </el-container>

</template>
<script>
import { sidebar } from './components'
export default {
  components: {
    sidebar,
  },
}
</script>
<style>
  .layout{
    border: 1px solid #bcc6d1;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
 .main-head {
    background-color: #afd3fc;
    height: 50px;
 }
 .layout-footer-center{
    text-align: center;
    margin-top: 30px;
  }
</style>
