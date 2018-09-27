<template>
  <!--一级导航-->
  <el-menu
    default-active="0"
    mode="horizontal"
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
    data () {
      return {}
    },
    components: { NavMenu },
    computed: {
      ...mapGetters([
        'menuData'
      ]),
    }
  }
</script>
