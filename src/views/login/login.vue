<template>
  <div class="login">
    <el-form :model="form" ref="form" class="login-form">
      <el-card shadow="always">
        <el-form-item>
           <h3 class="title">系统登录</h3>
        </el-form-item>
        <el-form-item label="用户名:">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="form.name" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model="form.password" type="password" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button :loading="loading" type="primary" @click.native.prevent="login">登录</el-button>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form:{
        name: undefined,
        password: undefined
      },
      loading: false
    }
  },
  methods: {
    login() {
      console.log(this.form)
      this.$refs.form.validate(valid => {
        if(valid) {
          this.loading = true
          this.$store.dispatch('Login',this.form).then(() => {
            console.log('fdfdf')
            this.loading = false
            this.$router.push('123')
          }).catch( () => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style>
.login {
  background-color: #ffffff;
  position: fixed;
  height: 100%;
  width: 100%;
}
.login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 20px 35px 15px 35px;
    margin: 120px auto;
  }
  .title {
    position: relative;
    font-size: 26px;
    color: #594b39;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .logo {
    font-family: Arial, Helvetica, sans-serif
  }
</style>
