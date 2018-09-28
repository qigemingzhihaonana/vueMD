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
              <!-- <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template> -->
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" inline="true">
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
      <el-form :model="form" :rules="rules" ref="form" inline="true">
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
      <el-form :model="form" :rules="rules" ref="form" inline="true">
        <el-form-item label="上级部门:">
          <el-input v-model="upLeader" :disabled="formEdit" ></el-input>
        </el-form-item>
        <el-form-item label="部门正职">
          <el-input v-model="positionZ" :disabled="formEdit" ></el-input>
        </el-form-item>
        <el-form-item label="部门副职">
          <el-input v-model="positionF" :disabled="formEdit" ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" inline="true">
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
          v-for="item in option"
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
      <el-form :model="form" :rules="rules" ref="form" inline="true">
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
      <el-form :model="form" :rules="rules" ref="form" inline="true">
        <el-form-item label="部门收发员">
          <el-input v-model="form.transceiver" :disabled="formEdit" ></el-input>
        </el-form-item>
        <el-form-item label="正副职同时传阅">
          <el-select v-model="form.together" :disabled="formEdit" >
            <el-option
            v-for="item in option"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>  
</template>
<script>
import { getAll, insertDepartment, delectDepartment, updataDepartment } from '@/api/admin/department/index'
export default {
  data () {
    return {
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogFormVisible: false,
      tableData: [],
      treeData: [],
      formEdit: true,
      formAdd: true,
      formStatus: '',
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
      filterText: ''
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
      insertDepartment(form).then( () => {
        this.getList();
      })
    },
    getList() {
			getAll(this.listQuery).then(data => {
				this.treeData = data;
			});
    },
    getNodeData(data) {
      if (!this.formEdit) {
				this.formStatus = 'update';
			}
      //通过节点的数据传递给后台向其要求数据
      getObj(data.id).then(response => {
      	this.form = response.data;
      });
      this.currentId = data.id;
      this.$refs.form = data.id;
      this.$refs.menuElement.getList();
    },
    handlerAdd () {
      const fatherNode = this.$refs.treeData.getCheckedNodes();
      this.restForm(fatherNode);
      this.formEdit = false;
      this.formStatus = 'create';
    },
    handleDelete () {
      //if ()
    },
    handlerEdit () {

    },
    restForm(fatherNode) {
      this.form = {
        cName: undefined,
				zName: undefined,
				area: 'HB',
				ocName: undefined,
				oaName: undefined,
				sort: undefined,
				upLeader: fatherNode.label,
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
        this.form = data,
        this.formStatus = 'Edit'
      })
    }
  }
}
</script>
<style >

</style>
