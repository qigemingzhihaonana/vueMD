<template>
  <div class="app-contain">
    <div class="file-edit">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handlerAdd">添加</el-button>
        <el-button type="primary" icon="edit" @click="handlerEdit">编辑</el-button>
        <el-button type="primary" icon="delete" @click="handleDelete">删除</el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col :span="8" style='margin-top:15px;'>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <el-tree
          class="filter-tree"
          :props="props"
          :data="treeData"
          node-key="id"
          highlight-current
          ref="menuTree"
          @node-click="getNodeData"
          default-expand-all
          >
        </el-tree>
      </el-col>
      <el-col class="col" :span="16" style='margin-top:15px;' v-show="showTable">
        <el-card class="box-card">
          <el-table
            fit
            :data="tableData"
            border
            style="width: 100%"
            row-click="handleClick(scope.row)">
            <el-table-column
              fixed
              prop="dep_name"
              label="部门名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="dep_number"
              label="部门id"
              align="center">
            </el-table-column>
            <el-table-column
              prop="dep_unity_code"
              label="统一部门编号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="dep_description"
              label="部门描述"
              align="center">
            </el-table-column>
            <el-table-column
              prop="dep_status"
              label="部门状态"
              align="center">
            </el-table-column>
            <el-table-column
              prop="dep_principal"
              label="正职领导"
              align="center">
            </el-table-column>
            <el-table-column
              prop="dep_deputy"
              label="副职领导"
              align="center">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%" :before-close="handleClose">
      <el-form label-position="left" :model="form"  inline :rules="rules" ref="form" >
        <el-form-item label="部门名称:" prop="dep_name">
    			<el-input v-model="form.dep_name"></el-input>
    		</el-form-item>
    		<el-form-item label="部门名称(英文):" prop="dep_english_name">
    			<el-input v-model="form.dep_english_name"></el-input>
    		</el-form-item>
    		<el-form-item label="所属地区:" prop="dep_area">
    			<el-input v-model="form.dep_area"></el-input>
    		</el-form-item>
        <el-form-item label="部门别名:">
    		  <el-input v-model="form.dep_alias"  ></el-input>
        </el-form-item>
        <el-form-item label="部门别名(英文):">
          <el-input v-model="form.dep_english_alias"  ></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input v-model="form.dep_number" ></el-input>
        </el-form-item>
        <el-form-item v-show="this.dialogStatus === 'update'" label="部门正职">
          <el-select v-model="dep_principal1" value-key="dep_principal.id" placeholder="请选择">
            <el-option
              v-for="item in dep_principal"
              :key="item.value"
              :label="item.real_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="this.dialogStatus === 'update'" label="部门副职">
          <el-select v-model="dep_deputy1" value-key="dep_deputy.id" multiple placeholder="请选择">
            <el-option
              v-for="item in dep_deputy"
              :key="item.value"
              :label="item.real_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门状态:">
          <el-select v-model="form.dep_status" >
            <el-option
            v-for="item in dep_status"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示:">
        <el-select v-model="form.is_display" >
          <el-option
          v-for="item in is_display"
          :key="item.key"
          :label="item.label"
          :value="item.value">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门级别:">
        <el-select v-model="form.dep_type" prop="dep_type" >
          <el-option
          v-for="item in dep_type"
          :key="item.key"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="省份编码">
          <el-input v-model="form.province" ></el-input>
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input v-model="form.department" ></el-input>
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input v-model="form.dep_number" ></el-input>
        </el-form-item>
        <el-form-item label="部门收发员">
          <el-input v-model="form.dep_transceiver" ></el-input>
        </el-form-item>
        <el-form-item label="正副职同时传阅">
          <el-select v-model="form.is_same_look" >
            <el-option
            v-for="item in is_same_look"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确定</el-button>
        <el-button v-else type="primary" @click="update('form')">确定</el-button>
      </div>
    </el-dialog>
  </div>  
</template>
<script>
import ElSelectTree from 'el-tree-select';
import { getAll, getMessage, getDepPrincipal, getDepdeputy, insertDepartment, delectDepartment, updataDepartment, fetchMessage } from '@/api/admin/department/index'
export default {
  name: 'department',
  components: {ElSelectTree},
  data () {
    return {
      dep_principal:[],
      dep_deputy: [],
      dep_principal1: [],
      dep_deputy1: [],
      id1: undefined,
      ids: undefined,
      depName: undefined,
      showTable: false,
      props: {
        label: 'name',
        id: 'id'
      },
      loading: false,
      is_same_look: [
        {
          label: '是',
          value: 0
        },
        {
          label: '否',
          value: 1
        }
      ],
      is_display: [
        {
          label: '是',
          value: 0
        },
        {
          label: '否',
          value: 1
        }
      ],
      dep_status: [
        {
          label: '有效',
          value: '0'
        },
        {
          label: '无效',
          value: '1'
        }
      ],
      dep_type: [
        {
          label: '1',
          value: '0'
        },
        {
          label: '2',
          value: '1'
        }
      ],
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogStatus: undefined,
      dialogFormVisible: false,
      tableData: [],
      treeData: [],
      formEdit: true,
      formAdd: true,
			listQuery: {
        name: undefined
      },
			form: {
				dep_name: undefined,
				dep_english_name: undefined,
				dep_area: 'HB',
				dep_alias: undefined,
				dep_english_alias: undefined,
				dep_number: undefined,
				parent_dep_id: undefined,
				dep_principal: undefined,
				dep_deputy: undefined,
				dep_status: undefined,
				is_display: undefined,
				dep_type: undefined,
				province: undefined,
				department: undefined,
				dep_number: undefined,
				dep_transceiver: undefined,
				is_same_look: undefined  
			},
      currentId: -1,
      filterText: '',
      rules: {
          dep_name: [
            { required: true, message: '请输入部门英文名称', trigger: 'blur' }
          ],
          dep_english_name: [
            { required: true, message: '请输入部门中文名称', trigger: 'blur' }
          ],
          dep_area: [
            { required: true, message: '请输入部门所属地区', trigger: 'blur' }
          ]
        }
    }
  },
  created() {
    this.getList();
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  methods: {
     /**取消 */
    cancel(form) {
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
    },
    create(form) {
      this.loading = true
      if(this.currentId !== -1 && this.dialogStatus === 'create') {
        this.form.parent_dep_id = this.currentId
      }
      // if(this.form.dep_deputy.length === null || this.form.dep_deputy.length === 0) {
      //   this.form.dep_deputy = this.dep_deputy.join(',')
      // }
      console.log(this.form)
      insertDepartment(this.form).then( () => {
        this.getList()
        this.loading = false
        this.dialogFormVisible = false
      })
    },
    getList() {
			getAll().then(data => {
        console.log(data)
        this.treeData = data.data.data
        console.log(data.data)
        console.log(this.treeData)
			});
    },
    getNodeData(data) {
      //通过节点的数据传递给后台向其要求数据
      this.depName = data.name
      console.log(data.id)
      console.log(data)
      fetchMessage(data.name).then(response => {
        this.showTable = true
        console.log(response)
        console.info(response.data.data.length)
        console.info(response.data.data === null)
        const table = []
        if(response.data.data.length === 1 || response.data.data.length === undefined) {
          table.push(response.data.data)
          this.tableData = table
          console.log([...table[0].dep_deputy])
          this.dep_deputy1 = [...table[0].dep_deputy.split(',')].map(Number)
          this.dep_principal = [...table[0].dep_principal.split(',')].map(Number)
          console.log(this.dep_deputy1)
          console.log(this.dep_principal)
          console.log(table)
        } else {
          this.tableData = response.data.data
        }
        console.log(this.tableData)
      });
      this.currentId = data.id;
      getDepdeputy(this.currentId).then( data => {
        this.dep_deputy = data.data.data
        console.log(this.dep_deputy)
      }),
      getDepPrincipal(this.currentId).then( data => {
        this.dep_principal = data.data.data
        console.log(this.dep_principal)
      }),
      this.$refs.form = data.id;
      // this.$refs.menuElement.getList();
    },
    handlerAdd () {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.restForm()
      this.formEdit = false
    },
    /**弹窗关闭时 */
    handleClose() {
      this.loading = false
      this.dialogFormVisible = false
    },
    handleDelete () {
      if(this.currentId !== -1) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.info(this.currentId)
          this.loading = true
          delectDepartment(this.currentId).then(() => {
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
      }else {
        this.$notify({
              title: '错误',
              message: '请选择删除项',
              type: 'error',
              duration: 2000
            })
      }
    },
    update(form) {
      const id = this.currentId
      this.loading = true
      this.form.dep_principal = [this.dep_principal1].toString()
      this.form.dep_deputy = [this.dep_deputy1].join(',')
      console.log(this.form)
      updataDepartment(this.form).then(() => {
        this.loading = false
        this.dialogFormVisible = false
        this.getList()
        })
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      // })
    },
    handlerEdit () {
      const id = this.currentId
      if(id !== -1) {
        this.formEdit = true
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
        console.log(this.tableData)
        this.form = Object.assign({}, this.tableData[0])
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
        console.log(this.form)
      }else {
        this.$notify({
              title: '错误',
              message: '请选择编辑项',
              type: 'error',
              duration: 2000
            })
      }
    },
    restForm() {
      this.form = {
        dep_name: undefined,
				dep_english_name: undefined,
				dep_area: 'HB',
				dep_alias: undefined,
				dep_english_alias: undefined,
				dep_number: undefined,
				parent_dep_id: undefined,
				dep_principal: undefined,
				dep_deputy: undefined,
				dep_status: undefined,
				is_display: undefined,
				dep_type: undefined,
				province: undefined,
				department: undefined,
				dep_number: undefined,
				dep_transceiver: undefined,
				is_same_look: undefined 
      }
    },
    handleClick(row) {
      this.dialogFormVisible = true,
      this.dialogStatus=='update'
      getMessage(row.name).then( data => {
        this.form = data.data
      })
    }
  }
}
</script>
<style >

</style>
