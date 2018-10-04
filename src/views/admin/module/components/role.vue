<template>
  <el-dialog title="模块角色配置" 
  :visible="dialogFormVisibleAdd"
  width="70%"
  @close="close">
    <el-row>
      <el-col class="left" :span="24" style='margin-top:15px;'>
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>已分配角色信息</span>
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
            label="角色名称"
            prop="id"
            align="center"></el-table-column>
            <el-table-column
            label="角色描述"
            prop="name"
            align="center"></el-table-column>
            <el-table-column
            label="角色编号"
            prop="department"
            align="center"></el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button @click="Selection">清空</el-button>
            <el-button @click="toggleSelection">取消</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
      <el-row class="right" :span="24" style='margin-top:15px;'>
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>未分配角色信息</span>
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
              prop="name"
              label="角色名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="code"
              label="角色描述"
              align="center">
            </el-table-column>
            <el-table-column
              prop="position"
              label="角色编号"
              align="center">
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleAdd">确定</el-button>
          <el-button @click="toggleSelection">取消</el-button>
        </div>
        </el-card>
      </el-row>
  </el-dialog>
</template>
<script>
import { getRoleUser, addRoleUser, removeRoleUser } from '@/api/admin/role/index'
export default {
  props: ['show','moduleId','tableLeft', 'tableRight'],
  data () {
    return {
      loading: false,
      idsLeft: [],
      multipleLeftSelection: [],
      multipleRightSelection: [],
      moduleId: undefined
    }
  },
  computed: {
    dialogFormVisibleAdd: function() {
      return this.show
    },
    moduleid: function() {
      return this.moduleId
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
      this.idsRight.push(this.moduleid)
      this.loading = true
      addRoleUser(this.idsRight).then( () => {
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
      this.idsLeft.push(this.moduleid)
      this.loading = true
      removeRoleUser(this.idsLeft).then( () => {
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
      idsLeft.push(item.key)
      })
    },
    /**当table选项改变时触发 */
    handleRightSelectionChange(val) {
      this.multipleRightSelection = val;
      this.multipleRightSelection.map((item)=> {
      idsRight.push(item.key)
      })
    },
    // handleClose() {
    //   this.loading = false
    //   this.$emit('show', false)
    // },
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    close() {
      this.$emit('update:show', false)
    }
  }
}
</script>
<style scoped>

</style>

