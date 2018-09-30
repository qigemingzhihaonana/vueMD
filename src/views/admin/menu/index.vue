<template>
  <div class="menu">
    <div class="file-edit">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handlerAdd">新建角色</el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col class="left" :span="8" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-tree
            class="filter-tree"
            :data="treeData"
            node-key="id"
            highlight-current
            ref="menuTree"
            @node-click="getNodeData"
            default-expand-all>
          </el-tree>
        </el-card>
      </el-col>
      <el-col class="right" :span="24" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-table
          :data="tableData"
          style="width: 100%"
          height="300">
            <el-table-item
            label="菜单名称"
            prop="name"></el-table-item>
            <el-table-item
            label="菜单描述"
            prop=""></el-table-item>
            <el-table-item
            label=""
            prop=""></el-table-item>
            <el-table-item
            label=""
            prop=""></el-table-item>
            <el-table-item
            label=""
            prop=""></el-table-item>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      treeData: [],
      tableData: [],
      dialogStatus: 'create',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogFormVisible: false,
    }
  }
}
</script>
<style scoped>

</style>
