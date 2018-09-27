<template>
  <!--一级导航-->
  <el-menu
    class="main-head"
    mode="horizontal"
    router
    background-color="#FFFFFF"
    text-color="#000000"
    active-text-color="white">
    <nav-menu :navMenus="menuData"></nav-menu>
  </el-menu>
</template>


<script>
  import { mapGetters } from 'vuex';
  import NavMenu from './NavMenu';
  export default {
    components: { NavMenu },
    computed: {
      ...mapGetters([
        'menuData'
      ]),
    }
  }
</script>
