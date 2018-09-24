<template>
  <div>
    <el-card shadow="always">
      <el-row>
        <el-table
          :data="tableUser"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="员工入职时间">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="员工ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="员工姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            label="员工部门"
            prop="desc">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div>

        </div>
      </el-row>
    </el-card>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-card class="clearfix">
        <div slot="header" class="clearfix">
          <span>人员添加</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="git('form')" >确定</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="quiet" >取消</el-button>
        </div>
        <div>
          <el-form :model="form" :rules="rules" ref="form" inline="true">

          </el-form>
        </div>
      </el-card>
    </el-dialog>
  </div>  
</template>
<script>
export default {
  data () {
    return {
      tableUser: [],
      dialogStatus: '',
      dialogFormVisible: false,
    }
  },
  methods: {
    quiet() {
      this.dialogFormVisible = false
    }
  }
}
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>

