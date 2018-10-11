<template>
  <el-dialog title="人员分配" 
  :visible="dialogFormVisibleAdd"
  @close="$emit('update:show', false)"
  height="100%"
  width="100%"
  class="user_set">
  <el-row>
    <el- class="left" :span="24" style='margin-top:15px;'>
      <el-card shadow="always">
        <div slot="header" class="clearfix">
          <span>角色成员</span>
        </div>
        <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="300"
        border
        @selection-change="handleLeftSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
          label="用户ID"
          prop="user_name"
          align="center"></el-table-column>
          <el-table-column
          label="用户名称"
          prop="real_name"
          align="center"></el-table-column>
          <el-table-column
          label="部门"
          prop="dep_name"
          align="center"></el-table-column>
          <el-table-column
          label="所属地区"
          prop="dep_area"
          align="center"></el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="Selection">清空</el-button>
          <el-button @click="toggleSelection">取消</el-button>
        </div>
      </el-card>
    <el-col class="right" :span="24" style='margin-top:15px;'>
      <el-card shadow="always">
        <div slot="header" class="clearfix">
          <span>待分配成员</span>
        </div>
      <el-table
        ref="multipleTable"
        height="300"
        :data="tableDataAdd"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleRightSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="real_name"
            label="员工姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="员工账户"
            align="center">
          </el-table-column>
          <el-table-column
            prop="dep_name"
            label="所属部门"
            align="center">
          </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleAdd">确定</el-button>
        <el-button @click="toggleSelection">取消</el-button>
      </div>
      </el-card>
    </el-col>
  </el-row>>
  </el-dialog>
</template>
<script>
import { getRoleUser, addRoleUser, removeRoleUser } from '@/api/admin/role/index'
export default {
  props: ['show','roleId','tableLeft', 'tableRight'],
  data () {
    return {
      loading: false,
      idsRight: [],
      idsLeft: [],
      multipleLeftSelection: [],
      multipleRightSelection: [],
      roleId: undefined
    }
  },
  computed: {
    dialogFormVisibleAdd: function() {
      return this.show
    },
    roleid: function() {
      return this.roleId
    },
    tableData: function() {
      return this.tableLeft
    },
    tableDataAdd: function() {
      return this.tableRight
    }
  },
  methods: {
    /**提交新增人员 */
    toggleAdd() {
      this.loading = true
      addRoleUser(this.roleid, this.idsRight).then( () => {
        this.loading = false
        this.fetchUser()
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    /**取消人员角色 */
    Selection() {
      this.loading = true
      removeRoleUser(this.roleid, this.idsLeft).then( () => {
        this.loading = false
        this.fetchUser()
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    /**取消选择 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**当table选项改变时触发 */
    handleLeftSelectionChange(val) {
      this.multipleLeftSelection = val;
      this.multipleLeftSelection.map((item)=> {
      this.idsLeft.push(item.key)
      })
    },
    /**当table选项改变时触发 */
    handleRightSelectionChange(val) {
      this.multipleRightSelection = val;
      this.multipleRightSelection.map((item)=> {
      this.idsRight.push(item.key)
      })
    },
    handleClose() {
      this.loading = false
      this.show = false
      console.log(this.tableData)
    },
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
  }
}
</script>
<style scoped>
.user_set {
  display: flex;
  justify-content: space-between
}
</style>
