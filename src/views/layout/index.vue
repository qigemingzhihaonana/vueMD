<template>
  <div class="main">
    <header class="header" >
      <el-row>
        <el-col :span="25">
          <sidebar class="sidebar">22</sidebar>
        </el-col>
      </el-row>
    </header>

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
