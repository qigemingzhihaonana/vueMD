<template>
  <el-container class="layout" direction="verticalc">
    <el-header class="main-head" :style="{ width: '100%'}">
      <el-menu
        mode="horizontal"
        router
        class="el-menu-vertical-demo"
        background-color="#F0F6F6"
        text-color="#3C3F41"
        active-text-color="white">
        <NavMenu :navMenus="menuData"></NavMenu>
      </el-menu>
    </el-header>
    <el-main :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
      gggg
    </el-main>
    <el-footer class="layout-footer-center">
      Copyright &copy; 2018-2020 <a href="https://fdfdfsfdsfsd">湖北信通</a>. All rights reserved.
    </el-footer>
  </el-container>

</template>
<script>
import NavMenu from './components/NavMenu'
import { mapGetters } from "vuex"

export default {
  data () {
    return {
      menuData: []
    }
  },
  computer: {
    ...mapGetters(['menuData']),
  },
  components: {
    NavMenu,
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
