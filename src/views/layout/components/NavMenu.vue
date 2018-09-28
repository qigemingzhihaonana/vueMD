<template>
  <div class="menu">
  <label v-for="(navMenu, index) in navMenus" :key="index">
    <el-menu-item v-if="navMenu.childs==null"
                  :key="navMenu.name"
                  :data="navMenu"
                  :index="navMenu.name"
                  :route="navMenu.url"
                  class="item"
                  >
        <svg-icon :icon-class="navMenu.svg" />
        <span slot="title">{{navMenu.name}}</span>
    </el-menu-item>

    <el-submenu v-if="navMenu.childs !== null"
                :key="navMenu.name"
                :data="navMenu"
                :index="navMenu.name"
                class="submenu"
                >
      <template slot="title">
        <svg-icon :icon-class="navMenu.svg"/>
        <span> {{navMenu.name}}</span>
      </template>
      <NavMenu :navMenus="navMenu.childs"></NavMenu>
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
