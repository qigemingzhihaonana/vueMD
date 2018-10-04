<template>
  <div class="user">
    <div class="file-edit">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handlerAdd">添加人员</el-button>
        <el-button type="primary" icon="plus" @click="handlerAddMore">批量导入</el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col class="right" :span="24" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-table
          :data="tableData"
          style="width: 100%"
          height="300"
          border>
            <el-table-column
            label="员工账号"
            prop="user_name"
            align='center'></el-table-column>
            <el-table-column
            label="员工密码"
            prop="user_password"
            align='center'></el-table-column>
            <el-table-column
            label="员工真实姓名"
            prop="real_name"
            align='center'></el-table-column>
            <el-table-column
            label="员工工号"
            prop="user_code"
            align='center'></el-table-column>
            <el-table-column
            label="是否在职"
            prop="user_level"
            align='center'></el-table-column>
            <el-table-column
            label="员工职位"
            prop="user_position"
            align='center'></el-table-column>
            <el-table-column
            label="所属部门"
            prop="dep_id"
            align='center'></el-table-column>
            <el-table-column
            label="是否公司领导"
            prop="is_company_leader"
            align='center'></el-table-column>
            <el-table-column
            label="排序"
            prop="order_number"
            align='center'></el-table-column>
            <el-table-column
            label="员工email"
            prop="user_email"
            align='center'></el-table-column>
            <el-table-column
            label="是否有效"
            prop="status"
            align='center'></el-table-column>
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
            </template>
          </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" 
    lock-scroll>
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="员工账号:" prop="username">
          <el-input v-model="form.userName" ></el-input>
        </el-form-item>
        <el-form-item label="员工密码:" prop="password">
          <el-input v-model="form.password" ></el-input>
        </el-form-item>
        <el-form-item label="员工真实姓名:" prop="realName">
          <el-input v-model="form.realName" ></el-input>
        </el-form-item>
        <el-form-item label="员工工号:" prop="code">
          <el-input v-model="form.code" ></el-input>
        </el-form-item>
        <el-form-item label="是否在职:">
          <el-radio v-model="form.isLevel" label="0">是</el-radio>
          <el-radio v-model="form.isLevel" label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="是否公司领导:">
          <el-radio v-model="form.isleader" label="0">是</el-radio>
          <el-radio v-model="form.isleader" label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="员工职位:">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
        <el-form-item label="排序:" >
          <el-input v-model="form.order"></el-input>
        </el-form-item>
        <el-form-item label="员工email:" >
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="是否有效:">
          <el-radio v-model="form.isStatus" label="0">是</el-radio>
          <el-radio v-model="form.isStatus" label="1">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button :loading="loading" v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button :loading="loading" v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
    <excle :show.sync="show"></excle>
  </div>
</template>
<script>
import excle from "./components/excle"
import { fetchUser, addUser, updateUser } from '@/api/admin/user/index'
export default {
  components: {
    excle
  },
  data() {
    return {
      show: false,
      dialogFormVisible: false,
      loading: false,
      dialogStatus: undefined,
      textMap: {
        create: '新建',
        update: '更新'
      },
      tableData: [],
      form: {
        userName: undefined,
        password: undefined,
        realName: undefined,
        isLevel: '1',
        isleader: '0',
        position: undefined,
        order: undefined,
        email: undefined,
        isStatus: '0'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入用户真实姓名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入用户工号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      fetchUser(this.listQuery).then( (data) => {
        this.tableData = data
      })
    },
    handlerAddMore() {
      this.show = true
    },
    cancel(form) {
      this.dialogFormVisible = false;
      this.$refs[form].resetFields();
    },
    handlerAdd() {
      this.dialogStatus = 'create'
      this.restForm()
      this.dialogFormVisible = true
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
          updateUser(this.form).then(() => {
            this.loading = false
            this.dialogFormVisible = false
            this.fetch()
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
          addUser(this.form).then(() => {
            this.loading = false
            this.dialogFormVisible = false;
            this.fetch()
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
        userName: undefined,
        password: undefined,
        realName: undefined,
        isLevel: undefined,
        isleader: undefined,
        position: undefined,
        order: undefined,
        email: undefined,
        isStatus: undefined
      }
    },
  }
 }
</script>
<style scoped>

</style>
