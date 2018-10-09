<template>
  <el-dialog title="员工导入" 
  :visible="dialog"
  width="70%"
  :before-close="handleClose"
 >
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
    </el-table>
    <el-button @click="update" type="primary">确定</el-button>
  </el-dialog>
</template>

<script>
import UploadExcelComponent from './uploadexcle'
import { up } from '@/api/admin/user/index'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  props: ['show'],
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  computed: {
    dialog: function() {
      return this.show
    }
  },
  methods: {
    handleClose() {
      const table = []
      this.tableData = table
      this.$emit('update:show', false)
    },
    update() {
      up(this.tableData).then( data => {
        if(data.data.code === 200) {
          this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
        } else {
          this.$notify({
              title: '错误',
              message: '请重新上传',
              type: 'error',
              duration: 2000
            })
        }
      })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
