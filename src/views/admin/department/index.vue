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
          :data="treeData"
          node-key="id"
          highlight-current
          ref="menuTree"
          @node-click="getNodeData"
          default-expand-all
          >
        </el-tree>
      </el-col>
      <el-col :span="16" style='margin-top:15px;'>
        <el-card class="box-card">
          <el-table
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
              prop="name"
              label="部门名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="id"
              label="部门id"
              align="center">
            </el-table-column>
            <el-table-column
              prop="province"
              label="统一部门编号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="desc"
              label="部门描述"
              align="center">
            </el-table-column>
            <el-table-column
              prop="state"
              label="部门状态"
              align="center">
            </el-table-column>
            <el-table-column
              prop="pz"
              label="正职领导"
              align="center">
            </el-table-column>
            <el-table-column
              prop="pf"
              label="副职领导"
              align="center">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%">
      <el-form :model="form" :rules="rules" ref="form" >
        <el-form-item label="部门名称:">
    			<el-input v-model="form.cName"  prop="cName"></el-input>
    		</el-form-item>
    		<el-form-item label="部门名称(英文):">
    			<el-input v-model="form.zName"  prop="zName"></el-input>
    		</el-form-item>
    		<el-form-item label="所属地区:">
    			<el-input v-model="form.area"  prop="area"></el-input>
    		</el-form-item>
        <el-form-item label="部门别名:">
    		  <el-input v-model="form.ocName"  ></el-input>
        </el-form-item>
        <el-form-item label="部门别名(英文):">
          <el-input v-model="form.ozName"  ></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input v-model="form.sort" ></el-input>
        </el-form-item>
        <el-form-item label="上级部门:" >
          <!-- <el-select-tree
                          :treeData="treeData"
                          clearable
                          placeholder="请选择上级部门">
          </el-select-tree> -->
        </el-form-item>
        <el-form-item label="部门正职">
          <el-input v-model="form.positionZ" ></el-input>
        </el-form-item>
        <el-form-item label="部门副职">
          <el-input v-model="form.positionF" ></el-input>
        </el-form-item>
        <el-form-item label="部门状态:">
          <el-select v-model="form.state" >
            <el-option
            v-for="item in option"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示:">
        <el-select v-model="form.isshow" >
          <el-option
          v-for="item in optionx"
          :key="item.key"
          :label="item.label"
          :value="item.value">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门级别:">
        <el-select v-model="form.level" prop="level" >
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
          <el-input v-model="form.departmentNumber" ></el-input>
        </el-form-item>
        <el-form-item label="部门收发员">
          <el-input v-model="form.transceiver" ></el-input>
        </el-form-item>
        <el-form-item label="正副职同时传阅">
          <el-select v-model="form.together" >
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
				cName: undefined,
				zName: undefined,
				area: 'HB',
				ocName: undefined,
				oaName: undefined,
				sort: undefined,
				upLeader: undefined,
				positionZ: undefined,
				positionF: undefined,
				state: undefined,
				isshow: undefined,
				level: undefined,
				province: undefined,
				department: undefined,
				departmentNumber: undefined,
				transceiver: undefined,
				together: undefined  
			},
      currentId: -1,
      filterText: '',
      rules: {
          zName: [
            { required: true, message: '请输入部门英文名称', trigger: 'blur' }
          ],
          cName: [
            { required: true, message: '请输入部门中文名称', trigger: 'blur' }
          ],
          area: [
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
      insertDepartment(form).then( () => {
        this.getList()
        this.loading = false
      })
    },
    getList() {
			getAll().then(data => {
        console.log(data)
        this.treeData = data.data
        console.log(this.treeData)
			});
    },
    getNodeData(data) {
      //通过节点的数据传递给后台向其要求数据
      console.log(data.id)
      console.log(data)
      fetchMessage(data.id).then(response => {
        console.log(response)
        this.tableData = response.data;
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
    handleDelete () {
      const id = this.currentId
      if(id !== -1) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delectDepartment(id).then(() => {
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
        if(valid) {
          this.loading = true
          updateDepartment(this.form).then(() => {
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
    handlerEdit () {
      const id = this.currentId
      if(id !== -1) {
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
        getMessage(id).then( data => {
          console.log(data.data)
          this.form = Object.assign({}, data.data[0])
          console.log(this.form)
          // this.treeData = data.data.upLeader
          // console.log(data.data.upLeader)
        })
        this.formEdit = true
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
        cName: undefined,
				zName: undefined,
				area: 'HB',
				ocName: undefined,
				oaName: undefined,
				sort: undefined,
				upLeader: undefined,
				positionZ: undefined,
				positionF: undefined,
				isshow: undefined,
				state: undefined,
				level: undefined,
				province: undefined,
				department: undefined,
				departmentNumber: undefined,
				transceiver: undefined,
				together: undefined  
      }
    },
    handleClick(row) {
      this.dialogFormVisible = true,
      this.dialogStatus=='update'
      getMessage(row.id).then( data => {
        this.form = data.data
      })
    }
  }
}
</script>
<style >

</style>
