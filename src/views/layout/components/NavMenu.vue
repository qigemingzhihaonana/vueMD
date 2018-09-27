<template>
  <div >
  <label v-for="(navMenu, index) in navMenus" :key="index">
    <el-menu-item v-if="navMenu.childs==null&&navMenu.entity"
                  :key="navMenu.entity.id" 
                  :data="navMenu" 
                  :index="navMenu.entity.name" 
                  :route="navMenu.entity.value"
                  >
        <i :class="navMenu.entity.icon"></i>
        <span slot="title">{{navMenu.entity.alias}}</span>
    </el-menu-item>

    <el-submenu v-if="navMenu.childs&&navMenu.entity"
                :key="navMenu.entity.id" 
                :data="navMenu" 
                :index="navMenu.entity.name">
      <template slot="title">
        <i :class="navMenu.entity.icon"></i>
        <span> {{navMenu.entity.alias}}</span>
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
 
</style>
