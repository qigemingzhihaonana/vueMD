<template>
  <div class="role">
    <div class="file-edit">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handlerAdd">添加</el-button>
        <el-button type="primary" icon="edit" @click="handlerEdit">编辑</el-button>
        <el-button type="primary" icon="delete" @click="handleDelete">删除</el-button>
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
      <el-col class="right" :span="16" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
              fixed
              prop="roleID"
              label="角色ID"
              width="120">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="province"
              label="统一部门编号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="city"
              label="部门描述"
              width="150">
            </el-table-column>
            <el-table-column
              prop="address"
              label="部门状态"
              width="120">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="正职领导"
              width="120">
            </el-table-column>
            <el-table-column
              prop="right"
              label="副职领导"
              width="120">
              <!-- <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template> -->
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" inline="true">
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>

</style>
