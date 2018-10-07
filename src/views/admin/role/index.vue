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
          :data="tableData"
          style="width: 100%"
          height="300">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-expand">
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
                  <span>{{ props.row.is_build }}</span>
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
            <el-button
              @click.native.prevent="addUser(scope.row)"
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
    :before-close="handleClose">
      <el-form :model="form" ref="form" inline :rules="rules" style="height: 50%">
        <el-form-item label="角色ID:" prop="id">
          <el-input v-model="form.role_code" ></el-input>
        </el-form-item>
        <el-form-item label="角色名称:" prop="name">
          <el-input v-model="form.role_name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述:" prop="desc">
          <el-input type="textarea" v-model="form.role_desc"></el-input>
        </el-form-item>
        <el-form-item label="是否系统内置角色:">
          <el-radio v-model="form.is_build" label="0">是</el-radio>
          <el-radio v-model="form.is_build" label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="创建时间:" v-show="false" >
          <el-input v-model="form.createTime" ></el-input>
        </el-form-item>
        <el-form-item label="最后更新时间:" v-show="false" >
          <el-input v-model="form.updateTime" ></el-input>
        </el-form-item>
        <el-form-item label="创建人员:" v-show="false">
          <el-input v-model="form.createOper" ></el-input>
        </el-form-item>
        <el-form-item label="最后更新人员:" v-show="false">
          <el-input v-model="form.updateOper" ></el-input>
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
      :roleId="roleId" 
      :tableLeft="tableDataRole"
      :tableRight="tableDataAddRole"></role-user>
    </div>
  </div>
</template>
<script>
import { getRole, getRoleTable , addRole, delRole, updateRole, getRoleUser } from '@/api/admin/role/index'
import RoleUser from './components/userAdd'
export default {
  components: {
    RoleUser
  },
  data () {
    return {
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
        is_build: '1',
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
        id: [
          { required: true, message: '请输入角色ID，ID不能重复', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入角色名称，角色名称不能重复', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入角色详细信息', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    addUser(row) {
      console.log(row.id)
      this.show = true
      this.roleId = row.id
      const id = row.id
      getRoleUser(id).then(data => {
        console.log(data.data[0])
        this.tableDataRole = data.data[0]
        this.tableDataAddRole = data.data[1]
        console.log(this.tableDataRole)
      })
    },
    getTableList() {
      getRoleTable(this.listQuery).then(data => {
				this.tableData = data.data
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
        this.loading = true
        delRole(row.id).then(() => {
          this.loading = false
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
      this.form.updateTime = new Date()
      this.form.updateOper = '123'
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    update(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.loading = true
          updateRole(this.form).then(() => {
            this.loading = false
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
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
          addRole(this.form).then(() => {
            this.loading = false
            this.dialogFormVisible = false;
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
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
        createTime: new Date(),
        createOper: 'lll',
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
