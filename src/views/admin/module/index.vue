<template>
  <div class="flex">
    <div>
      <div class="file-edit">
        <el-button-group>
          <el-button type="primary" icon="plus" @click="ModuleAdd">添加模块</el-button>
          <el-button type="primary" icon="plus" @click="RoleModuleAdd">分配角色</el-button>
        </el-button-group>
      </div>
      <el-row>
        <el-col class="right" :span="3" style='margin-top:15px;'>
          <el-tree
            class="filter-tree"
            :props="props"
            :data="treeData"
            node-key="id"
            highlight-current
            ref="moduleTree"
            @node-click="getNodeData"
            default-expand-all>
          </el-tree>
        </el-col>
        <el-col class="right" :span="16" style='margin-top:15px;' v-show="showTable">
          <el-row>
            <el-card shadow="always">
              <el-table
              fit
              :data="tableModule"
              style="width: 100%"
              border>
                <el-table-column
                label="模块代码"
                prop="module_code"
                align="center"></el-table-column>
                <el-table-column
                label="模块名称"
                prop="module_name"
                align="center">
                </el-table-column>
                <el-table-column
                label="对应控制菜单"
                prop="menu"
                align="center">
                </el-table-column>
                <el-table-column
                label="默认查询范围"
                prop="default_query_scope"
                align="center">
                </el-table-column>
                <el-table-column
                label="默认权限类型"
                prop="default_auth_type"
                align="center">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="160">
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
                </template>
              </el-table-column>
              </el-table>
            </el-card>
          </el-row>
          <el-row>
            <el-card shadow="always">
              <el-table
              fit
              :data="tableModuleRole"
              style="width: 100%"
              border>
                <el-table-column
                label="角色编码"
                prop="code"></el-table-column>
                <el-table-column
                label="角色名称"
                prop="name">
                </el-table-column>
                <el-table-column
                label="角色描述"
                prop="menu">
                </el-table-column>
                <el-table-column
                label="权限模块"
                prop="area">
                </el-table-column>
                <el-table-column
                label="查询范围"
                prop="role">
                </el-table-column>
              </el-table>
            </el-card>
          </el-row>
        </el-col>
        </el-row>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" 
    :before-close="handleClose">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="模块名称:" prop="module_name">
          <el-input v-model="form.module_name" ></el-input>
        </el-form-item>
        <el-form-item label="模块代码:" prop="module_code">
          <el-input v-model="form.module_code" ></el-input>
        </el-form-item>
        <el-form-item label="对应控制菜单:">
          <el-popover
          placement="right"
          width="800px"
          height="500px"
          trigger="click">
            <tree-transfer 
            :title="title"
            :from_data='fromData'
            :to_data='toData'
            width="800px"
            height="400px"
            @addBtn='add'
            @removeBtn='remove'
            :model='modeMenu'
            filter openAll>
            </tree-transfer>
          <el-button slot="reference">查看</el-button>
        </el-popover>
        </el-form-item>
        <el-form-item label="默认查询范围:">
          <el-select v-model="form.default_query_scope" placeholder="请选择">
            <el-option
              v-for="item in default_query_scope"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认权限类型:">
          <el-radio v-model="form.default_auth_type" label="0">管理</el-radio>
          <el-radio v-model="form.default_auth_type" label="1">查询</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button :loading="loading" v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button :loading="loading" v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
    <role
    :show.sync="show" 
    :moduleId="moduleId" 
    :tableLeft="tableDataRole"
    :tableRight="tableDataAddRole"></role>
  </div>
</template>

<script>
import  Role from './components/role'
import{ fetchRoleModule, delRoleModule, addRoleModule, addUserModule,
 delMenuModule, addModule, fetchModule, delModule, fetchUserMessage, ModuleRole,
 getMenu, addMenuModule} from '@/api/admin/module/index'
import treeTransfer from 'el-tree-transfer'
export default {
  data() {
    return {
      props: {
        label: 'module_name',
        id: 'id'
      },
      showTable: false,
      modeMenu: [],
      loading: false,
      fromData: [],
      treeData: [],
      show: false,
      moduleId: undefined,
      tableDataRole: [],
      tableDataAddRole: [],
      title: ["待分配", "已分配"],
      tableModuleRole: [],
      tableModule: [],
      currentId: -1,
      formData: [],
      model: "transfer",
      toData:[],
      default_query_scope: [{
          value: '全省(全区)',
          label: '全省(全区)'
        }, {
          value: '本公司',
          label: '本公司'
        }, {
          value: '本部门(一级部门)',
          label: '本部门(一级部门)'
        }, {
          value: '本人相关',
          label: '本人相关'
        }, {
          value: '指定范围的',
          label: '指定范围的'
        }],
      tableData: [],
      textMap: {
        create: '创建',
        update: '更新'
      },
      dialogStatus: undefined,
      dialogFormVisible: false,
      form: {
        module_name: undefined,
        module_code: undefined,
        menu: undefined,
        default_query_scope: undefined,
        default_auth_type: '0'
      },
      rules: {
          module_code: [
            { required: true, message: '请输入模块代码，模块代码不能重复', trigger: 'blur' }
          ],
          module_name: [
            { required: true, message: '请输入模块名称，模块名称不能重复', trigger: 'blur' }
          ],
        }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    update(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.loading = true
          updateModule(this.form).then(() => {
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
    /**编辑角色 */
    RoleModuleAdd() {
      if (this.currentId !== -1) {
        this.show = true
        ModuleRole(this.moduleId).then( (data) => {
          this.tableModuleRole = data.data[0]
          this.tableModule = data.data[1]
        })
      } else {
        this.$notify({
              title: '错误',
              message: '请选择模块',
              type: 'error',
              duration: 2000
            })
      }
    },
    fetch() {
      fetchRoleModule().then((data) => {
        console.log(data.data)
        this.treeData =  data.data.data
      })
    },
    restform() {
      this.from = {
        name: undefined,
        code: undefined,
        menu: undefined,
        sysArea: undefined,
        sysRole: '0'
      }
    },
    /**添加模块 */
    ModuleAdd() {
      this.dialogFormVisible = true
      this.restform()
      this.dialogStatus = 'create'
    },
    /**
     * 查看模块的控制菜单
     */
    getmenu() {
      getMenu(this.moduleId).then( data => {
          console.log(data.data)
          this.fromData = data.data.fromData
          this.toData = data.data.toData
        })
    },
    /**编辑 */
    handlerEdit(row) {
      this.dialogStatus = 'update'
      const id = row.role
      if(id === "管理") {
        this.form = Object.assign({}, row)
        this.form.sysRole = '0'
      } else {
        this.form.sysRole = '1'
      }
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
    })
    },
    /**删除 */
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delModule(row.code).then(() => {
            this.loading = false
            const ids = []
            ids.push(this.currentId)
            this.fetchModule(ids)
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        })
    },
    /**关闭后动作 */
    handleClose() {
      this.loading = false
      this.dialogFormVisible = false
      this.restform()
    },
    // 监听穿梭框组件添加
    add(fromData,toData,obj){
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log('obj.nodes',obj.nodes);
      addMenuModule({obj}).then((data) => {
        console.info(data)
        if (data.code === 200) {
          getMenu(this.moduleId).then((data) => {
            this.toData = data.data[1]
            this.formData = data.data[0]
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }else {
          this.$notify({
              title: '失败',
              message: '更新失败，请稍后再试',
              type: 'error',
              duration: 2000
            })
        }
      })
      
    },
      // 监听穿梭框组件移除
    remove(fromData,toData,obj){
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log('obj.nodes',obj.nodes);
      delMenuModule({obj}).then((data) => {
        console.info(data)
        if(data.code === 200) {
          getMenu(this.moduleId).then((data) => {
            this.toData = data.data[1]
            this.formData = data.data[0]
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'error',
              duration: 2000
            })
          })
        }else {
          this.$notify({
              title: '失败',
              message: '更新失败，请稍后再试',
              type: 'success',
              duration: 2000
            })
        }
      })
    },
    /**获取模块详细信息 */
    getNodeData(data) {
      fetchModule(data.id).then(response => {
        console.info(response)
        const table = []
        console.log(response.data.data.length === undefined)
        if(response.data.data.length === 1 || response.data.data.length === undefined) {
          table.push(response.data.data)
          this.tableModule = table
        } else {
          this.tableModule = response.data.data
        }
        console.log(this.tableData)
        this.showTable = true
        this.moduleId = this.tableModule.id
        this.currentId = data.id;
      });
    },
    /**取消 */
    cancel(form) {
      this.dialogFormVisible = false;
      this.$refs[form].resetFields();
    },
    /**创建新的模块 */
    create(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.loading = true
          addModule(this.form).then(() => {
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
  },
  components:{ treeTransfer,Role }
}
</script>
<style scoped>

</style>
