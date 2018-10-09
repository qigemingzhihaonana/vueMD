<template>
  <div class="menu">
    <div class="file-edit">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handlerAdd">添加菜单</el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col class="left" :span="4" style='margin-top:15px;'>
        <el-tree
          class="filter-tree"
          :data="treeData"
          :props="props"
          node-key="id"
          highlight-current
          ref="menuTree"
          @node-click="getNodeData"
          default-expand-all>
        </el-tree>
      </el-col>
      <el-col class="right" :span="20" style='margin-top:15px;' v-show="showTable">
        <el-card shadow="always">
          <el-table
          :data="tableData"
          style="width: 100%"
          height="300"
          >
            <el-table-column
            label="菜单名称"
            prop="menu_name"></el-table-column>
            <el-table-column
            label="菜单英文名称"
            prop="menu_english_name"></el-table-column>
            <el-table-column
            label="菜单标准路径"
            prop="menu_url"></el-table-column>
            <el-table-column
            label="v"
            prop="is_auth_check"></el-table-column>
            <el-table-column
            label="创建时间"
            prop="create_time"></el-table-column>
            <el-table-column
            label="创建人员"
            prop="create_oper"></el-table-column>
            <el-table-column
            label="菜单图标"
            prop="menu_icon"></el-table-column>
            <el-table-column
            label="更新人员"
            prop="update_oper"></el-table-column>
            <el-table-column
            label="更新时间"
            prop="update_time"></el-table-column>
            <el-table-column
            label="是否显示"
            prop="is_display"></el-table-column>
            <el-table-column
            label="上级菜单"
            prop="menu_parent_id"></el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="handlerEdit(scope.row)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="handleDelete(scope.row)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" 
    :before-close="handleClose">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="菜单名称:" prop="menu_name">
          <el-input v-model="form.menu_name" ></el-input>
        </el-form-item>
        <el-form-item label="菜单英文名称:" prop="menu_english_name">
          <el-input v-model="form.menu_english_name" ></el-input>
        </el-form-item>
        <el-form-item label="菜单标准路径:" prop="menu_url">
          <el-select v-model="form.menu_url" placeholder="请选择菜单路径">
            <el-option label="/123" value="/123"></el-option>
            <el-option label="/456" value="/456"></el-option>
            <el-option label="/789" value="/789"></el-option>
            <el-option label="/1345" value="/1345"></el-option>
            <el-option label="/4878" value="/4878"></el-option>
            <el-option label="/487" value="/487"></el-option>
            <el-option label="/7879" value="/7879"></el-option>
            <el-option label="/87445" value="/87445"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="???:">
          <el-radio v-model="form.is_auth_check" label="0">是</el-radio>
          <el-radio v-model="form.is_auth_check" label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="是否显示:">
          <el-radio v-model="form.is_display" label="0">是</el-radio>
          <el-radio v-model="form.is_display" label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="上级菜单:" v-show="fatherMenu">
          <el-input v-model="form.menu_parent_id"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button :loading="loading" v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button :loading="loading" v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, delMenu, fetchMenu, updateMenu, getMenuMessage } from '@/api/admin/menu/index'
export default {
  data () {
    return {
      props: {
        label: 'name',
        id: 'id',
        children: 'children'
      },
      showTable: false,
      fatherMenu: false,
      treeData: [],
      tableData: [],
      dialogStatus: 'create',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      loading: false,
      dialogFormVisible: false,
      form: {
        menu_name: undefined,
        menu_english_name: undefined,
        menu_url: undefined,
        is_auth_check: undefined,
        is_display: undefined,
        menu_parent_id: undefined
      },
      currentId: -1,
      rules: {
        menu_name: [
          { required: true, message: '请输入菜单名称，请不要重复', trigger: 'blur' }
        ],
        menu_url: [
          { required: true, message: '请输入菜单详细路径', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      fetchMenu().then(data => {
        console.log(data.data.data)
        this.treeData = data.data.data
      })
    },
    /**取消 */
    cancel(form) {
        this.dialogFormVisible = false;
        this.$refs[form].resetFields();
    },
    /**新建 */
    create(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.loading = true
          if(this.currentId === -1) {
            let i = 0
            this.form.menu_parent_id = i
          }
          const SysMenu = this.form
          addMenu(SysMenu).then( response => {
            if(response.data.code === 200) {
              this.loading = false
              this.dialogFormVisible = false;
              this.getList()
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false
            } else {
              this.$notify({
                title: '失败',
                message: '创建失败',
                type: 'error',
                duration: 2000
              })
              this.loading = false
            }
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    /**更新 */
    update(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.loading = true
          updateMenu(this.form).then(response => {

            if(response.data.code === 200) {
              this.loading = false
              this.dialogFormVisible = false;
              this.getList()
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false
            } else {
              this.$notify({
                title: '失败',
                message: '创建失败',
                type: 'error',
                duration: 2000
              })
              this.loading = false
            }
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
      /**获取菜单详细信息 */
      getNodeData(data) {
        console.log(data.id)
        getMenuMessage(data.id).then(response => {
          this.showTable = true
          console.log(response)
          const table = []
          table.push(response.data.data)
          this.tableData = table
          console.log(this.tableData)
        });
        this.currentId = data.id;
      },
      /**编辑 */
      handlerEdit(row) {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.form = Object.assign({}, row)
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      },
      /**删除 */
      handleDelete(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delMenu(row.id).then(() => {
            this.loading = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        })
      },
      /**初始化菜单 */
      restform() {
        this.form = {
          menu_parent_id: this.currentId,
          menu_name: undefined,
          menu_english_name: undefined,
          menu_parent_id: undefined,
          menu_url: undefined,
          is_auth_check: '0',
          is_display: '0',
        }
      },
      /**添加菜单 */
      handlerAdd() {
        this.restform()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      /**弹窗关闭时 */
      handleClose() {
        this.loading = false
        this.dialogFormVisible = false
      }
  }
}
</script>
<style scoped>

</style>
