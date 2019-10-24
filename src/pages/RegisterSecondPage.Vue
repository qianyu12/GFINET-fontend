<template>
  <div id="register-enter">
    <el-container>
      <el-header>
        <h1 class="title2">Create Your Citi Account</h1>
      </el-header>
      <el-main>
        <div class="register-form">
          <el-form
            ref="form"
            :model="form"
            label-width="100px"
            label-position="top"
            style="width:400px;"
            :rules="rules"
          >
            <el-form-item label="E-mail" prop="email">
              <el-autocomplete
                v-model="form.email"
                placeholder="Enter your email"
                :fetch-suggestions="querySearchAsync"
                style="width:400px;"
                @select="handelSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input v-model="form.password" placeholder="Enter your password" show-password></el-input>
            </el-form-item>
            <el-form-item label="Confirm" prop="confirmPassword">
              <el-input
                v-model="form.confirmPassword"
                placeholder="Confirm your password"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="submitForm" style="width:150px;">Submit</el-button>
        </div>
      </el-main>
      <el-footer>
        Already have an account ?
        <el-button type="text" @click="dialogFormVisible = true">Sign in</el-button>
      </el-footer>
    </el-container>
    <el-dialog title="Sign in" :visible.sync="dialogFormVisible">
      <div class="log-on-contents">
        <el-form
          :model="formSignOn"
          :rules="sigonRules"
          style="width:400px;"
          label-position="top"
          ref="formSignOn"
        >
          <el-form-item label="Email" prop="email">
            <el-input v-model="formSignOn.email" placeholder="Enter your email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="formSignOn.password" show-password placeholder="Enter your password"></el-input>
          </el-form-item>
        </el-form>
        <div class="image-code">
          <p style="text-align:center;">QR Code</p>
          <el-image style="width:155px; height:155px"></el-image>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="logOn">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'RegisterSecondPage',
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        if (value.indexOf('@') === -1) {
          callback(new Error('请输入正确的格式'))
        }
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.confirmPassword !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      dialogFormVisible: false,
      formSignOn: {
        email: '',
        password: ''
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        confirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
      },
      sigonRules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      var params = new URLSearchParams()
      this.$refs['form'].validate(valid => {
        console.log('tag', valid)
        if (valid) {
        } else {
          console.log('error submit!!')
          return false
        }
      })
      console.log('register', 'inng')
      params.append('name', this.form.email)
      params.append('pwd', this.form.password)
      params.append('roleId', 1)
      this.axios
        .post('http://47.100.138.62:8080/api/register', params)
        .then(response => {
          console.log('response', response)
          this.formSignOn.email = this.form.email
          this.formSignOn.password = this.form.password
          this.logOn()
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error)
        })
      alert('注册成功，正在跳转!')
    },
    logOn() {
      console.log('logoning', 'logoing')
      var params = new URLSearchParams()
      params.append('name', this.formSignOn.email)
      params.append('pwd', this.formSignOn.password)
      this.axios
        .post('http://47.100.138.62:8080/api/login', params)
        .then(response => {
          console.log('tag', response)
          if (response.data.code === 200) {
            window.localStorage.setItem('token', response.data.result.token)
            window.localStorage.setItem('userId', response.data.result.userId)
            this.$router.replace({ path: '/traderSys' })
          }
        })
    },
    querySearchAsync(queryString, cb) {
      if (queryString.indexOf('@') === -1) {
        var result = []
        result.push({ value: queryString + '@qq.com' })
        result.push({ value: queryString + '@163.com' })
        result.push({ value: queryString + '@126.com' })
        result.push({ value: queryString + '@gmail.com' })
        result.push({ value: queryString + '@sohu.com' })
        result.push({ value: queryString + '@outlook.com' })
        cb(result)
      }
      cb()
    },
    handelSelect(item) {
      console.log('item', item)
      this.form.eamil = item
      this.$refs.form.validateField('email')
    }
  }
}
</script>
<style>
#register-enter {
  background-color: white;
  width: 70%;
}
.register-form {
  text-align: left;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.title2 {
  font-family: 'Lucida Calligraphy Italic Bold', 'Lucida Calligraphy';
  font-style: italic;
}
.log-on-contents {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.el-table .warning-row {
  background: #f56c6c;
}
</style>
