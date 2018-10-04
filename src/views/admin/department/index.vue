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
          :filter-node-method="filterNode"
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
            width="55">
            </el-table-column>
            <el-table-column
              fixed
              prop="date"
              label="部门名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="部门id"
              width="150">
            </el-table-column>
            <el-table-column
              prop="province"
              label="统一部门编号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="city"
              label="部门描述"
              width="150">
            </el-table-column>
            <el-table-column
              prop="address"
              label="部门状态"
              width="120">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="正职领导"
              width="120">
            </el-table-column>
            <el-table-column
              prop="right"
              label="副职领导"
              width="120">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%">
      <el-form :model="form" :rules="rules" ref="form" inline>
        <el-form-item label="部门名称:">
    			<el-input v-model="form.cName" :disabled="formEdit"  prop="cName"></el-input>
    		</el-form-item>
    		<el-form-item label="部门名称(英文):">
    			<el-input v-model="form.zName" :disabled="formEdit"  prop="zName"></el-input>
    		</el-form-item>
    		<el-form-item label="所属地区:">
    			<el-input v-model="form.area" :disabled="formEdit"  prop="area"></el-input>
    		</el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" inline>
        <el-form-item label="部门别名:">
    		  <el-input v-model="form.ocName" :disabled="formEdit"  ></el-input>
        </el-form-item>
        <el-form-item label="部门别名(英文):">
          <el-input v-model="form.ozName" :disabled="formEdit"  ></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input v-model="form.sort" :disabled="formEdit"  ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" inline>
        <el-form-item label="上级部门:" label-width="100px">
          <el-select-tree v-model="form.upLeader"
                          :treeData="treeData"
                          clearable
                          placeholder="请选择上级部门"
                          :disabled="formEdit">
          </el-select-tree>
        </el-form-item>
        <el-form-item label="部门正职">
          <el-input v-model="form.positionZ" :disabled="formEdit" ></el-input>
        </el-form-item>
        <el-form-item label="部门副职">
          <el-input v-model="form.positionF" :disabled="formEdit" ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" inline>
        <el-form-item label="部门状态:">
          <el-select v-model="form.state" :disabled="formEdit" >
            <el-option
            v-for="item in option"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示:">
        <el-select v-model="form.show" :disabled="formEdit" >
          <el-option
          v-for="item in optionx"
          :key="item.key"
          :label="item.label"
          :value="item.value">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门级别:">
        <el-select v-model="form.level" prop="level" :disabled="formEdit" >
          <el-option
          v-for="item in option"
          :key="item.key"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" inline>
        <el-form-item label="省份编码">
          <el-input v-model="form.province" :disabled="formEdit" ></el-input>
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input v-model="form.department" :disabled="formEdit" ></el-input>
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input v-model="form.departmentNumber" :disabled="formEdit" ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" inline>
        <el-form-item label="部门收发员">
          <el-input v-model="form.transceiver" :disabled="formEdit" ></el-input>
        </el-form-item>
        <el-form-item label="正副职同时传阅">
          <el-select v-model="form.together" :disabled="formEdit" >
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
import elTreeselect from 'el-tree-select';
import { getAll, insertDepartment, delectDepartment, updataDepartment } from '@/api/admin/department/index'
export default {
  components: {elTreeselect},
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
				show: undefined,
				state: undefined,
				show: undefined,
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    create(form) {
      this.loading = true
      insertDepartment(form).then( () => {
        this.getList()
        this.loading = false
      })
    },
    getList() {
			getAll(this.listQuery).then(data => {
				this.treeData = data;
			});
    },
    getNodeData(data) {
      //通过节点的数据传递给后台向其要求数据
      getObj(data.id).then(response => {
      	this.form = response.data;
      });
      this.currentId = data.id;
      this.$refs.form = data.id;
      this.$refs.menuElement.getList();
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
    handlerEdit () {
      const id = this.currentId
      if(id !== -1) {
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
        this.form = Object.assign({}, id)
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
				show: undefined,
				state: undefined,
				show: undefined,
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
      this.dialogStatus=='create'
      getMessage(row.id).then( data => {
        this.form = data
      })
    }
  }
}
</script>
<style >

</style>
