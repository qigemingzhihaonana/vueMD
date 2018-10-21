<template>
  <div class="role">
    <div class="file-edit">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handlerAdd">新建角色</el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col class="right" :span="24" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-table
          border
          fit
          :data="tableData"
          style="width: 100%"
          height="300">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="ID:" v-show="false">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="角色ID:">
                  <span>{{ props.row.role_code }}</span>
                </el-form-item>
                <el-form-item label="角色名称:">
                  <span>{{ props.row.role_name }}</span>
                </el-form-item>
                <el-form-item label="角色描述:">
                  <span>{{ props.row.role_desc }}</span>
                </el-form-item>
                <el-form-item label="是否系统内置角色:">
                  <span v-if="props.row.is_builtin === 0">是</span>
                  <span v-else>否</span>
                </el-form-item>
                <el-form-item label="创建时间:">
                  <span>{{ props.row.createTime }}</span>
                </el-form-item>
                <el-form-item label="更新时间:">
                  <span>{{ props.row.updateTime }}</span>
                </el-form-item>
                <el-form-item label="创建人员:">
                  <span>{{ props.row.createOper }}</span>
                </el-form-item>
                <el-form-item label="更新人员:">
                  <span>{{ props.row.updateOper }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="角色ID"
            prop="role_code"
            align="center">
          </el-table-column>
          <el-table-column
            label="角色名称"
            prop="role_name"
            align="center">
          </el-table-column>
          <el-table-column
            label="角色描述"
            prop="role_desc"
            align="center">
          </el-table-column>
          <el-table-column
          fixed="right"
          label="操作"
          width="180"
          >
          <template slot-scope="scope">
            <el-button
              @click="handlerEdit(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click="handleDelete(scope.row)"
              type="text"
              size="small">
              删除
            </el-button>
            <el-button
              @click="addUser(scope.row.id)"
              type="text"
              size="small">
              配置人员
            </el-button>
          </template>
        </el-table-column>
        </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible"
    :before-close="handleClose" >
      <el-form :model="form" ref="form" inline :rules="rules" style="height: 50%">
        <el-form-item label="角色ID:" prop="role_code">
          <el-input v-model="form.role_code" ></el-input>
        </el-form-item>
        <el-form-item label="角色名称:" prop="role_name">
          <el-input v-model="form.role_name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述:" prop="role_desc">
          <el-input type="textarea" v-model="form.role_desc"></el-input>
        </el-form-item>
        <el-form-item label="是否系统内置角色:">
          <el-select v-model="form.is_builtin" placeholder="请选择">
            <el-option
              v-for="item in is_builtin"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button :loading="loading" v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button :loading="loading" v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>

    <div class="roleuser">
      <role-user 
      :show.sync="show" 
      :roleId="roleId" ></role-user>
    </div>
  </div>
</template>
<script>
import { getRole, getRoleTable , addRole, delRole, updateRole, fetchUser } from '@/api/admin/role/index'
import RoleUser from './components/userAdd'
export default {
  name: 'role',
  components: {
    RoleUser
  },
  data () {
    return {
      is_builtin: [{
          value: 0,
          label: '是'
        }, {
          value: 1,
          label: '否'
        }],
      tableDataRole: [],
      tableDataAddRole: [],
      loading: false,
      editM: false,
      createM: false,
      tableData: [],
      show: false,
      roleId: -1,
      form: {
        role_code: '',
        role_name: '',
        role_desc: '',
        is_builtin: 1,
        createTime: '',
        createOper: '',
        updateTime: '',
        updateOper: ''
      },
      dialogStatus: 'create',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogFormVisible: false,
      formEdit: true,
      formAdd: true,
      rules: {
        role_code: [
          { required: true, message: '请输入角色ID，ID不能重复', trigger: 'blur' }
        ],
        role_name: [
          { required: true, message: '请输入角色名称，角色名称不能重复', trigger: 'blur' }
        ],
        role_desc: [
          { required: true, message: '请输入角色详细信息', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    addUser(id) {
      this.$store.dispatch('GetUser', id).then(() => {
        this.show = true
      })
      this.roleId = id
    },
    getTableList() {
      getRoleTable().then(data => {
        console.log(data)
        this.tableData = data.data.data
        console.log(this.tableData)
			});
    },
    handlerAdd() {
      this.dialogStatus = 'create'
      this.restForm()
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        delRole(row.id).then(() => {
          this.getTableList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    handlerEdit(row) {
      this.form = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    update(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.loading = true
          updateRole(this.form).then(response => {
            console.log(response)
            if(response.data.code === 200) {
              this.loading = false
              this.dialogFormVisible = false
              this.getTableList()
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false
            } else {
              this.$notify({
                title: '失败',
                message: '更新失败',
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
    create(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.loading = true
          addRole(this.form).then(response => {
            if(response.data.code === 200) {
              this.loading = false
              this.dialogFormVisible = false
              this.getTableList()
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
    cancel(form) {
      this.dialogFormVisible = false;
      this.$refs[form].resetFields();
    },
    restForm() {
      this.form = {
        id: undefined,
        name: undefined,
        desc: undefined,
        isbuild: '1',
        updateTime: undefined,
        updateOper: undefined
      }
    },
    /**弹窗关闭时 */
    handleClose(done) {
      this.loading = false
      this.dialogFormVisible = false
    }
  }
}
</script>
<style scoped>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
