<template>
  <div class="user">
    <div class="file-edit">
      <el-input placeholder="请输入员工工号或姓名" 
      v-model="searchUser" 
      ref="searchUser"
      style="width: 230px;" 
      @keyup.enter.native="handleFilter">
      <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
      </el-input>
      <el-button-group>
        <el-button v-waves type="primary" icon="plus" @click="handlerAdd">添加人员</el-button>
        <el-button v-waves type="primary" icon="plus" @click="handlerAddMore">批量导入</el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col class="right" :span="24" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          height="390px"
          border
          fit
          stripe>
            <el-table-column
            sortable
            :sort-method="sort"
            label="员工账号"
            prop="user_name"
            align='center'></el-table-column>
            <el-table-column
            label="员工真实姓名"
            prop="real_name"
            align='center'>是</el-table-column>
            <el-table-column
            label="员工工号"
            prop="user_code"
            align='center'></el-table-column>
            <el-table-column
            label="员工级别"
            prop="user_level"
            align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.user_level === 0">一级</span>
              <span v-if="scope.row.user_level === 1">二级</span>
              <span v-if="scope.row.user_level === 2">三级</span>
              <span v-if="scope.row.user_level === 3">四级</span>
              <span v-if="scope.row.user_level === 4">五级</span>
            </template>
            </el-table-column>
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
            align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.is_company_leader === 0">是</span>
              <span v-if="scope.row.is_company_leader === 1">否</span>
            </template>
            </el-table-column>
            <el-table-column
            label="排序"
            prop="order_number"
            align='center'></el-table-column>
            <el-table-column
            label="员工email"
            prop="user_email"
            align='center'></el-table-column>
            <el-table-column
            label="是否在职"
            prop="stauts"
            align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.stauts === 0">是</span>
              <span v-if="scope.row.stauts === 1">否</span>
            </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.stauts === 0"
                v-waves
                @click.native.prevent="handl(scope.row)"
                type="text"
                size="small">
                删除
              </el-button>
              <el-button
              v-waves 
              type="text"
              size="small"
              @click="handlerEdit(scope.row)">
                编辑
              </el-button>
              <el-button
                v-if="scope.row.stauts === 1"
                v-waves
                @click.native.prevent="handler(scope.row)"
                type="text"
                size="small">
                启用
              </el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div>
      <el-pagination
      v-show="tableData.length > 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" 
    lock-scroll @close="close">
      <el-form :model="form" inline ref="form" :rules="rules" label-position="left">
        <el-form-item label="员工账号:" prop="user_name">
          <el-input v-model="form.user_name" ></el-input>
        </el-form-item>
        <el-form-item label="员工密码:" prop="user_password">
          <el-input v-model="form.user_password" ></el-input>
        </el-form-item>
        <el-form-item label="员工真实姓名:" prop="real_name">
          <el-input v-model="form.real_name" ></el-input>
        </el-form-item>
        <el-form-item label="员工工号:" prop="user_code">
          <el-input v-model="form.user_code" ></el-input>
        </el-form-item>
        <el-form-item label="员工级别:">
          <el-select v-model="form.user_level" placeholder="请选择">
            <el-option
              v-for="item in user_level"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否公司领导:">
          <el-select v-model="form.is_company_leader" placeholder="请选择">
            <el-option
              v-for="item in is_company_leader"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门:">
          <el-select v-model="form.dep_id" placeholder="请选择">
            <el-option
              v-for="item in dep_id"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工职位:">
          <el-input v-model="form.user_position"></el-input>
        </el-form-item>
        <el-form-item label="排序:" >
          <el-input v-model="form.order_number"></el-input>
        </el-form-item>
        <el-form-item label="员工email:" >
          <el-input v-model="form.user_email"></el-input>
        </el-form-item>
        <el-form-item label="是否在职:">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-waves  v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-waves  v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
    <excle :show.sync="show"></excle>
  </div>
</template>
<script>
import excle from "./components/excle"
import { fetchUser, addUser, updateUser, deleteUser, select, upd } from '@/api/admin/user/index'
import waves from '@/directive/waves' // 水波纹指令
import { getAll } from '@/api/admin/department/index'
export default {
  name: 'user',
  directives: {
    waves
  },
  components: {
    excle
  },
  data() {
    return {
      dep_id: [],
      stauts: [{
        value: 0,
        label: '是'
      },{
        value: 1,
        label: '否'
      }],
      user_level: [{
          value: 0,
          label: '一级'
        }, {
          value: 1,
          label: '二级'
        },
        {
          value: 2,
          label: '三级'
        },
        {
          value: 3,
          label: '四级'
        },
        {
          value: 4,
          label: '五级'
        }],
        is_company_leader: [{
          value: 0,
          label: '是'
        }, {
          value: 1,
          label: '否'
        }],
      searchUser: undefined,
      loading: true,
      currentPage: 1,
      pagesize: 20,
      show: false,
      dialogFormVisible: false,
      dialogStatus: undefined,
      textMap: {
        create: '新建',
        update: '更新'
      },
      tableData: [],
      form: {
        user_name: undefined,
        user_password: undefined,
        user_code: undefined,
        real_name: undefined,
        user_level: undefined,
        is_company_leader: undefined,
        user_position: undefined,
        order_number: undefined,
        user_email: undefined,
        status: 0
      },
      rules: {
        user_name: [
          { required: true, message: '请输入员工账号', trigger: 'blur' }
        ],
        user_password: [
          { required: true, message: '请输入员工密码', trigger: 'blur' }
        ],
        real_name: [
          { required: true, message: '请输入员工真实姓名', trigger: 'blur' }
        ],
        user_code: [
          { required: true, message: '请输入员工工号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    sort() {

    },
    close() {
      this.loading = false
    },
    handleFilter() {
      this.$refs[searchUser].validate( valid => {
        if(valid) {
          select(searchUser).then( data => {
            this.tableData
            fgfgjdgnfn
          })
        }else {
          this.$notify({
              title: '错误',
              message: '用户名或账户为空',
              type: 'error',
              duration: 2000
            })
        }
      })
    },
    handleSizeChange(size) {
        this.pagesize = size;
    },
    handleCurrentChange(currentPage){
        this.currentPage = currentPage;
    },
    fetch() {
      getAll().then(data => {
        this.dep_id = data.data.data
      }),
      fetchUser().then(data => {
        this.tableData = data.data.data
        console.info(this.tableData)
        setTimeout(() => {
          this.loading = false
        }, 1.5 * 1000)
      })
    },
    handler(form) {

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
    handl(row) {
      const data = []
      data.push(row)
      deleteUser(data).then(() => {
        this.fetch()
        this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
      })
    },
    create(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.loading = true
          this.form.dep_id = this.form.dep_id.toString()
          addUser(this.form).then(() => {
            console.info("成功")
            this.loading = false
            this.dialogFormVisible = false;
            this.fetch()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            setTimeout(() => {
              this.loading = false
            }, 1.5 * 1000)
          })
        } else {
          this.loading = false
          return false
        }
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
    this.$refs.form.validate(valid => {
      if(valid) {
        this.loading = true
        this.form.dep_id = this.form.dep_id.toString()
        upd(this.form).then(response => {
          console.log(response)
          
            this.loading = false
            this.dialogFormVisible = false
            this.fetch()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.loading = false
          }
        )} else {
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
        user_name: undefined,
        user_password: undefined,
        user_code: undefined,
        real_name: undefined,
        user_level: 1,
        is_company_leader: 1,
        user_position: undefined,
        order_number: undefined,
        user_email: undefined,
        status: '0'
      }
    },
  }
 }
</script>
<style scoped>

</style>
