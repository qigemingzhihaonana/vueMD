<template>
  <div class="main">
    <el-container>
      <el-head>
        <el-row :gutter="10">
          <el-col :xs="4" :sm="8" :md="8" :lg="9" :xl="30">
            <sidebar class="sidebar">22</sidebar>
          </el-col>
        </el-row>
      </el-head>
    </el-container>

    <div style="position: relative;height: 60px;width: 100%;"></div>

    <div class="main-container">
      <app>kk</app>
    </div>
  </div>
</template>
<script>
import { sidebar, head, footer, app } from './components'
export default {
  components: {
    sidebar,
    head,
    footer,
    app
  },
}
</script>
<style>
 .el-col {
    border-radius: 4px;
  }
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
.main {
  position: relative;
  background-color: aqua;
  height: 20%;
  width: 100%;
  float: left;
}
.main-container {
  position: relative;
  background-color: black;
  width: 100%;
  float: left;
}

</style>
