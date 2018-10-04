<template>
  <div class="department">
    <div class="file-edit">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handlerAdd">添加模块</el-button>
      </el-button-group>
    </div>
    <div>
      <el-card shadow="always">
        <el-tree
          class="filter-tree"
          :data="treeData"
          node-key="id"
          highlight-current
          ref="moduleTree"
          @node-click="getNodeData"
          default-expand-all>
        </el-tree>
      </el-card>
    </div>
      
      <el-col class="right" :span="24" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-row>
              <el-table
              :data="tableData"
              style="width: 100%"
              height="300"
              border>
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="table-expand">
                      <el-form-item label="模块代码:">
                        <span>{{ props.row.code }}</span>
                      </el-form-item>
                      <el-form-item label="模块名称:">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="对应控制菜单:">
                        <span>{{ props.row.menu }}</span>
                      </el-form-item>
                      <el-form-item label="默认查询范围:">
                        <span>{{ props.row.area }}</span>
                      </el-form-item>
                      <el-form-item label="默认权限类型:">
                        <span>{{ props.row.role }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                label="模块代码"
                prop="code"></el-table-column>
                <el-table-column
                label="模块名称"
                prop="name">
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
            <el-row>

            </el-row>
          </el-row>
        </el-card>
      </el-col>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" 
    :before-close="handleClose">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="菜单名称:" prop="name">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="菜单英文名称:" prop="eName">
          <el-input v-model="form.eName" ></el-input>
        </el-form-item>
        <el-form-item label="菜单标准路径:" prop="url">
          <el-select v-model="form.url" placeholder="请选择菜单路径">
            <el-option label="/123" value="/123"></el-option>
            <el-option label="/456" value="/456"></el-option>
            <el-option label="/789" value="/789"></el-option>
            <el-option label="/1345" value="/1345"></el-option>
            <el-option label="/4878" value="/4878"></el-option>
            <el-option label="/487" value="/487"></el-option>
            <el-option label="/7879" value="/7879"></el-option>
            <el-option label="/87445" value="/87445"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="???:">
          <el-radio v-model="form.isCheck" label="0">是</el-radio>
          <el-radio v-model="form.isCheck" label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="是否显示:">
          <el-radio v-model="form.isDisplay" label="0">是</el-radio>
          <el-radio v-model="form.isDisplay" label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="上级菜单:" v-show="fatherMenu">
          <el-input v-model="form.parentId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button :loading="loading" v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button :loading="loading" v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    /**取消 */
    cancel(form) {
        this.dialogFormVisible = false;
        this.$refs[form].resetFields();
    },
    /**新建 */
    create(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.loading = true
          addMenu(this.form).then(() => {
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
    /**添加菜单 */
    handlerAdd() {
      console.log('12');
      
    },
    /**更新 */
    update(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.loading = true
            updateMenu(this.form).then(() => {
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
      /**获取菜单详细信息 */
      getNodeData(data) {
        fetchMenu(data.id).then(response => {
          this.tableData = response.data;
        });
        this.currentId = data.id;
      },
      /**编辑 */
      handlerEdit(row) {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.form = Object.assign({}, row)
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
          delMenu(row.id).then(() => {
            this.loading = false
            this.fetchMenu()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        })
      },
      /**初始化菜单 */
      restform() {
        this.form = {
          parentId: this.currentId,
          name: undefined,
          eName: undefined,
          name: undefined,
          eName: undefined,
          url: undefined,
          isCheck: '0',
          isDisplay: '0',
        }
      },
      /**添加菜单 */
      handlerAdd() {
        this.restform()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      /**弹窗关闭时 */
      handleClose() {
        this.loading = false
        this.dialogFormVisible = false
      },
      /**角色配置 */
      roleEdit(row) {

      }
  }
}
</script>
<style scoped>

</style>
