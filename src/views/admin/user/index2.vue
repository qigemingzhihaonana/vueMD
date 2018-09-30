<template>
  <div>
    <el-card shadow="always">
      <div>
        <span>人员管理</span>
        <el-button
        size="mini"
        @click="insertMore">批量导入</el-button>
      </div>
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
          <el-form :model="form" :rules="rules" ref="form" inlin>
            <el-form-item label="员工姓名">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="员工编号">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
              <el-input v-mode="form.password"></el-input>
            </el-form-item>
            <el-form-item label="入职时间">
               <el-date-picker
                v-model="form.time"
                type="date"
                placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否在职">
              <el-select v-model="form.level" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=""></el-form-item>
            <el-form-item label=""></el-form-item>
            <el-form-item label=""></el-form-item>
            <el-form-item label=""></el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-dialog>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
  </div>
  </div>  
</template>
<script>
import { addUser, fetchUser, deleUser} from '@/api/admin/user/index'
export default {
  data () {
    return {
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableUser: [],
      dialogStatus: '',
      dialogFormVisible: false,
      options:[
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ]
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      fetchUser(this.listQuery).then( data => {
        this.tableUser = data
      })
    },
    quiet() {
      this.dialogFormVisible = false
    },
    insertMore() {

    },
    git(data) {

    }
  }
}
</script>
<style>
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
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

