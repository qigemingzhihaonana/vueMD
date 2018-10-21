<template>
  <div class="app-wrapper" >
    <Nav class="sidebar-container"></Nav>
    <div class="main-container" >
      <nav-bar></nav-bar>
      <tag-views class="tag"/>
      <app-main class="main"/>
    </div>
    <div class="footer">
      Copyright &copy; 2018-2020 <a href="https://fdfdfsfdsfsd">湖北信通</a>. All rights reserved.
    </div>
  </div>

</template>
<script>
import AppMain from './components/AppMain'
import TagViews from './components/TagViews'
import Nav from './components/Nav'
import NavBar from './components/Navbar'

export default {
  components: {
    Nav,
    AppMain,
    TagViews,
    NavBar
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  // .layout{
  //   border: 1px solid #0e6fd6;
  //   background: #ffffff;
  //   height: 100%;
  //   position: relative;
  //   border-radius: 4px;
  //   overflow: hidden;
  // }
//  .main-head {
//     display: flex;
//     flex-direction:column;
//     position: absolute;
//     top: 0;
//     width: 100%;
//     background-color: #ffffff;
//     background-color: #178020 !important;
//     color: white !important;
//  }

//  .nav {
//     position: absolute;
//     top: 0;
//     width: 100%;
//     height: 56px;
//     background-color: #eafbdf;
//     color: white !important;
//  }

//  .footer {
//     background-color: #f4f4f4;
//     color: #7F7C7C;
//     text-align: center;
//     position: absolute;
//     bottom: 0px;
//     height: 200px;
//     width: 100%;
//     line-height: 200px;
//     padding: 5px;
//     border-top: 1px solid #7d7d7d;
//     border-bottom: 5px solid rgb(138, 139, 138);
//     font-size: 150%;
//   }
  @import "src/styles/mixin.scss";
  .app-wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    @include clearfix;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
