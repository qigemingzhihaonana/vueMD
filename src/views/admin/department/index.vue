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
      <el-col :span="16" style='margin-top:15px;' v-show="showTable">
        <el-card class="box-card">
          <el-table
            fit
            :data="tableData"
            border
            style="width: 100%"
            row-click="handleClick(scope.row)">
            <el-table-column
            type="selection"
            align="center">
            </el-table-column>
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
      <el-form label-position=left :model="form" :rules="rules" ref="form" >
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
        <el-form-item label="上级部门:" >
          <el-input v-model="form.parent_dep_id" ></el-input>
        </el-form-item>
        <el-form-item label="部门正职">
          <el-input v-model="form.dep_principal" ></el-input>
        </el-form-item>
        <el-form-item label="部门副职">
          <el-input v-model="form.dep_deputy" ></el-input>
        </el-form-item>
        <el-form-item label="部门状态:">
          <el-select v-model="form.dep_status" >
            <el-option
            v-for="item in option"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示:">
        <el-select v-model="form.is_display" >
          <el-option
          v-for="item in optionx"
          :key="item.key"
          :label="item.label"
          :value="item.value">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门级别:">
        <el-select v-model="form.dep_type" prop="dep_type" >
          <el-option
          v-for="item in option"
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
            v-for="item in optionx"
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
import { getAll, getMessage, insertDepartment, delectDepartment, updataDepartment, fetchMessage } from '@/api/admin/department/index'
export default {
  components: {ElSelectTree},
  data () {
    return {
      depName: undefined,
      showTable: false,
      props: {
        label: 'name',
        id: 'id'
      },
      loading: false,
      optionx: [
        {
          label: '是',
          value: '0'
        },
        {
          label: '否',
          value: '1'
        }
      ],
      option: [
        {
          label: '1',
          value: '1'
        },
        {
          label: '2',
          value: '2'
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
			options:[{
				value: "true",
				label: "是"
			},
			{
				value: "false",
				label: "否"
			}],
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
        this.$refs[form].resetFields();
    },
    create(form) {
      this.loading = true
      if (form.dep_principal !== null || form.dep_principal !== '') {
        form.dep_principal = 0-0
      }
      if (form.dep_deputy !== null || form.dep_deputy !== '') {
        form.dep_deputy = new Array()
      }
      insertDepartment(form).then( () => {
        this.getList()
        this.loading = false
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
        } else {
          this.tableData = response.data.data
        }
        console.log(this.tableData)
      });
      this.currentId = data.id;
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
      this.$refs[form].validate(valid => {
        const id = this.currentId
        let id1
        let ids
        if(valid) {
          this.loading = true
          if (form.dep_principal == null || form.dep_principal == '') {
              form.dep_principal = 0
              id1 = 0
            }else {
              id1 = form.dep_principal
            }
          if (form.dep_deputy == null || form.dep_deputy == '') {
              form.dep_deputy = []
              ids = []
          }else {
            ids = dep_deputy
          }
          updateDepartment(id, id1 ,ids, this.form).then(() => {
            this.loading = false
            this.dialogFormVisible = false
            this.getList()
            fetchMessage(this.depName).then( response => {
              const table = []
              if(response.data.data.length === 1 || response.data.data.length === undefined) {
                table.push(response.data.data)
                this.tableData = table
              } else {
                this.tableData = response.data
              }
            })
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
    handlerEdit () {
      const id = this.currentId
      if(id !== -1) {
        this.formEdit = true
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
        console.log(this.tableData)
        this.form = Object.assign({}, this.tableData[0])
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
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
