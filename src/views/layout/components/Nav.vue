<template>
  <!--一级导航-->
  <div class="top">
    <el-menu
      default-active="0"
      mode="horizontal"
      background-color=" #5e5eff"
      text-color="white"
      active-text-color="antiquewhite">
      <nav-menu :navMenus="menuData"></nav-menu>
    </el-menu>
  </div>
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
<style scoped>
.top {
  display: block;
  background-color: antiquewhite
}
</style>
