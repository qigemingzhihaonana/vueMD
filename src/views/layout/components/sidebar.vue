<template>
  <div>
    <el-col>
      <el-menu 
      router
      :show-timeout="200"
      mode="horizontal"
      unique-opened
      default-active="routerGo"
      class="el-menu-demo"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF" 
      >
        <nav-item 
        v-for="(item,index) in navList"
        :item="item" 
        :navIndex="String(index)" 
        :key="index"
        :base_path="router.path">
        </nav-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import NavItem from "./sidebarItem";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      navList: []
    };
  },
  computer: {
    ...mapGetters(['navList']),
    routerGo() {
      return this.$route.path;
    }
  },
  methods: {
    selectMenu(index, indexPath) {
      /**
       * 在选择父级菜单时自动关闭其下所有子菜单
       * 选择时获取点击菜单的父级index，并计算得到该index在已打开菜单中的索引值，
       * 关闭位于当前打开菜单中该索引值之后的全部菜单
       */
      let openedMenus = this.$refs.navbar.openedMenus;
      let openedMenuList;
      //如果点击的是二级菜单，获取其后已经打开的菜单
      if (indexPath.length > 1) {
        let parentPath = indexPath[indexPath.length - 2];
        openedMenuList = openedMenus.slice(openedMenus.indexOf(parentPath) + 1);
      } else {
        openMenuList = openedMenus;
      }
      openMenu = openMenu.reverse();
      openMenu.forEach(ele => {
        this.$refs.navbar.closeMenu(ele);
      });
    }
  },
  components: {
    NavItem
  }
};
</script>

<style>
</style>