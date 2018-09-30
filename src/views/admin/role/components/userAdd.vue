<template>
  <el-dialog title="人员分配" :visible.sync="dialogFormVisible" 
  :before-close="handleClose">
    <div class="file-edit">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addUser">添加人员</el-button>
        <el-button type="primary" icon="plus" @click="addMore">批量导入</el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col class="left" :span="24" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-table
          :data="tableData"
          style="width: 100%"
          height="300"
          border>
            <el-table-column
            label="用户ID"
            prop="id"></el-table-column>
            <el-table-column
            label="用户名称"
            prop="name"></el-table-column>
            <el-table-column
            label="部门"
            prop="department"></el-table-column>
            <el-table-column
            label="所属地区"
            prop="area"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getRoleUser, addRoleUser } from '@/api/admin/role/index'
export default {
  data () {
    return {
      dialogFormVisible: false,
      tableData: [],
      loading: false
    }
  },
  created: {
    
  },
  methods: {
    /**添加人员 */
    addUser() {
      
    },
    /**批量导入 */
    addMore() {

    },
    handleClose() {
      this.loading = false
    }
  }
}
</script>
<style scoped>

</style>

