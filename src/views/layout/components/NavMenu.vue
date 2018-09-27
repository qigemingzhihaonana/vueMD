<template>
  <div >
  <template v-for="(navMenu) in navMenus" >
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
      <nav-menu :navMenus="navMenu.childs"></nav-menu>
    </el-submenu>
  </template>
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
