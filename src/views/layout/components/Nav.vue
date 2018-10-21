<template>
  <!--一级导航-->
  <div class="navbar">
    <el-menu
      router
      default-active="0"
      mode="horizontal"
      background-color="#0e80f1"
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
      return {
       menuData: [
  {
    'children': [

    ],
    'display': 1,
    'name': '首页',
    'icon': 'home',
    'id': '1',
    'url': '/dashboard'
  },
  {
    'children': [
      {
        'children': [

        ],
        'display': 1,
        'name': '菜单',
        'icon': 'menu',
        'id': '3',
        'url': '/menuMessage'
      },
      {
        'children': [

        ],
        'display': 1,
        'name': '角色管理',
        'icon': 'role',
        'id': '4',
        'url': '/groupMessage'
      },
      {
        'children': [

        ],
        'display': 1,
        'name': '模块管理',
        'icon': 'department',
        'id': '5',
        'url': '/moduleMessage'
      },
      {
        'children': [

        ],
        'display': 1,
        'name': '部门管理',
        'icon': 'department',
        'id': '6',
        'url': '/sectionMessage'
      },
      {
        'children': [

        ],
        'display': 1,
        'name': '用户管理',
        'icon': 'user',
        'id': '7',
        'url': '/userMessage'
      }
    ],
    'display': 1,
    'name': '系统设置',
    'icon': 'set',
    'id': '2',
    'url': '/sysmanager'
  }
]
      }
    },
    components: { NavMenu },
    // computed: {
    //   ...mapGetters([
    //     'menuData'
    //   ]),
    // }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>