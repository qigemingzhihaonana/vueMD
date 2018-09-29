<template>
  <div class="role">
    <div class="file-edit">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handlerAdd">新建角色</el-button>
        <el-button type="primary" icon="edit" @click="handlerEdit">编辑</el-button>
        <el-button type="primary" icon="delete" @click="handleDelete">删除</el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col class="left" :span="8" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-tree
            class="filter-tree"
            :data="treeData"
            node-key="id"
            highlight-current
            ref="menuTree"
            @node-click="getNodeData"
            default-expand-all>
          </el-tree>
        </el-card>
      </el-col>
      <el-col class="right" :span="16" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="角色ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="角色名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="角色描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
                <el-form-item label="是否系统内置角色">
                  <span>{{ props.row.isbuild }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.createTime }}</span>
                </el-form-item>
                <el-form-item label="更新时间">
                  <span>{{ props.row.updateTime }}</span>
                </el-form-item>
                <el-form-item label="创建人员">
                  <span>{{ props.row.createOper }}</span>
                </el-form-item>
                <el-form-item label="更新人员">
                  <span>{{ props.row.updateOper }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="角色ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="角色名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="角色描述"
            prop="desc">
          </el-table-column>
        </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" inline="true">
        <el-form-item label="角色ID">
          <el-input v-model="form.id" ></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="是否系统内置角色">
          <el-radio v-model="isbuild" label="0">是</el-radio>
          <el-radio v-model="isbuild" label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="最后更新时间">
          <el-input v-model="form.updateTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建人员">
          <el-input v-model="form.createOper" disabled></el-input>
        </el-form-item>
        <el-form-item label="最后更新人员">
          <el-input v-model="form.updateOper" disabled></el-input>
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
import { getRole, getTable , addRole, delRole, updateRole } from '@/api/admin/role/index'
import getNowDate from '@/utils/time'
export default {
  data () {
    return {
      tableData: [],
      form: {
        id: undefined,
        name: undefined,
        desc: undefined,
        isbuild: 0,
        createTime: undefined,
        createOper: undefined,
        updateTime: undefined,
        updateOper: undefined
      },
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogFormVisible: false,
      tableData: [],
      treeData: [],
      formEdit: true,
      formAdd: true,
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    getAll() {
      getTree(this.listQuery).then(data => {
				this.treeData = data
			});
    },
    getNodeData(data) {
      
		},
    handlerAdd() {
      this.dialogStatus = 'create'
      this.restForm()
      this.dialogFormVisible = true
    },
    handlerEdit() {

    },
    handleDelete() {
      
    },
    update(form) {

    },
    create(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          addRole(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            });
          })
        } else {
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
        isbuild: 0,
        createTime: getNowDate(),
        createOper: this.$store.user.name,
        updateTime: undefined,
        updateOper: undefined
      }
    }
  }
}
</script>
<style scoped>

</style>
