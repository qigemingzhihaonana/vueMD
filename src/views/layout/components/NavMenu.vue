<template>
  <div class="menu">
  <label v-for="(navMenu, index) in navMenus" :key="index">
    <el-menu-item v-if="navMenu.children === null || navMenu.children.length === 0"
                  :key="navMenu.name"
                  :data="navMenu"
                  :index="navMenu.name"
                  :route="navMenu.url"
                  class="item"
                  >
        <svg-icon :icon-class="navMenu.icon" />
        <span slot="title" style="pandding-left=45px">{{navMenu.name}}</span>
    </el-menu-item>

    <el-submenu v-if="navMenu.children !== null && navMenu.children.length !== 0"
                :key="navMenu.name"
                :data="navMenu"
                :index="navMenu.name"
                class="submenu"
                >
      <template slot="title">
        <svg-icon :icon-class="navMenu.icon"/>
        <span style="pandding-left=45px"> {{navMenu.name}}</span>
      </template>
      <NavMenu :navMenus="navMenu.children"></NavMenu>
    </el-submenu>
  </label>
  </div>
</template>
 
<script>
  export default {
     name: 'NavMenu',
    data () {
      return {

      }
    },
    props: ['navMenus'],
  }
</script>
<style>
.submenu {
  float: left;
}
.item {
  float: left;
}
</style>
