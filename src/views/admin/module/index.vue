<template>
  <div class="flex">
    <div class="left">
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
    <div class="right">
      <div class="top">
        <el-card shadow="always">
          <el-table
          :data="tableData"
          style="width: 100%"
          height="200"
          border>
            <el-table-column
            label="模块代码"
            prop="code"></el-table-column>
            <el-table-column
            label="模块名称"
            prop="name">
            </el-table-column>
            <el-table-column
            label="对应控制菜单"
            prop="menu">
            </el-table-column>
            <el-table-column
            label="默认查询范围"
            prop="area">
            </el-table-column>
            <el-table-column
            label="默认权限类型"
            prop="role">
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
      </div>
      <div class="down">
tththt
      </div>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" 
    :before-close="handleClose">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="模块名称:" prop="name">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="模块代码:" prop="code">
          <el-input v-model="form.code" ></el-input>
        </el-form-item>
        <el-form-item label="对应控制菜单:" prop="url">
          <el-popover
          placement="right"
          width="400"
          trigger="click">
            <el-transfer
              filterable
              :filter-method="filterMethod"
              filter-placeholder="请输入城市拼音"
              v-model="value"
              :data="data">
            </el-transfer>
          <el-button slot="reference">菜单选择</el-button>
        </el-popover>
        </el-form-item>
        <el-form-item label="默认查询范围:">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认权限类型:">
          <el-radio v-model="form.sysRole" label="0">管理</el-radio>
          <el-radio v-model="form.sysRole" label="1">查询</el-radio>
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
      options: [{
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
      dialogFormVisible: false
    }
  },
  methods: {
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
    /**关闭后动作 */
    handleClose() {
      this.loading = false
      this.dialogFormVisible = false
    }
  }
}
</script>
<style scoped>
.flex {
  display: flex;
  flex-direction: row;
}
.right {
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
