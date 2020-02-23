<template>
  <div>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>用户登陆</span>
      </div>
      <div class="login_form">
        <el-form label-width="0px"
                 :model="loginForm"
                 :rules="rules"
                 ref="loginForm">
          <el-form-item prop="username">
            <el-input type="text"
                      prefix-icon="el-icon-user"
                      v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password"
                      prefix-icon="el-icon-lock"
                      v-model="loginForm.password"
                      :show-password="true"></el-input>
          </el-form-item>
          <el-form-item label="" prop="root">
            <el-radio-group v-model="loginForm.root">
              <el-radio label="admin">管理员</el-radio>
              <el-radio label="plain">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary"
                       @click="onSubmit('loginForm')">登陆</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        root: 'admin'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        root: [
          { required: true, message: '请选择身份', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return false
        } else {
          // const { data: result } = await this.axios.post('/api/user/login', this.loginForm)
          this.$store.dispatch('user/login', this.loginForm).then(resp => {
            // console.log(resp)
            if (resp.code === 200) {
              this.$router.push('/home')
            }
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.box-card {
  width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>
