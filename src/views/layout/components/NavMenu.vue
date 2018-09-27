<template>
  <div class="navMenu">
  <template v-for="navMenu in navMenus">
    <el-menu-item v-if="navMenu.childs==null&&navMenu.entity"
                  :key="navMenu.entity.id" 
                  :data="navMenu" 
                  :index="navMenu.entity.name" 
                  :route="navMenu.entity.value"
                  >
      <template slot="title">
        <i :class="navMenu.entity.icon"></i>
        <span slot="title">{{navMenu.entity.alias}}</span>
      </template>
    </el-menu-item>
  </template>
  <template slot="title">
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
  </template>
  </div>
</template>
 
<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {}
    },
    methods: {}
  }
</script>
 
<style>
 
</style>
