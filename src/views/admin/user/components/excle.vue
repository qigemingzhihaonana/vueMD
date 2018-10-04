<template>
  <el-dialog title="员工导入" 
  :visible="dialog"
  width="70%"
  @close="$emit('update:show', false)">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
    </el-table>
  </el-dialog>
</template>

<script>
import UploadExcelComponent from './uploadexcle'

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
    beforeUpload() {
      console.log('f')
    },
    // beforeUpload(file) {
    //   const isLt1M = file.size / 1024 / 1024 < 1

    //   if (isLt1M) {
    //     return true
    //   }

    //   this.$message({
    //     message: 'Please do not upload files larger than 1m in size.',
    //     type: 'warning'
    //   })
    //   return false
    // },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
