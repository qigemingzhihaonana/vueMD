<template>
  <div class="login-container">
    <el-form
    :model="form"
    ref="form" 
    class="login-form"
    auto-complete="on"
    label-position="left">
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <el-form-item >
        <span class="svg-container">
          <svg-icon icon-class="login" />
        </span>
        <el-input
        placeholder="账号"
        type="text"
        v-model="form.name"
        @keyup.enter.native="login"
        auto-complete="on">
        </el-input>
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
        placeholder="密码"
        v-model="form.password"
        type="password"
        @keyup.enter.native="login"></el-input>
      </el-form-item>
      <el-button
      style="width:100%;margin-bottom:30px;"
      :loading="loading"
      type="primary"
      @click.native.prevent="login"
      >登录</el-button>
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
            this.loading = false
            this.$router.push('/')
          }).catch( () => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    // .set-language {
    //   color: #fff;
    //   position: absolute;
    //   top: 5px;
    //   right: 0px;
    // }
  }
  // .show-pwd {
  //   position: absolute;
  //   right: 10px;
  //   top: 7px;
  //   font-size: 16px;
  //   color: $dark_gray;
  //   cursor: pointer;
  //   user-select: none;
  // }
  // .thirdparty-button {
  //   position: absolute;
  //   right: 35px;
  //   bottom: 28px;
  // }
}
</style>
