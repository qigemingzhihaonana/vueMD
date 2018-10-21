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
                label="默认查询范围"
                prop="default_query_scope"
                align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.default_query_scope === '0'"> 
                      全省(全区)
                    </span>
                    <span v-if="scope.row.default_query_scope === '1'"> 
                      本公司
                    </span>
                    <span v-if="scope.row.default_query_scope === '2'"> 
                      本部门(一级部门)
                    </span>
                    <span v-if="scope.row.default_query_scope === '3'"> 
                      本人相关
                    </span>
                    <span v-if="scope.row.default_query_scope === '4'"> 
                      指定范围的
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                label="默认权限类型"
                prop="default_auth_type"
                align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.default_auth_type === 0">管理</span>
                  <span v-if="scope.row.default_auth_type === 1">查询</span>
                </template>
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
                prop="role_code"></el-table-column>
                <el-table-column
                label="角色名称"
                prop="role_name">
                </el-table-column>
                <el-table-column
                label="角色描述"
                prop="role_desc">
                </el-table-column>
                <el-table-column
                label="是否系统内置角色"
                prop="is_builtin">
                  <template slot-scope="scope">
                    <span v-if="scope.row.is_builtin === 1">否</span>
                    <span v-if="scope.row.is_builtin === 0">是</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" 
    :before-close="handleClose" >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="模块名称:" prop="module_name">
          <el-input v-model="form.module_name" ></el-input>
        </el-form-item>
        <el-form-item label="模块代码:" prop="module_code">
          <el-input v-model="form.module_code" ></el-input>
        </el-form-item>
        <el-form-item v-show="this.dialogStatus !== 'create'" label="对应控制菜单:">
          <el-popover
          placement="right"
          width="800px"
          height="500px"
          trigger="click">
            <tree-transfer 
            :title="title"
            :defaultProps= "{ label: 'name', id: 'id'}"
            :from_data='fromData'
            :to_data='toData'
            :pid="menu_parent_id"
            width="800px"
            height="400px"
            @addBtn='add'
            @removeBtn='remove'
            :model='modeMenu'
            filter openAll>
            </tree-transfer>
          <el-button slot="reference" @click="getmenu">查看</el-button>
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
          <el-select v-model="form.default_auth_type" placeholder="请选择">
            <el-option
              v-for="item in default_auth_type"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
    :moduleId="moduleId" ></role>
  </div>
</template>

<script>
import  Role from './components/role'
import{ fetchRoleModule, delRoleModule, addRoleModule, addUserModule,
 delMenuModule, addModule, fetchModule, delModule, fetchUserMessage, ModuleRole,
 getMenu, addMenuModule, updateModule, fetchRole} from '@/api/admin/module/index'
import treeTransfer from 'el-tree-transfer'
export default {
  name: 'module',
  data() {
    return {
      dataStoreL: [],
      dataStoreR: [],
      menu_parent_id: 'menu_parent_id',
      props: {
        label: 'module_name',
        id: 'id'
      },
      showTable: false,
      modeMenu: "transfer",
      loading: false,
      treeData: [],
      show: false,
      moduleId: undefined,
      tableDataRole: [],
      tableDataAddRole: [],
      title: ["待分配", "已分配"],
      tableModuleRole: [],
      tableModule: [
        {
          module_code: 'fff'
        }
      ],
      currentId: -1,
      fromData: [],
      model: "transfer",
      toData:[],
      default_auth_type: [{
        value: 0,
        label: '查询'
      },{
        value: 1,
        label: '管理'
      }],
      default_query_scope: [{
          value: '0',
          label: '全省(全区)'
        }, {
          value: '1',
          label: '本公司'
        }, {
          value: '2',
          label: '本部门(一级部门)'
        }, {
          value: '3',
          label: '本人相关'
        }, {
          value: '4',
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
        default_query_scope: undefined,
        default_auth_type: undefined
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
      this.$refs.form.validate(valid => {
        if(valid) {
          this.loading = true
          updateModule(this.form).then(() => {
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
    /**编辑角色 */
    RoleModuleAdd() {
      if (this.currentId !== -1) {
        this.$store.dispatch('GetRole',this.currentId).then( () => {
          this.show = true
        })
        this.moduleId = this.currentId
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
    restForm() {
      this.form = {
        module_code: undefined,
        module_name: undefined,
        default_query_scope: undefined,
        default_auth_type: 0
      }
    },
    /**添加模块 */
    ModuleAdd() {
      //this.$refs['form'].resetFields()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.restForm()
      console.log(this.form)
    },
    /**
     * 查看模块的控制菜单
     */
    getmenu() {
      getMenu(this.currentId).then( response => {
          this.fromData = response.data.data.noselect
          this.toData = response.data.data.select
        })
    },
    /**编辑 */
    handlerEdit(row) {
      this.form = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      console.log(this.form)
      this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      },
    /**删除 */
    handleDelete(row) {
      console.log(row.id)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delModule(row.id).then(() => {
            this.loading = false
            this.fetch()
            this.showTable = false
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
      this.fetch()
    },
    // 监听穿梭框组件添加
    add(fromData,toData,obj){
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      (obj.nodes).forEach( row => {
        this.dataStoreL.push(row.id)
      })
      console.log(this.dataStoreL)
      addMenuModule(this.dataStoreL,this.currentId).then(() => {
        this.getmenu()
        this.dataStoreL = []
      })
    },
      // 监听穿梭框组件移除
    remove(fromData,toData,obj){
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      (obj.nodes).forEach( row => {
        this.dataStoreR.push(row.id)
      })
      console.log(this.dataStoreR)
      delMenuModule(this.dataStoreR,this.currentId).then( () => {
        console.info(this.dataStoreR)
        this.getmenu()
        this.dataStoreR = []
      })
    },
    /**获取模块详细信息 */
    getNodeData(data) {
      console.log(data)
      ModuleRole(data.id).then(data => {
        console.log(data.data)
        this.tableModuleRole = data.data.data
      })
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
      this.$refs.form.validate(valid => {
        if(valid) {
          this.loading = true
          addModule(this.form).then(() => {
            this.loading = false
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.fetch()
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
