<template>
  <div class="layout" >
    <div class="main-head" >
      <Nav class="nav"></Nav>
    </div>
    <div class="main" :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
      <app-main></app-main>
    </div>
    <div class="footer">
      Copyright &copy; 2018-2020 <a href="https://fdfdfsfdsfsd">湖北信通</a>. All rights reserved.
    </div>
  </div>

</template>
<script>
import Nav from './components/Nav'
import AppMain from './components/AppMain'

export default {
  components: {
    Nav,
    AppMain
  },
}
</script>
<style>
  .layout{
    border: 1px solid #0e6fd6;
    background: #f5f7f9;
    height: 100%;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
 .main-head {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: #eafbdf;
    background-color: #178020 !important;
    color: white !important;
 }
 .nav {
    position: absolute;
    top: 0;
    width: 100%;
    height: 56px;
    background-color: #eafbdf;
    background-color: #7c817c !important;
    color: white !important;
    
 }
 .footer {
    background-color: #f4f4f4;
    color: #7F7C7C;
    text-align: center;
    position: absolute;
    bottom: 0px;
    height: 170px;
    line-height: 150px;
    left: 0;
    right: 0;
    padding: 5px;
    border-top: 1px solid #7d7d7d;
    border-bottom: 5px solid rgb(138, 139, 138);
    font-size: 150%;
  }
</style>
