<template>
  <el-card shadow="always" class="login">
    <el-form :model="form" ref="loginform">
      <el-form-item label="用户名" v-model="form.name"></el-form-item>
      <el-form-item label="密码" v-model="form.password"></el-form-item>
      <el-form-item label="登录">
        <el-button @click="login()"></el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    login() {
      ths.$refs.loginform.validate(valid => {
        if(valid) {
          this.loading = true;
          this.$store.dispatch('login',this.loginform).then(() => {
            this.loading = false;
            this.$router.push({
              path: '/'
            })
          })
        }
      })
    }
  }
}
</script>
<style>
.login {
  background-color: #ffffff;
  width: 480px
}
</style>
