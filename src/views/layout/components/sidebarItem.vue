<template>
	<div>
		<el-submenu	v-if="item.child && item.child.lenth" :index="navIndex">
			<template slot="title">{{item.name}}</template>
			<nav-item v-for="(subItem,i) in item.child" :key="navIndex+'-'+i " :navIndex="navIndex+ '-' + i" :item="subItem" >
			</nav-item>
		</el-submenu>
		<el-menu-item v-else :index="item.path">{{item.name}}</el-menu-item>
    </div>
</template>

<script >
export default {
  name: 'NavItem',
  props: ['item', 'navIndex']
}
</script>

<style >
</style>