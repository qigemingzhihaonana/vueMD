<template>
  <div class="user">
    <div class="file-edit">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handlerAdd">添加人员</el-button>
        <el-button type="primary" icon="plus" @click="handlerAddMore">批量导入</el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col class="right" :span="24" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-table
          :data="tableData"
          style="width: 100%"
          height="300"
          border>
            <el-table-column
            label="员工账号"
            prop="user_name"></el-table-column>
            <el-table-column
            label="员工密码"
            prop="user_password"></el-table-column>
            <el-table-column
            label="员工真实姓名"
            prop="real_name"></el-table-column>
            <el-table-column
            label=""
            prop="user_code"></el-table-column>
            <el-table-column
            label="是否在职"
            prop="user_level"></el-table-column>
            <el-table-column
            label=""
            prop="user_position"></el-table-column>
            <el-table-column
            label=""
            prop="dep_id"></el-table-column>
            <el-table-column
            label="是否公司领导"
            prop="is_company_leader"></el-table-column>
            <el-table-column
            label=""
            prop="order_number"></el-table-column>
            <el-table-column
            label="员工email"
            prop="user_email"></el-table-column>
            <el-table-column
            label=""
            prop="status"></el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120">
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
      </el-col>
    </el-row>
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
  
}
</script>
<style scoped>

</style>
