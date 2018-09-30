<template>
  <div class="addUser">
    <el-dialog title="人员配置" :visible.sync="dialogFormVisible"
    :before-close="handleClose">
      <el-card shadow="always">
        <el-transfer
          change
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入员工号"
          v-model="value"
          :data="data">
        </el-transfer>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    const generateData2 = _ => {
      const data = [];
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      data2: generateData2(),
      value2: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    };
  }
}
</script>
<style scoped>

</style>
