<template>
  <div>
    <el-col>
       <!--顶部菜单组件-->
      <el-menu
        mode="horizontal"
        router
        class="el-menu-vertical-demo"
        background-color="#F0F6F6"
        text-color="#3C3F41"
        active-text-color="white">
        <NavMenu :navMenus="menuData"></NavMenu>
      </el-menu>

      <!-- <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        @select="menuSelected"
        background-color="#F0F6F6"
        text-color="#3C3F41"
        active-text-color="black">
        <NavMenu :navMenus="leftMenus"></NavMenu>
      </el-menu> -->

        <!-- <NavMenu class="MenuSetting"
        :menuData="menuData"
        :showEnableOnly="showEnableOnly"
        :iconSize="'16px'"></NavMenu> -->
      <!-- </el-menu> -->
    </el-col>
  </div>
</template>

<script>
// import NavItem from "./sidebarItem";
import NavMenu from './NavMenu'
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      menuData: []
    };
  },
  computer: {
    ...mapGetters(['menuData']),
  },
  methods: {
    // selectMenu(index, indexPath) {
    //   /**
    //    * 在选择父级菜单时自动关闭其下所有子菜单
    //    * 选择时获取点击菜单的父级index，并计算得到该index在已打开菜单中的索引值，
    //    * 关闭位于当前打开菜单中该索引值之后的全部菜单
    //    */
    //   let openedMenus = this.$refs.navbar.openedMenus;
    //   let openedMenuList;
    //   //如果点击的是二级菜单，获取其后已经打开的菜单
    //   if (indexPath.length > 1) {
    //     let parentPath = indexPath[indexPath.length - 2];
    //     openedMenuList = openedMenus.slice(openedMenus.indexOf(parentPath) + 1);
    //   } else {
    //     openMenuList = openedMenus;
    //   }
    //   openMenu = openMenu.reverse();
    //   openMenu.forEach(ele => {
    //     this.$refs.navbar.closeMenu(ele);
    //   });
    // }

  },
  components: {
    NavMenu
  }
};
</script>

<style>
</style>