<template>
  <el-dialog title="模块角色配置" 
  :visible="dialogFormVisibleAdd"
  width="70%"
  @close="close">
    <el-row class="role_menu">
      <el-col class="left" :span="12" style='margin-top:15px;'>
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>未分配角色信息</span>
          </div>
          <el-table
          ref="multipleTableL"
          :data="tableDataAddRole"
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
            prop="role_name"
            align="center"></el-table-column>
            <el-table-column
            label="角色描述"
            prop="role_desc"
            align="center"></el-table-column>
            <el-table-column
            label="角色编号"
            prop="role_code"
            align="center"></el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button @click="Selection">添加</el-button>
            <el-button @click="toggleSelectionL">取消</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col class="right" :span="12" style='margin-top:15px;'>
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>已分配角色信息</span>
          </div>
        <el-table
          ref="multipleTableR"
          height="300"
          :data="tableDataRole"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleRightSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="role_name"
              label="角色名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="role_desc"
              label="角色描述"
              align="center">
            </el-table-column>
            <el-table-column
              prop="role_code"
              label="角色编号"
              align="center">
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleAdd">清空</el-button>
          <el-button @click="toggleSelectionR">取消</el-button>
        </div>
        </el-card>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { delRoleModule, addRoleModule } from '@/api/admin/module/index'
import { mapGetters } from 'vuex'
export default {
  props: ['show','moduleId'],
  data () {
    return {
      loading: false,
      idsLeft: [],
      idsRight: [],
      multipleLeftSelection: [],
      multipleRightSelection: [],
      moduleId: undefined,
    }
  },
  computed: {
    dialogFormVisibleAdd: function() {
      return this.show
    },
    moduleid: function() {
      return this.moduleId
    },

    ...mapGetters([
      'tableDataAddRole',
      'tableDataRole'
    ])
  },
  methods: {
    /**提交新增角色 */
    Selection() {
      let id = this.moduleid
      this.loading = true
      console.log(this.idsLeft)
      addRoleModule(id, this.idsLeft).then( () => {
        this.loading = false
        this.$store.dispatch('GetRole',id).then( () => {
          this.idsLeft = []
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    /**取消人员角色 */
    toggleAdd() {
      let id = this.moduleid
      this.idsLeft.push(id, this.moduleid)
      this.loading = true
      console.log(id)
      console.log(this.idsRight)
      delRoleModule(id,this.idsRight).then( () => {
        this.idsRight = []
        this.loading = false
        this.$store.dispatch('GetRole',id).then( () => {
          this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
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
      this.idsLeft.push(val)
      })
    },
    /**当table选项改变时触发 */
    handleRightSelectionChange(val) {
      this.multipleRightSelection = val;
      this.multipleRightSelection.map((val)=> {
      this.idsRight.push(val)
      })
    },
    toggleSelectionL() {
      this.$refs.multipleTableL.clearSelection();
    },
    toggleSelectionR() {
      this.$refs.multipleTableR.clearSelection();
    },
    close() {
      this.$emit('update:show', false)
      this.idsRight = []
      this.idsLeft = []
    }
  }
}
</script>
<style scoped>
.role_menu {
  display: flex;
  justify-content: space-around
}
</style>
