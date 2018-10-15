<template>
  <el-dialog title="人员分配" 
  :visible="dialogFormVisibleAdd"
  @close="close"
  height="100%"
  width="100%"
  class="user_set"
  >
  <el-row>
    <el-col class="left" :span="12" style='margin-top:15px;'>
      <el-card shadow="always">
        <div slot="header" class="clearfix">
          <span>待分配角色成员</span>
        </div>
        <el-table
        ref="multipleTable"
        :data="tableDataAdd"
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
          label="员工ID"
          prop="user_name"
          align="center"></el-table-column>
          <el-table-column
          label="员工名称"
          prop="real_name"
          align="center"></el-table-column>
          <el-table-column
          label="所属部门"
          prop="dep_name"
          align="center"></el-table-column>
          <el-table-column
          label="所属地区"
          prop="dep_area"
          align="center"></el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="Selection">添加</el-button>
          <el-button @click="toggleSelection1">取消</el-button>
        </div>
      </el-card>
    </el-col>
    <el-col class="right" :span="12" style='margin-top:15px;'>
      <el-card shadow="always">
        <div slot="header" class="clearfix">
          <span>已有成员</span>
        </div>
      <el-table
        ref="multipleTable"
        height="300"
        :data="tableData"
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
        <el-button @click="toggleAdd">去除</el-button>
        <el-button @click="toggleSelection2">取消</el-button>
      </div>
      </el-card>
    </el-col>
  </el-row>>
  </el-dialog>
</template>
<script>
import { getRoleUser, addRoleUser, removeRoleUser } from '@/api/admin/role/index'
import { mapGetters } from 'vuex'
export default {
  props: ['show','roleId'],
  data () {
    return {
      loading: false,
      idsRight: [],
      idsLeft: [],
      multipleLeftSelection: [],
      multipleRightSelection: [],
      roleId: undefined,
    }
  },
  computed: {
    ...mapGetters([
      'tableData',
      'tableDataAdd'
    ]),
    dialogFormVisibleAdd: function() {
      return this.show
    },
    roleid: function() {
      return this.roleId
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false)
      this.idsRight = []
      this.idsLeft = []
    },
    /**提交新增人员 */
    Selection() {
      this.loading = true
      addRoleUser(this.roleid, this.idsLeft).then( () => {
        this.idsLeft = []
        this.loading = false
        console.log(this.tableData)
        console.log(this.idsLeft)
        console.log(this.tableData)
        this.$store.dispatch('GetUser',this.roleid)
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    /**取消人员角色 */
    toggleAdd() {
      this.loading = true
      removeRoleUser(this.roleid, this.idsRight).then( () => {
        this.idsRight = []
        this.loading = false
        this.$store.dispatch('GetUser',this.roleid)
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
      this.multipleLeftSelection.map((val)=> {
      console.log(val)
      this.idsLeft.push(val)
      })
    },
    /**当table选项改变时触发 */
    handleRightSelectionChange(val) {
      this.multipleRightSelection = val;
      console.log(val)
      this.multipleRightSelection.map((val)=> {
      this.idsRight.push(val)
      })
    },
    handleClose() {
      this.loading = false
      this.show = false
      console.log(this.tableData)
    },
    toggleSelection1() {
      this.$refs.multipleTable.clearSelection();
    },
    toggleSelection2() {
      this.$refs.multipleTable.clearSelection();
    }
  }
}
</script>
<style scoped>
.user_set {
  display: flex;
  justify-content: space-between
}
</style>
