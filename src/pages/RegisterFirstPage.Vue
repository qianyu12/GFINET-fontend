<template>
  <div id="register">
    <el-container>
      <el-header height="200px">
        <h1 class="title">Apply for an Account</h1>
        <p>A few steps and you’re done.</p>
      </el-header>
      <el-main>
        <el-select v-model="value" placeholder="Select your type of account">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
        <el-button type="primary" :disabled="!isChoosen" v-on:click="toSecondPage">Get Started</el-button>
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
          style="width:400px;"
          label-position="top"
          :rules="sigonRules"
          ref="formSignOn"
        >
          <el-form-item label="Email" prop="email">
            <el-input v-model="formSignOn.email" placeholder="Enter your email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="formSignOn.password" placeholder="Enter your password" show-password></el-input>
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
  name: 'RegisterFirstPage',
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        if (value.indexOf('@') === -1) {
          callback(new Error('请输入正确的格式'))
        }
      }
    }
    return {
      options: [
        {
          value: 'Saler',
          label: 'Saler',
          disabled: true
        },
        {
          value: 'Trader',
          label: 'Trader'
        }
      ],
      value: '',
      isChoosen: false,
      dialogFormVisible: false,
      formSignOn: {
        email: '',
        password: ''
      },
      sigonRules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.isChoosen = true
    }
  },
  methods: {
    toSecondPage(envent) {
      this.$router.push({ path: 'secondPage' })
    },
    logOn() {
      console.log('logoning', 'logoing')
      var params = new URLSearchParams()
      params.append('name', this.formSignOn.email)
      params.append('pwd', this.formSignOn.password)
      this.axios
        .post('http://47.100.138.62:8080/api/login', params)
        .then(response => {
          if (response.data.code === 200) {
            window.localStorage.setItem('token', response.data.result.token)
            window.localStorage.setItem('userId', response.data.result.userId)
            this.$router.replace({ path: '/traderSys' })
          }
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error)
        })
    }
  }
}
</script>
<style>
#register {
  background-color: white;
  width: 70%;
}
.title {
  font-family: 'Lucida Calligraphy Italic Bold', 'Lucida Calligraphy';
  font-style: italic;
  font-size: 50px;
  font-weight: 700;
}
.el-select {
  width: 500px;
}
.log-on-contents {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
